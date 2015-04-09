function Main() {
	this.initializeParameters();
	this.initialize();	
}

Main.prototype.constructor = Main;

Main.prototype.initializeParameters = function() {
	this.isLogged = false;
	this.container = $("body");
	this.currentView  = "";
	Monkeyman.setMain(this);
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
		url: Utils.getHost() +  "service/logout.php",
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

	$(this.node).find(".btn-transactions").click( { context:this, view:Globals.TRANSACTIONS_VIEW },function(e){
		e.data.context.getView({ view:e.data.view, target:this });
	});
	$(this.node).find(".btn-upload-file").click( { context:this, view:Globals.UPLOAD_FILE_VIEW },function(e){
		e.data.context.getView({ view:e.data.view, target:this });
	});
	$(this.node).find(".btn-files").click( { context:this, view:Globals.FILES_VIEW },function(e){
		e.data.context.getView({ view:e.data.view, target:this });
	});
	$(this.node).find(".btn-settings").click( { context:this, view:Globals.SETTINGS_VIEW },function(e){
		e.data.context.getView({ view:e.data.view, target:this });
	});

	this.getView({ view:Globals.TRANSACTIONS_VIEW, target:$(this.node).find(".btn-transactions") });
	this.addTopButton();
}

Main.prototype.getView = function(data) {
	if(this.currentView != "" && this.currentView == data.view){
		return false;
	}else{
		this.currentView = data.view;
		Utils.removeContent();
		Monkeyman.highlightButton(data.target,$(this.node).find(".main-nav ul"),"selected");
		switch(this.currentView){
			case Globals.TRANSACTIONS_VIEW:
				this.view = new TransactionsView({ container:$(this.node).find("#main-content") });
				break;
			case Globals.UPLOAD_FILE_VIEW:
				this.view = new UploadFileView({ container:$(this.node).find("#main-content") });
				break;
			case Globals.FILES_VIEW:
				this.view = new FilesView({ container:$(this.node).find("#main-content") });
				break;
			case Globals.SETTINGS_VIEW:
				this.view = new SettingsView({ container:$(this.node).find("#main-content") });
				break;
		}
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
