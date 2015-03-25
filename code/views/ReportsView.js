function ReportsView(config){
	GenericView.call(this,config);
}

ReportsView.prototype.constructor = ReportsView;

inheritPrototype(ReportsView,GenericView);

ReportsView.prototype.initializeParameters = function() {
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/reportsView.html";
}