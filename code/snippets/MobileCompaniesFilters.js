function MobileCompaniesFilters(config){
	TrxsFilters.call(this,config);
}

inheritPrototype(MobileCompaniesFilters,TrxsFilters);

MobileCompaniesFilters.prototype.constructor = MobileCompaniesFilters;

MobileCompaniesFilters.prototype.initializeParameters = function(){
	TrxsFilters.prototype.initializeParameters.call(this);
	this.path = "snippets/mobileCompaniesFilters.html";
	this.urlService = "service/manager/getMobileTrxs.php";
	this.filterType = Globals.TRXS_MOBILE_COMPANIES;
}

MobileCompaniesFilters.prototype.initialize = function(){
	TrxsFilters.prototype.initialize.call(this);
}

MobileCompaniesFilters.prototype.getProducts = function() {
	$.ajax({
		context : this,
		type : "POST",
		async : false,
		url : "service/manager/getProducts.php",
		success : function(r){
			if(JSON.parse(r).length > 0){
				$(this.node).find("#products-list").append("<option data-id='0'>Todos</option>");
				JSON.parse(r).forEach(function(d){
					if(d.idProducto != 24){
						var opt = "<option data-id='" + d.idProducto + "'>" + d.producto + "</option>";
						$(this.node).find("#products-list").append(opt);
					}
				},this);
			}
		},
		error : function(error){
			debugger;
		}
	})
}

MobileCompaniesFilters.prototype.getData = function() {
	return { 	
		desde:this.getDateFrom(),
		hasta:this.getDateTo(),
		idUsuario:this.getUserId(),
		idCliente:this.getClientId(),
		idProducto:this.getProductId(),
		modeloDeTerminal:this.getTerminalModel(),
		estado:this.getStatus(),
		clienteZona:this.getClientZone()
	}
}