var calendar = new Calendar.Loader.HtmlLoader('calendar');
calendar.generate();
calendar.initDaysOfWeek();

var date = new Calendar.Dater.Datetime();
document.getElementsByClassName('month-title')[0].innerText = date.getHeaderDate();