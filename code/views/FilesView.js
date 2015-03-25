function FilesView(config){
	GenericView.call(this,config);
}

FilesView.prototype.constructor = FilesView;

inheritPrototype(FilesView,GenericView);

FilesView.prototype.initializeParameters = function() {
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/filesView.html";
}