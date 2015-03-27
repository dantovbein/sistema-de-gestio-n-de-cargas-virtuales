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
	$.ajax({
		context : this,
		async : false,
		url : "service/manager/getFiles.php",
		success : function(r){
			var result = JSON.parse(r);
			var itemFile;

			result.forEach(function(f){
				itemFile = new ItemFile({ container:$(this.node).find(".files-list"),data:f });
			},this);
		},
		error : function(error){
			debugger;
		}
	})
}