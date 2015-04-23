function TrxGroupData(config) {
	this.totalTrxs = 0;
	this.tiradas = 0;
	config.data.forEach(function(t){
		this.totalTrxs += Number(t.importe);
		this.tiradas += Number(t.cantidadTrxs);
	},this);
	Number(this.totalTrxs);
	Number(this.tiradas);
	this.clienteComision = Number(config.data[0].clienteComision);
	this.totalImporteComision = Number(this.clienteComision) * this.tiradas;
	GenericSnippet.call(this,config);	
} 

inheritPrototype(TrxGroupData,GenericSnippet);

TrxGroupData.prototype.constructor = TrxGroupData;

TrxGroupData.prototype.initializeParameters = function() {	
	this.dataSnippet = [ 	
							this.totalTrxs.toFixed(2),
						 	this.tiradas,
						 	this.clienteComision.toFixed(2),
						 	this.totalImporteComision.toFixed(2),
						 	(this.totalTrxs + this.totalImporteComision).toFixed(2)
						];
	GenericSnippet.prototype.initializeParameters.call(this);
	this.path = "snippets/trxGroupData.html";
}

TrxGroupData.prototype.initialize = function() {
	GenericSnippet.prototype.initialize.call(this);
	this.config.data.forEach(function(t){
		var trxListData = new TrxListData({ container:$(this.node).find(".wrapper-trxs-list-data"),data:t });
	},this);
}

TrxGroupData.prototype.addHandlers = function() {
	GenericSnippet.prototype.addHandlers.call(this);
}

TrxGroupData.prototype.setTiradas = function(value) {
	this.tiradas = value;
}

TrxGroupData.prototype.getTiradas = function() {
	return this.tiradas;
}