function ItemClient(config){
	GenericSnippet.call(this,config);
}

inheritPrototype(ItemClient,GenericSnippet);

ItemClient.prototype.constructor = ItemClient;

ItemClient.prototype.initializeParameters = function(){
	GenericSnippet.prototype.initializeParameters.call(this);
	this.path = "snippets/itemClient.html";

	this.statusClient = parseInt(this.config.data.clienteStatus);
	this.zoneClient = (this.config.data.clienteZona=="") ? 0 : this.config.data.clienteZona;
	this.dataSnippet = [ this.config.data.idCliente,this.config.data.cliente,this.config.data.clienteComision,this.statusClient ]
}

ItemClient.prototype.initialize = function(){
	GenericSnippet.prototype.initialize.call(this);
	this.clientId = $(this.node).data("id");
	
	this.setStatusClient();
	this.setZoneClient();
	//$(this.node).find(".btn-save").click({ context:this }, this.onSaveHandler );
	//$(this.node).find(".btn-status").click({ context:this }, this.onStatusHandler );
}

ItemClient.prototype.onSaveHandler = function(e){
	//e.data.context.updateData();
}

ItemClient.prototype.onStatusHandler = function(e){
	var self = e.data.context;
	self.statusClient = (self.statusClient==1) ? 0 : 1;
	self.setStatusClient();
}

ItemClient.prototype.setStatusClient = function(){
	$(this.node).find(".btn-status span").text((this.statusClient==1) ? "Desactivar" : "Activar" );
}

ItemClient.prototype.setZoneClient = function(){
	$(this.node).find(".select-zone").find("option[value=" + this.zoneClient + "]").prop("selected",true);
} 

ItemClient.prototype.updateData = function(){
	var clienteComision = (isNaN($(this.node).find(".comision-amount").val().replace(",","."))) ? "0.00" : $(this.node).find(".comision-amount").val().replace(",",".");
	$.ajax({
		context : this,
		type : "POST",
		data : { 
					idCliente:this.config.data.idCliente,
					clienteZona:$(this.node).find(".select-zone").val(),
					clienteComision:clienteComision,
					clienteStatus:this.statusClient
		},
		url : "service/manager/updateClient.php",
		success : function(r){
			debugger;
		},
		error : function(error){
			debugger;
		}
	});
}

ItemClient.prototype.getClientData = function() {
	return { 
				idCliente:this.config.data.idCliente,
				clienteZona:$(this.node).find(".select-zone").val(),
				clienteComision:(isNaN($(this.node).find(".comision-amount").val().replace(",","."))) ? "0.00" : parseFloat($(this.node).find(".comision-amount").val().replace(",",".")).toFixed(2),
				clienteStatus:this.statusClient
	}
}