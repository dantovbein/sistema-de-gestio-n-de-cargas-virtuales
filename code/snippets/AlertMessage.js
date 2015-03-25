function AlertMessage(config){
	GenericSnippet.call(this,config);
}

inheritPrototype(AlertMessage,GenericSnippet);

AlertMessage.prototype.constructor = AlertMessage;

AlertMessage.prototype.initializeParameters = function(){
	GenericSnippet.prototype.initializeParameters.call(this);
	this.path = "views/alertMessage.html";
	this.dataSnippet = [ this.config.message ];
}

AlertMessage.prototype.initialize = function() {
	GenericSnippet.prototype.initialize.call(this);

	$(this.node).css({
		top:$(window).height() / 2 - $(this.node).outerHeight() / 2
	});

	this.addHandlers();
}

AlertMessage.prototype.addHandlers = function() {
	$(this.node).find(".btn-cancel").click({ context:this },this.onClickHandler );
	$(this.node).find(".btn-confirm").click({ context:this },this.onClickHandler );
}

AlertMessage.prototype.onClickHandler = function(e){
	$(e.data.context.node).trigger( { type:"onMessageHandler" , value:$(this).data("value") } );
}