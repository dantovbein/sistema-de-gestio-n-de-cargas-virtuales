function TrxsFilters(config) {
	GenericSnippet.call(this,config);
} 

inheritPrototype(TrxsFilters,GenericSnippet);

TrxsFilters.prototype.constructor = TrxsFilters;

TrxsFilters.prototype.initialize = function() {
	GenericSnippet.prototype.initialize.call(this);
	
	this.getDateList();
	this.getUsers();
	this.getClients();
	this.getProducts();
	this.getTerminals();
	this.getTrsxStatus();
}

TrxsFilters.prototype.addHandlers = function(){
	$(this.node).find(".btn-search").click( { context : this }, this.onSearch );
}

TrxsFilters.prototype.bindEvents = function() {
	$(document).trigger("refreshBetsList");
}

TrxsFilters.prototype.getDateList = function() {
	this.getDaysList();
	this.getMonthsList();
	this.getYearsList();
	this.setDefaultDate();
}

TrxsFilters.prototype.getDaysList = function() {
	Utils.getDays().forEach(function(d,i){
		var opt = "<option data-id='" + i + "'>" + Utils.addZero(d) + "</option>";
		$(this.node).find(".select-day").append(opt);
	},this);
}

TrxsFilters.prototype.getMonthsList = function() {
	Monkeyman.getMonths()[0].es.forEach(function(d,i){
		var opt = "<option data-id='" + i + "'>" + d + "</option>";
		$(this.node).find(".select-month").append(opt);
	},this);
}

TrxsFilters.prototype.getYearsList = function() {
	Utils.getYears().forEach(function(d,i){
		var opt = "<option data-id='" + i + "'>" + d + "</option>";
		$(this.node).find(".select-year").append(opt);
	},this);
}

TrxsFilters.prototype.setDefaultDate = function() {
	var today = new Date();
	
	$(this.node).find("#day-from.select-day").val( Utils.addZero(Utils.getDays()[today.getDate()-1]) );
	$(this.node).find("#month-from.select-month").val(Monkeyman.getMonths()[0].es[today.getMonth()]);
	$(this.node).find("#year-from.select-year").val(today.getFullYear());
}


TrxsFilters.prototype.getUsers = function() {
	$.ajax({
		context : this,
		type : "POST",
		async : false,
		url : "service/manager/getUsers.php",
		success : function(r){
			$(this.node).find("#users-list").append("<option data-id='0'>Todos</option>");
			JSON.parse(r).forEach(function(d){
				var opt = "<option data-id='" + d.idUsuario + "'>" + d.usuario + "</option>";
				$(this.node).find("#users-list").append(opt);
			},this);
		},
		error : function(error){
			debugger;
		}
	})
}

TrxsFilters.prototype.getClients = function() {
	$.ajax({
		context : this,
		type : "POST",
		async : false,
		url : "service/manager/getClients.php",
		success : function(r){
			$(this.node).find("#clients-list").append("<option data-id='0'>Todos</option>");
			JSON.parse(r).forEach(function(d){
				var opt = "<option data-id='" + d.idCliente + "'>" + d.cliente + "</option>";
				$(this.node).find("#clients-list").append(opt);
			},this);
		},
		error : function(error){
			debugger;
		}
	})
}

TrxsFilters.prototype.getProducts = function() { }

TrxsFilters.prototype.getTerminals = function() {
	$.ajax({
		context : this,
		type : "POST",
		async : false,
		url : "service/manager/getTerminals.php",
		success : function(r){
			$(this.node).find("#terminals-list").append("<option data-id='0'>Todas</option>");
			JSON.parse(r).forEach(function(d){
				var opt = "<option data-modelo='" + d.modeloDeTerminal + "'>" + d.modeloDeTerminal + "</option>";
				$(this.node).find("#terminals-list").append(opt);
			},this);
		},
		error : function(error){
			debugger;
		}
	})
}

TrxsFilters.prototype.getTrsxStatus = function() {
	$.ajax({
		context : this,
		type : "POST",
		async : false,
		url : "service/manager/getTrxsStatus.php",
		success : function(r){
			JSON.parse(r).forEach(function(d){
				var opt = "<option data-status='" + d.estado + "'>" + d.estado + "</option>";
				$(this.node).find("#trxs-status-list").append(opt);
			},this);
		},
		error : function(error){
			debugger;
		}
	})
}

TrxsFilters.prototype.onSearch = function(e) {
	e.data.context.getTrxs();
}

TrxsFilters.prototype.getTrxs = function() {
	Monkeyman.isLoading("Obteniendo transacciones");
	this.initTimer();
}

TrxsFilters.prototype.initTimer = function() {
	var timer = setTimeout(this.onCompleteTimer,150,{context:this});   
}

TrxsFilters.prototype.onCompleteTimer = function(data) {
	data.context.getTrxsByFilters();	
}

TrxsFilters.prototype.getTrxsByFilters = function(){
	$.ajax({
		context : this,
		async : false,
		data : this.getData(),
		type : "POST",
		url : this.urlService,
		success : function(r){
			Monkeyman.stopLoading();
			debugger;
			var result = JSON.parse(r);
			Monkeyman.getMain().view.showDataByFilters({ trxs : result });
		},
		error : function(error){
			debugger;
		}
	});
}

TrxsFilters.prototype.getData = function(){
	var fecha = new Date();
	fecha.setDate($(this.node).find("#day-from").val());
	fecha.setMonth(Monkeyman.getMonthId($(this.node).find("#month-from").val(),"es"));
	fecha.setFullYear($(this.node).find("#year-from").val());
	fecha = fecha.getFullYear() + "-" + Monkeyman.addZero(fecha.getMonth()+1) + "-" + Monkeyman.addZero(fecha.getDate());
	
	var idUsuario = $(this.node).find("#users-list :selected").data("id");
	var idCliente = $(this.node).find("#clients-list :selected").data("id");
	var idProducto = $(this.node).find("#products-list :selected").data("id");
	var modeloDeTerminal = $(this.node).find("#terminals-list :selected").data("modelo");
	var estado = $(this.node).find("#trxs-status-list :selected").data("status");
	var clienteZona = parseInt($(this.node).find("#zones-list").val());
	
	return { 	
				fecha:fecha,
				idUsuario:(idUsuario==0) ? "" : idUsuario,
				idCliente:(idCliente==0) ? "" : idCliente,
				idProducto:(idProducto==0) ? "" : idProducto,
				modeloDeTerminal:(modeloDeTerminal==0) ? "" : modeloDeTerminal,
				estado:estado,
				clienteZona:(clienteZona==0) ? "" : clienteZona 
			}
}
