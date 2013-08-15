/**
 * Модуль работы с датой
 */
(function() {

	Calendar.Dater.Datetime = function() {
		this.current_date = new Date();
		this.year = this.current_date.getFullYear();
		this.month = this.current_date.getMonth();
		this.day = this.current_date.getDate();		
	};

	Calendar.Dater.Datetime.prototype.getCurrentTime = function() {
		return this.day + "-" +
			   Calendar.months[this.month] + "-" +
			   this.year;
	};

	Calendar.Dater.Datetime.prototype.getHeaderDate = function() {
		return Calendar.months[this.month] + " " +
			   this.year;
	};

	Calendar.Dater.Datetime.prototype.getDays = function() {
		var days = [];

		var count = new Date(this.year, this.month+1, 0).getDate();
		
		var point = new Date(this.year, this.month, 1).getDay();
		if (point == 0) point = 7;

		if (point != 1) {
			var last_month_days = new Date(this.year, this.month, 0).getDate();
			for (var d = (last_month_days - (point - 1)) + 1; d <= last_month_days; d++)
				days.push(d);
		}

		for (var d = 1; d <= count; d++) 
			days.push(d);
		
		if (days.length > 35) {
			for (var i = 35; i < days.length; i++) {
				days.pop();
			}
		} else if (days.length < 35) {
			for (var i = 1; i <= 35 - days.length; i++) {
				days.push(i);
			}
		}

		return days;
	}
	
}());