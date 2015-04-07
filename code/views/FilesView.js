function FilesView(config){
	GenericView.call(this,config);
}

FilesView.prototype.constructor = FilesView;

inheritPrototype(FilesView,GenericView);

FilesView.prototype.initializeParameters = function() {
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/filesView.html";
}

FilesView.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
	this.getFiles();
}

FilesView.prototype.getFiles = function(){
	$(this.node).find(".files-list").empty();
	$.ajax({
		context : this,
		async : false,
		url : "service/manager/getFiles.php",
		success : function(r){
			debugger;
			var result = JSON.parse(r);
			var itemFile;

			result.forEach(function(f){
				itemFile = new ItemFile({ container:$(this.node).find(".files-list"),data:f });
				$(itemFile).bind(Globals.RELOAD_DATA,{ context:this},this.reloadData,false);
			},this);
		},
		error : function(error){
			debugger;
		}
	})
}

FilesView.prototype.reloadData = function(e){
	debugger;
	e.stopPropagation();
	var self = e.data.context;
	self.getFiles();
}