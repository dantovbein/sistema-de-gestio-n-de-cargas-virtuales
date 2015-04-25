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
	this.dataSnippet = [ this.config.data.idCliente,this.config.data.cliente,this.config.data.clienteComisionTelefonia,this.config.data.clienteComisionTvPrepaga,this.statusClient ]
}

ItemClient.prototype.initialize = function(){
	GenericSnippet.prototype.initialize.call(this);
	this.clientId = $(this.node).data("id");
	
	this.setStatusClient();
	this.setZoneClient();
}

ItemClient.prototype.setStatusClient = function(){
	$(this.node).find(".btn-status span").text((this.statusClient==1) ? "Desactivar" : "Activar" );
}

ItemClient.prototype.setZoneClient = function(){
	$(this.node).find(".select-zone").find("option[value=" + this.zoneClient + "]").prop("selected",true);
} 

ItemClient.prototype.updateData = function(){
	var clienteComisionTelefonia = (isNaN($(this.node).find(".tel.comision-amount").val().replace(",","."))) ? "0.00" : $(this.node).find(".tel.comision-amount").val().replace(",",".");
	$.ajax({
		context : this,
		type : "POST",
		data : { 
					idCliente:this.config.data.idCliente,
					clienteZona:$(this.node).find(".select-zone").val(),
					clienteComisionTelefonia:clienteComisionTelefonia,
					clienteComisionTvPrepaga:this.getTvComisionAmount(),
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
				clienteComisionTelefonia:(isNaN($(this.node).find(".tel.comision-amount").val().replace(",","."))) ? "0.00" : parseFloat($(this.node).find(".tel.comision-amount").val().replace(",",".")).toFixed(2),
				clienteComisionTvPrepaga:this.getTvComisionAmount(),
				clienteStatus:this.statusClient
	}
}

ItemClient.prototype.getTvComisionAmount = function(){
	return (isNaN($(this.node).find(".tv.comision-amount").val().replace(",","."))) ? "0.00" : $(this.node).find(".tv.comision-amount").val().replace(",",".");
}