var Utils = {
	getHost : function(){
		return "";
		//return "http://yoviajoriveras.com/";
	},
	removeContent : function() {
		$("#main-content").empty();
	},
	addZero : function(value) {
		return (value < 10) ? "0" + parseFloat(value) : parseFloat(value);
	},
	getDays : function(){
		var days = [];
		for(var i=0;i<31;i++) { days.push(i+1); }
		return days;
	},
	getMonthId : function(month,type){
		var arrType = [];
		switch(type){
			case "es": 
				arrType = this.getMonths()[0].es; 
			break;
		}
		var id = -1;
		arrType.forEach(function(m,i){
			if(m.toLocaleLowerCase() == month.toLocaleLowerCase()){
				id = i;
			}
		});
		return id;
	},
	getYears : function(){
		return [2014,2015,2016,2017,2018,2019,2020];
	},
	getHours : function(){
		var hours = [];
		for(var i=0;i<24;i++) { hours.push(i); }
		return hours;
	},
	getMinutes : function(){
		var minutes = [];
		for(var i=0;i<60;i++) { minutes.push(i); }
		return minutes;
	},
	getSeconds : function(){
		var seconds = [];
		for(var i=0;i<60;i++) { seconds.push(i); }
		return seconds;
	}
}