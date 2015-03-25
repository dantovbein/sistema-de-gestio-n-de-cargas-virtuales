function Login(config){
	GenericSnippet.call(this,config);
}

Login.prototype.constructor = Login;

inheritPrototype(Login,GenericSnippet);

Login.prototype.initializeParameters = function(){
	GenericSnippet.prototype.initializeParameters.call(this);
	this.path = "snippets/login.html";	
}

Login.prototype.addHandlers = function() {
	GenericSnippet.prototype.addHandlers.call(this);
	$(this.node).find(".btn-login").click({ context:this },this.onLogin );
}

Login.prototype.onLogin = function(e){
	var self = e.data.context;
	var userName = $(self.node).find("#inputUserName").val();
	var userPassword = $(self.node).find("#inputPassword").val();
	if( userName == "" || userPassword == "") {
		$(self.node).find(".error-message").text("Campos incompletos");
	} else {
		$.ajax({
			context : self,
			async : true,
			url: Utils.getHost() + "service/manager/login.php",
			type: "POST",
			data:{  userName : userName, userPassword : userPassword },
			success:function(r) {
				if(r == 1) {
					$(this.node).find(".error-message").text("");
					$(this).trigger({ type:Globals.SUCCESSFULLY_LOGGED_IN });
				} else {
					$(self.node).find(".error-message").text(r);
				}
			},
			error:function(event) {
				debugger;
			}
		})
	} 
}