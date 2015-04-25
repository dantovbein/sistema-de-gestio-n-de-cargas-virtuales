function TrxGroupDataMobileCompanies(config){
	TrxGroupData.call(this,config);
}

inheritPrototype(TrxGroupDataMobileCompanies,TrxGroupData);

TrxGroupDataMobileCompanies.prototype.constructor = TrxGroupDataMobileCompanies;

TrxGroupDataMobileCompanies.prototype.initializeParameters = function() {
	this.clienteComision = Number(this.config.data[0].clienteComisionTelefonia);
	TrxGroupData.prototype.initializeParameters.call(this);
	this.path = "snippets/trxGroupDataMobileCompanies.html";
}

TrxGroupDataMobileCompanies.prototype.getTotalImporteComision = function() {
	return Number(this.clienteComision) * this.tiradas;
}

TrxGroupDataMobileCompanies.prototype.getDataSnippet = function(){
	return [ 	
		this.totalTrxs.toFixed(2),
		this.tiradas,
		this.clienteComision.toFixed(2),
		this.totalImporteComision.toFixed(2),
		(this.totalTrxs + this.totalImporteComision).toFixed(2)
	];
}