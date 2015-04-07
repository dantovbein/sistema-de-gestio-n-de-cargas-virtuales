function TvCompaniesFilters(config){
	TrxsFilters.call(this,config);
}

inheritPrototype(TvCompaniesFilters,TrxsFilters);

TvCompaniesFilters.prototype.constructor = TvCompaniesFilters;

TvCompaniesFilters.prototype.initializeParameters = function(){
	TrxsFilters.prototype.initializeParameters.call(this);
	this.path = "snippets/tvCompaniesFilters.html";
	this.urlService = "service/manager/getTvTrxs.php";
}

TvCompaniesFilters.prototype.initialize = function(){
	TrxsFilters.prototype.initialize.call(this);
}

TvCompaniesFilters.prototype.getProducts = function() {
	$.ajax({
		context : this,
		type : "POST",
		async : false,
		url : "service/manager/getProducts.php",
		success : function(r){
			JSON.parse(r).forEach(function(d){
				if(d.idProducto == 24){	
					var opt = "<option data-id='" + d.idProducto + "'>" + d.producto + "</option>";
					$(this.node).find("#products-list").append(opt);
				}
			},this);
		},
		error : function(error){
			debugger;
		}
	})
}