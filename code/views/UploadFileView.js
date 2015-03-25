function UploadFileView(config){
	GenericView.call(this,config);
}

UploadFileView.prototype.constructor = UploadFileView;

inheritPrototype(UploadFileView,GenericView);

UploadFileView.prototype.initializeParameters = function() {
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/uploadFileView.html";
}