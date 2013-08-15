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

	Calendar.Dater.Datetime.prototype.getHeaderDate = function(month, year) {
		return Calendar.months[month] + " " + year;
	};

	Calendar.Dater.Datetime.prototype.getDay = function() {
		return this.day;
	};

	Calendar.Dater.Datetime.prototype.getMonth = function() {
		return this.month;
	};

	Calendar.Dater.Datetime.prototype.getYear = function() {
		return this.year;
	};

	Calendar.Dater.Datetime.prototype.getDays = function(year, month, day) {
		var days = [];

		var count = new Date(year, month+1, 0).getDate();
		
		var point = new Date(year, month, 1).getDay();
		if (point == 0) point = 7;

		if (point != 1) {
			var last_month_days = new Date(year, month, 0).getDate();
			for (var d = (last_month_days - (point - 1)) + 1; d <= last_month_days; d++)
				days.push(d);
		}

		for (var d = 1; d <= count; d++) 
			days.push(d);

		var length = days.length;
		if (length > 35) {
			for (var i = 35; i < length; i++) {
				days.pop();
			}
		} else if (length < 35) {
			for (var i = 1; i <= 35 - length; i++) {
				days.push(i);
			}
		}

		return days;
	};
	
}());