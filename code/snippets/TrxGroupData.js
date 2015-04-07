function TrxGroupData(config) {
	GenericSnippet.call(this,config);
} 

inheritPrototype(TrxGroupData,GenericSnippet);

TrxGroupData.prototype.constructor = TrxGroupData;

TrxGroupData.prototype.initializeParameters = function() {
	var tiradas = this.config.data.length;
	var clienteComision = parseFloat(this.config.data[0].clienteComision);
	var totalImporteComision = clienteComision * tiradas;
	this.totalTrxs = 0;
	this.config.data.forEach(function(t){
		this.totalTrxs += parseFloat(t.importe);
	},this);
	this.dataSnippet = [this.totalTrxs.toFixed(2),tiradas,clienteComision.toFixed(2),totalImporteComision.toFixed(2),parseFloat(this.totalTrxs + totalImporteComision).toFixed(2) ];
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