var calendar = new Calendar.Loader.HtmlLoader('calendar');
calendar.generate();
calendar.initDaysOfWeek();

var date = new Calendar.Dater.Datetime();
document.getElementsByClassName('month-title')[0].innerText = date.getHeaderDate();

calendar.fillDays(date.getDays(date.getYear(), date.getMonth(), date.getDay()), date.getDay());