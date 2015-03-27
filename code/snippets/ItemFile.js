function ItemFile(config){
	GenericSnippet.call(this,config);
}

inheritPrototype(ItemFile,GenericSnippet);

ItemFile.prototype.constructor = ItemFile;

ItemFile.prototype.initializeParameters = function(){
	GenericSnippet.prototype.initializeParameters.call(this);
	this.path = "snippets/itemFile.html";
	this.dataSnippet = [ 	this.config.data.fileId,
							this.config.data.fileName,
							this.config.data.createdFile.split("-")[2] + "-" + this.config.data.createdFile.split("-")[1] + "-" + this.config.data.createdFile.split("-")[0],
							this.config.data.fileName 
						];
}