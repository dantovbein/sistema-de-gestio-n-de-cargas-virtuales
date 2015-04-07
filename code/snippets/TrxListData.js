function TrxListData(config) {
	GenericSnippet.call(this,config);
} 

inheritPrototype(TrxListData,GenericSnippet);

TrxListData.prototype.constructor = TrxListData;

TrxListData.prototype.initializeParameters = function() {
	GenericSnippet.prototype.initializeParameters.call(this);
	this.path = "snippets/trxListData.html";
}

TrxListData.prototype.initialize = function() {
	this.dataSnippet = [ 
							this.config.data.idTrx,
							this.config.data.fecha.split("-")[2] + "-" + this.config.data.fecha.split("-")[1] + "-" + this.config.data.fecha.split("-")[0],
							this.config.data.idCliente + " - " + this.config.data.cliente,
							this.config.data.idUsuario + " - " + this.config.data.usuario,
							this.config.data.idProducto + " - " + this.config.data.producto,
							(this.config.data.clienteZona==0) ? "-" : "ZONA " + this.config.data.clienteZona,
							this.config.data.modeloDeTerminal,
							this.config.data.identifTerminal,
							this.config.data.estado,
							this.config.data.importe
						];
	GenericSnippet.prototype.initialize.call(this);
	
}

TrxListData.prototype.addHandlers = function() {
	GenericSnippet.prototype.addHandlers.call(this);
}