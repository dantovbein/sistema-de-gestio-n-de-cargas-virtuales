function TransactionsView(config){
	GenericView.call(this,config);
}

TransactionsView.prototype.constructor = TransactionsView;

inheritPrototype(TransactionsView,GenericView);

TransactionsView.prototype.initializeParameters = function() {
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/transactionsView.html";
}