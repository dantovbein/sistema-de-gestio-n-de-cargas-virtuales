function ReportFilters(config){
	TrxsFilters.call(this,config);
}

inheritPrototype(ReportFilters,TrxsFilters);

ReportFilters.prototype.constructor = ReportFilters;

ReportFilters.prototype.initializeParameters = function(){
	TrxsFilters.prototype.initializeParameters.call(this);
	this.path = "snippets/reportFilters.html";
	this.urlService = "service/manager/getReportData.php";
	this.filterType = "";
}

ReportFilters.prototype.initialize = function(){
	TrxsFilters.prototype.initialize.call(this);
}

ReportFilters.prototype.getTrxsByFilters = function(){
	$.ajax({
		context : this,
		async : false,
		data : this.getData(),
		type : "POST",
		url : this.urlService,
		success : function(r){
			var result = JSON.parse(r);
			if(result.length==0){
				Monkeyman.stopLoading();
				Monkeyman.getMain().view.showDataByFilters({ trxs : result, trxType : this.filterType });
				return false;
			}
			// Parse by client
			this.groupByClient = [];
			JSON.parse(r).forEach(function(t,i){
				if(this.groupByClient.length == 0){
					var arr = [];
					arr.push(t);
					this.groupByClient.push(arr);
				}else{
					var lastArr = this.groupByClient[this.groupByClient.length-1];
					if(lastArr[lastArr.length-1].idCliente == t.idCliente){
						lastArr.push(t);
					}else{
						var arr = [];
						arr.push(t);
						this.groupByClient.push(arr);
					}
				}
			},this);

			this.arrDataClient = [];
			this.fecha = (this.getDateFrom()==this.getDateTo()) ? this.getDateFrom().split("-")[2] + "/" + this.getDateFrom().split("-")[1] + "/" + this.getDateFrom().split("-")[0] : this.getDateFrom().split("-")[2] + "/" + this.getDateFrom().split("-")[1] + "/" + this.getDateFrom().split("-")[0] + " al " + this.getDateTo().split("-")[2] + "/" + this.getDateTo().split("-")[1] + "/" + this.getDateTo().split("-")[0];
			
			this.groupByClient.forEach(function(c,i){
				this.tempDataClient = {};
				this.tempDataClient.fecha = this.fecha;
				this.tempDataClient.idCliente = c[0].idCliente;
				this.tempDataClient.cliente = c[0].cliente;
				this.tempDataClient.clienteZona = (c[0].clienteZona==0) ? "Sin asignar" : c[0].clienteZona;
				this.tempDataClient.clienteComisionTelefonia = c[0].clienteComisionTelefonia;
				this.tempDataClient.clienteComisionTvPrepaga = c[0].clienteComisionTvPrepaga;
				this.tempSubtotalTvPrepaga = 0;
				this.temptotalTvPrepagaTrxs = 0;
				this.tempSubtotalTelefonia = 0;
				this.tempTotalTelefoniaTrxs = 0;
				c.forEach(function(d,i){
					if(d.idProducto==24){
						// Es cable
						this.tempSubtotalTvPrepaga += Number(d.importe);
						this.temptotalTvPrepagaTrxs += Number(d.cantidadTrxs);
					}else{
						// Es telefonia
						this.tempSubtotalTelefonia += Number(d.importe);
						this.tempTotalTelefoniaTrxs += Number(d.cantidadTrxs);
					}
				},this);
				this.tempDataClient.subtotalTvPrepaga = this.tempSubtotalTvPrepaga.toFixed(2);
				this.tempDataClient.totalTvPrepagaTrxs = this.temptotalTvPrepagaTrxs;
				this.tempDataClient.subtotalTelefonia = this.tempSubtotalTelefonia.toFixed(2);
				this.tempDataClient.totalTelefoniaTrxs = this.tempTotalTelefoniaTrxs;
				
				this.totalComisionTvPrepaga = this.tempSubtotalTvPrepaga * (this.tempDataClient.clienteComisionTvPrepaga / 100);
				this.tempDataClient.totalComisionTvPrepaga = this.totalComisionTvPrepaga;
				this.totalTvPrepaga = this.tempSubtotalTvPrepaga + this.totalComisionTvPrepaga;
				this.tempDataClient.totalTvPrepaga = this.totalTvPrepaga.toFixed(2);

				this.totalComisionMobile = this.tempDataClient.clienteComisionTelefonia * this.tempDataClient.totalTelefoniaTrxs;
				this.tempDataClient.totalComisionMobile = this.totalComisionMobile.toFixed(2);
				this.totalTelefonia = this.tempSubtotalTelefonia + this.totalComisionMobile;
				this.tempDataClient.totalTelefonia = this.totalTelefonia.toFixed(2);

				this.tempDataClient.total = (this.totalTvPrepaga + this.totalTelefonia).toFixed(2);
				this.arrDataClient.push(this.tempDataClient);
			},this);

			this.generateReportFile({ fecha:this.fecha, data:JSON.stringify(this.arrDataClient) });			
			
		},
		error : function(error){
			debugger;
		}
	});
}

ReportFilters.prototype.generateReportFile = function(d){
	debugger;
	$.ajax({
		context : this,
		async : false,
		url : "service/manager/generateReportFile.php",
		type : "POST",
		data : d,
		success : function(r){
			Monkeyman.stopLoading();
			Monkeyman.getOverlay();

			var downloadFile = new DownloadFile({ container:$("body"),data:{ pathFile:r }});
		},
		error : function(error){
			debugger;
		}
	})
}

ReportFilters.prototype.getData = function() {
	return { 	
		desde:this.getDateFrom(),
		hasta:this.getDateTo(),
		idCliente:this.getClientId(),
		estado:this.getStatus(),
		clienteZona:this.getClientZone()
	}
}