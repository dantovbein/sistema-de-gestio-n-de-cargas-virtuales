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
							this.config.data.fileName,
							this.config.data.fileName 
						];
}

ItemFile.prototype.addHandlers = function(){
	GenericSnippet.prototype.addHandlers.call(this);
	$(this.node).find(".btn-remove").click({ context:this },this.onRemoveHandler );	
}

ItemFile.prototype.onRemoveHandler = function(e){
	e.stopPropagation();
	var self = e.data.context;
	Monkeyman.stopLoading();
    Monkeyman.getOverlay();
    var popup = new AlertMessage({ container:$("body"), message: "Esta seguro que quiere remover el archivo y toda su imformacion relacionada?" }); 
    $(popup).bind( Globals.ON_ALERT_MESSAGE_HANDLER, { context:self } ,self.onAlertMessageHandler, false );	
}

ItemFile.prototype.onAlertMessageHandler = function(e){
	e.stopPropagation();
    if(e.value == 1){
        // remvove data
        Monkeyman.isLoading();
        e.data.context.removeDataById(e.data.context.config.data.fileId);
    }else{
        // cancel remove data
    }
    Monkeyman.removeOverlay();
    e.currentTarget.destroy();
}

ItemFile.prototype.removeDataById = function(fileId){
    debugger;
    $.ajax({
        context : this,
        url : 'service/manager/removeDataById.php',
        type : 'POST',
        data : { fileId : fileId },
        success : function(r){
            this.removeFile(this.config.data.fileName);
        },
        error : function(error){
            alert(error);
        }
    });
}

ItemFile.prototype.removeFile = function(fileName){
    $.ajax({
        context : this,
        url : 'service/manager/removeFile.php',
        async : false,
        type : 'POST',
        data : { fileName : fileName },
        success : function(r){
        	Monkeyman.stopLoading();
        	$(this).trigger({ type:Globals.RELOAD_DATA });
            debugger;
        },
        error : function(error){
            debugger;
        }
    })
}

