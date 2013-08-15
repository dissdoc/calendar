var calendar = new Calendar.Loader.HtmlLoader('calendar');
calendar.generate();
calendar.initDaysOfWeek();

var date = new Calendar.Dater.Datetime();

var day = date.getDay();
var month = date.getMonth();
var year = date.getYear();

var headerMonth = document.getElementsByClassName('month-title')[0];
headerMonth.innerText = date.getHeaderDate(month, year);

calendar.fillDays(date.getDays(year, month, day), day);

var rightBtn = document.getElementById('right-button');
var leftBtn = document.getElementById('left-button');
var currentBtn = document.getElementById('current-button');

rightBtn.addEventListener('click', function(e) {
	if (month == 11) {
		month = 0;
		year++;
	} else {
		month++;
	}
	calendar.clearDays();
	calendar.initDaysOfWeek();
	calendar.fillDays(date.getDays(year, month, day), 0);	
	headerMonth.innerText = date.getHeaderDate(month, year);	
});

leftBtn.addEventListener('click', function(e) {
	if (month == 0) {
		month = 11;
		--year;
	} else {
		month--;
	}
	calendar.clearDays();
	calendar.initDaysOfWeek();
	calendar.fillDays(date.getDays(year, month, day), 0);
	headerMonth.innerText = date.getHeaderDate(month, year);
});

currentBtn.addEventListener('click', function(e) {
	day = date.getDay();
	month = date.getMonth();
	year = date.getYear();	

	calendar.clearDays();
	calendar.initDaysOfWeek();
	calendar.fillDays(date.getDays(year, month, day), day);	
	headerMonth.innerText = date.getHeaderDate(month, year);
});


/* Popup under buttons */
var addIdea = document.getElementById('add-idea');
var popupTop = document.getElementsByClassName('popup-top')[0];
var closeTop = popupTop.getElementsByClassName('close')[0];
var addBtn = popupTop.getElementsByClassName('create')[0];

addIdea.addEventListener('click', function(e) {
	popupTop.style.display = 'block';
	addIdea.className = addIdea.className + ' under-button'; 
});

closeTop.addEventListener('click', function(e) {
	popupTop.style.display = 'none';
	addIdea.className = 'action border';
});

addBtn.addEventListener('click', function(e) {
	popupTop.style.display = 'none';
	addIdea.className = 'action border';
});