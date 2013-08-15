/**
 * Модуль работы с датой
 */
(function() {

	Calendar.Dater.Datetime = function() {
		this.current_date = new Date();
		this.months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
			'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	};

	Calendar.Dater.Datetime.prototype.getCurrentTime = function() {
		return this.current_date.getDate() + "-" +
			   this.months[this.current_date.getMonth()] + "-" +
			   this.current_date.getFullYear();
	};

	Calendar.Dater.Datetime.prototype.getHeaderDate = function() {
		return this.months[this.current_date.getMonth()] + " " +
			   this.current_date.getFullYear();
	};
	
}());