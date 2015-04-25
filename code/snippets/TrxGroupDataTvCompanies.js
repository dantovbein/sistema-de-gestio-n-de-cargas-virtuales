function TrxGroupDataTvCompanies(config){
	TrxGroupData.call(this,config);
}

inheritPrototype(TrxGroupDataTvCompanies,TrxGroupData);

TrxGroupDataTvCompanies.prototype.constructor = TrxGroupDataTvCompanies;

TrxGroupDataTvCompanies.prototype.initializeParameters = function() {
	this.clienteComision = Number(this.config.data[0].clienteComisionTvPrepaga);
	TrxGroupData.prototype.initializeParameters.call(this);
	this.path = "snippets/trxGroupDataTvCompanies.html";
}

TrxGroupDataTvCompanies.prototype.getTotalImporteComision = function() {
	return (Number(this.clienteComision) / 100) * Number(this.totalTrxs.toFixed(2));
}

TrxGroupDataTvCompanies.prototype.getDataSnippet = function(){
	return [ 	
		this.totalTrxs.toFixed(2),
		this.clienteComision.toFixed(2),
		this.totalImporteComision.toFixed(2),
		(this.totalTrxs + this.totalImporteComision).toFixed(2)
	];
}