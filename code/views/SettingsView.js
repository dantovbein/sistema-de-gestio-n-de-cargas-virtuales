function SettingsView(config){
	GenericView.call(this,config);
}

SettingsView.prototype.constructor = SettingsView;

inheritPrototype(SettingsView,GenericView);

SettingsView.prototype.initializeParameters = function() {
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/settingsView.html";
}

SettingsView.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
	this.getClients();
}

SettingsView.prototype.addHandlers = function(){
	GenericView.prototype.addHandlers.call(this);
	$(this.node).find(".btn-save-clients").click({ context:this },this.onSaveClients );
}

SettingsView.prototype.getClients = function(){
	this.itemsClient = [];
	$.ajax({
		context : this,
		async : false,
		url : "service/manager/getClients.php",
		success : function(r){
			if(JSON.parse(r).length==0){
				$(this.node).find(".list-client-settings").append('<li class="message-no-result">'+Globals.MESSAGE_NO_CLIENTS+'</li>');
				$(this.node).find(".wrapper-settings-item-nav").css({ display:"none" });
				$(this.node).find(".tittle-client-settings").css({ display:"none" });
			}else{
				var itemClient;
				JSON.parse(r).forEach(function(d){
					itemClient = new ItemClient({ container:$(this.node).find(".list-client-settings"),data:d });
					this.itemsClient.push(itemClient)
				},this);
			}
		},
		error : function(error){
			debugger;
		}
	})
}

SettingsView.prototype.onSaveClients = function(e) {
	var self = e.data.context;
	self.updateClients();
	/*Monkeyman.isLoading("Guardando clientes");
	self.itemsClient.forEach(function(item){
		item.updateData();
	});
	Monkeyman.stopLoading();*/
}

SettingsView.prototype.updateClients = function() {
	
	Monkeyman.isLoading("Guardando clientes");
	this.dataClients = [];
	this.itemsClient.forEach(function(item){
		this.dataClients.push(item.getClientData());
	},this);
	
	$.ajax({
		context : this,
		type : "POST",
		data : { 
			clients : JSON.stringify(this.dataClients)
		},
		url : "service/manager/updateClients.php",
		success : function(r){
			debugger;
			Monkeyman.stopLoading();
		},
		error : function(error){
			debugger;
			Monkeyman.stopLoading();
		}
	});
}