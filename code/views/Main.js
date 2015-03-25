function Main() {
	this.initializeParameters();
	this.initialize();	
}

Main.prototype.constructor = Main;

Main.prototype.initializeParameters = function() {
	this.isLogged = false;
	this.container = $("body");
}

Main.prototype.initialize = function() {
	this.addHandlers();
	this.checkForSession();
}

Main.prototype.addHandlers = function() { }

Main.prototype.checkForSession = function() {
	$.ajax({
		context : this,
		async : false,
		url : Utils.getHost() + "service/manager/checkForSession.php",
		success : function(r){
			if(r == "0")
				this.getLogin();
			else
				this.getMainView();
		},
		error : function(error){
			debugger;
		}
	});
}

Main.prototype.getLogin = function() {
	var login = new Login({ container:this.container });
	$(login).bind( Globals.SUCCESSFULLY_LOGGED_IN, { context:this } ,this.onLoggedIn, false );
}

Main.prototype.onLoggedIn = function(e){
	e.stopImmediatePropagation();
	e.data.context.getMainView();
}

Main.prototype.onLogout = function(e) {
	$("body").empty();
	var self = e.data.context;
	$.ajax({
		context : self,
		async : false,
		url: Utils.getHost() +  "service/manager/logout.php",
		success:function(r) {
			this.getLogin();
		},
		error:function(event) {
			debugger;
		}
	}); 
}

Main.prototype.getMainView = function() {
	var snippet = new Snippet( { path : "views/mainView.php" , data : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.empty();
	this.container.append(this.node);

	$(this.node).find(".btn-logout").click( { context:this },this.onLogout );

	$(this.node).find(".btn-reports").click( { context:this, view:Globals.REPORTS_VIEW },this.getView );
	$(this.node).find(".btn-upload-file").click( { context:this, view:Globals.UPLOAD_FILE_VIEW },this.getView );
	$(this.node).find(".btn-all-files").click( { context:this, view:Globals.ALL_FILES_VIEW },this.getView );
	$(this.node).find(".btn-settings").click( { context:this, view:Globals.SETTINGS_VIEW },this.getView );

	this.addTopButton();
}

Main.prototype.getView = function(e) {
	var self = e.data.context;
	Utils.removeContent();
	
	switch(e.data.view){
		case Globals.REPORTS_VIEW:
			var view = new ReportsView({ container:$(self.node).find("#main-content") });
			break;
		case Globals.UPLOAD_FILE_VIEW:
			var view = new UploadFileView({ container:$(self.node).find("body") });
			break;
		case Globals.ALL_FILES_VIEW:
			var view = new allFilesView({ container:$(self.node).find("#main-content") });
			break;
		case Globals.SETTINGS_VIEW:
			var view = new SettingsView({ container:$(self.node).find("#main-content") });
			break;
	}
}

Main.prototype.addTopButton = function(){
	$("body").append('<div class="btn btn-top"><span>↑</span><span>SUBIR</span></div>');
	$("body").find(".btn-top").click({ context:this },this.goToTop );

	$(window).scroll({ context:this }, function (event) {
		var top = $(window).scrollTop();
	  	if(top > $(window).height()){
	  		$("body").find(".btn-top").css({
	  			opacity : 1,
	  			top : 200
	  		});
	  	} else {
	  		$("body").find(".btn-top").css({
	  			opacity : 0,
	  			top : 0
	  		});
	  	}
	});
}

Main.prototype.goToTop = function(e){
	$('html, body').animate({scrollTop: 0}, 500);
}
