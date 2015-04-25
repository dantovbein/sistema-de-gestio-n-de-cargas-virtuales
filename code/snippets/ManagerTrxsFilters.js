function ManagerTrxsFilters(config) {
	GenericSnippet.call(this,config);
} 

inheritPrototype(ManagerTrxsFilters,GenericSnippet);

ManagerTrxsFilters.prototype.constructor = ManagerTrxsFilters;

ManagerTrxsFilters.prototype.initializeParameters = function() {
	GenericSnippet.prototype.initializeParameters.call(this);
	this.path = "snippets/managerTrxsFilters.html";
}

ManagerTrxsFilters.prototype.initialize = function() {
	GenericSnippet.prototype.initialize.call(this);
	this.getMobileCompaniesFilters();
}

ManagerTrxsFilters.prototype.addHandlers = function() {
	GenericSnippet.prototype.addHandlers.call(this);
	$(this.node).find(".btn-filters-by-mobile-companies").click( { context : this }, function(e){
		e.preventDefault();
		e.data.context.getMobileCompaniesFilters();
	});
	$(this.node).find(".btn-filters-by-tv-companies").click( { context : this }, function(e){
		e.preventDefault();
		e.data.context.getTvCompaniesFilters();
	});
	$(this.node).find(".btn-report-filters").click( { context : this }, function(e){
		e.preventDefault();
		e.data.context.getReportFilters();
	});
}

ManagerTrxsFilters.prototype.getMobileCompaniesFilters = function(){
	this.config._parent.reset();
	$(this.node).find(".wrapper-form-data-filters").empty();
	Monkeyman.highlightButton($(this.node).find(".btn-filters-by-mobile-companies"),$(this.node).find(".data-filters-main-nav ul"),"selected");
	var filters = new MobileCompaniesFilters({ container:$(this.node).find(".wrapper-form-data-filters") });
}

ManagerTrxsFilters.prototype.getTvCompaniesFilters = function(){
	this.config._parent.reset();
	$(this.node).find(".wrapper-form-data-filters").empty();
	Monkeyman.highlightButton($(this.node).find(".btn-filters-by-tv-companies"),$(this.node).find(".data-filters-main-nav ul"),"selected");
	var filters = new TvCompaniesFilters({ container:$(this.node).find(".wrapper-form-data-filters") });
}

ManagerTrxsFilters.prototype.getReportFilters = function(){
	this.config._parent.reset();
	$(this.node).find(".wrapper-form-data-filters").empty();
	Monkeyman.highlightButton($(this.node).find(".btn-report-filters"),$(this.node).find(".data-filters-main-nav ul"),"selected");
	var filters = new ReportFilters({ container:$(this.node).find(".wrapper-form-data-filters") });
}
