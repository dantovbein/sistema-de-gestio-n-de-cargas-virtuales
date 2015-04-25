function TrxGroupData(config) {
	GenericSnippet.call(this,config);	
} 

inheritPrototype(TrxGroupData,GenericSnippet);

TrxGroupData.prototype.constructor = TrxGroupData;

TrxGroupData.prototype.initializeParameters = function() {	
	this.totalTrxs = 0;
	this.tiradas = 0;
	this.config.data.forEach(function(t){
		this.totalTrxs += Number(t.importe);
		this.tiradas += Number(t.cantidadTrxs);
	},this);

	this.totalImporteComision = Number(this.getTotalImporteComision());
	this.dataSnippet = this.getDataSnippet();

	GenericSnippet.prototype.initializeParameters.call(this);
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

TrxGroupData.prototype.getTotalImporteComision = function() {
	return 0;
}

TrxGroupData.prototype.getDataSnippet = function() {
	return [];
}

TrxGroupData.prototype.setTiradas = function(value) {
	this.tiradas = value;
}

TrxGroupData.prototype.getTiradas = function() {
	return this.tiradas;
}