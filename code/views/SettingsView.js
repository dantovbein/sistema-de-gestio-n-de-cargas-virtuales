function SettingsView(config){
	GenericView.call(this,config);
}

SettingsView.prototype.constructor = SettingsView;

inheritPrototype(SettingsView,GenericView);

SettingsView.prototype.initializeParameters = function() {
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/settingsView.html";
}