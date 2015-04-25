function TransactionsView(config){
	GenericView.call(this,config);
}

TransactionsView.prototype.constructor = TransactionsView;

inheritPrototype(TransactionsView,GenericView);

TransactionsView.prototype.initializeParameters = function() {
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/transactionsView.html";
}

TransactionsView.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
	this.getFilters();
}

TransactionsView.prototype.getFilters = function() {
	this.managerTrxsFilters = new ManagerTrxsFilters( { container:$(this.node).find(".wrapper-filters"),_parent:this } );
}

TransactionsView.prototype.showDataByFilters = function(data) {
	$(this.node).find(".wrapper-trxs-list").empty();
	this.trxs = [];
	data.trxs.forEach(function(t,i){
		if(this.trxs.length == 0){
			var arr = [];
			arr.push(t);
			this.trxs.push(arr);
		}else{
			var lastArr = this.trxs[this.trxs.length-1];
			if(lastArr[lastArr.length-1].idCliente == t.idCliente){
				lastArr.push(t);
			}else{
				var arr = [];
				arr.push(t);
				this.trxs.push(arr);
			}
		}
	},this);
	if(this.trxs.length == 0){
		$(this.node).find(".wrapper-trxs-list").append('<li class="message-no-result">'+Globals.MESSAGE_NO_RESULT+'</li>');
		$(this.node).find(".wrapper-trxs-amount").css({ display:"none"});
	}else{
		this.totalClientsBetAmount = 0;
		this.totalClientsTiradasAmount = 0;		

		this.trxs.forEach(function(g){
			switch(data.trxType){
				case Globals.TRXS_MOBILE_COMPANIES:
					var trxGroupData = new TrxGroupDataMobileCompanies( { container:$(this.node).find(".wrapper-trxs-list"),data:g } );
					break;
				case Globals.TRXS_TV_COMPANIES:
					var trxGroupData = new TrxGroupDataTvCompanies( { container:$(this.node).find(".wrapper-trxs-list"),data:g } );
					break;
			}
			this.totalClientsBetAmount += trxGroupData.totalTrxs;
			this.totalClientsTiradasAmount += trxGroupData.totalImporteComision;
		},this);
		this.totalClientsTrxAmount = this.totalClientsBetAmount + this.totalClientsTiradasAmount;
		$(this.node).find(".wrapper-trxs-amount").find(".total-clients-bet-amount").html("$"+this.totalClientsBetAmount.toFixed(2));
		$(this.node).find(".wrapper-trxs-amount").find(".total-clients-tiradas-amount").html("$"+this.totalClientsTiradasAmount.toFixed(2));
		$(this.node).find(".wrapper-trxs-amount").find(".total-clients-trx-amount").html("$"+this.totalClientsTrxAmount.toFixed(2));
		$(this.node).find(".wrapper-trxs-amount").css({ display:"inline-block"});
	}
}

GenericView.prototype.reset = function() {
	//$(this.node).find(".wrapper-data-list").empty();
	//$(this.node).find(".wrapper-trxs-group").empty();	
	$(this.node).find(".wrapper-trxs-list").empty();
}


