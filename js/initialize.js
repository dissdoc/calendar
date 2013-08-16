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

var storage = new Calendar.Storage.Stream();

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

var parser = new Calendar.Dater.Parser();

/* Popup under buttons */
var addIdea = document.getElementById('add-idea');
var popupTop = document.getElementById('fast-add-idea');
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
	var fastField = document.getElementById('fast-field');
	var data = fastField.value.split(',');
	if (data.length < 3) return;

	var _key = parser.getData(data[0]);
	if (_key == null) return;

	var message = data[2].trim();
	if (message.length <= 0) return;

	var KEY = _key.day + "-" + _key.month + "-" + _key.year;
	var DATA = {'message': message, 'people': null, 'description': null};

	storage.write(KEY, JSON.stringify(DATA));
	calendar.setIdea(KEY, DATA);			

	popupTop.style.display = 'none';
	addIdea.className = 'action border';
});