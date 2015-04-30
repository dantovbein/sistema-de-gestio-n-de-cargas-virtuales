function DownloadFile(config){
	GenericSnippet.call(this,config);
}

inheritPrototype(DownloadFile,GenericSnippet);

DownloadFile.prototype.constructor = DownloadFile;

DownloadFile.prototype.initializeParameters = function(){
	GenericSnippet.prototype.initializeParameters.call(this);
	this.path = "snippets/downloadFile.html";
	debugger;
	this.dataSnippet = [ this.config.data.pathFile ];

}

DownloadFile.prototype.addHandlers = function(){
	$(this.node).find(".btn").click({ context:this },function(e){
		Monkeyman.removeOverlay();
		e.data.context.destroy();
	});
}