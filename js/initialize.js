var calendar = new Calendar.Loader.HtmlLoader('calendar');
var date = new Calendar.Dater.Datetime();
var parser = new Calendar.Dater.Parser();
var storage = new Calendar.Storage.Stream();
var stream = new Calendar.Loader.Stream(storage);

var GLOBAL_KEY = '';

// 
// calendar.initDaysOfWeek();

var day = date.getDay();
var month = date.getMonth();
var year = date.getYear();

calendar.generate();
stream.fillCells(date.getDays(year, month, day), month, year);
calendar.initDays(storage, day, month, year);
calendar.fillAllIdeas(month, year, storage);

var headerMonth = document.getElementsByClassName('month-title')[0];
headerMonth.innerText = date.getHeaderDate(month, year);

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

	var DAY = month == date.getMonth() ? date.getDay() : 0;

	calendar.clearDays();
	stream.fillCells(date.getDays(year, month, day), month, year);
	calendar.initDays(storage, DAY, month, year);
	headerMonth.innerText = date.getHeaderDate(month, year);
	calendar.fillAllIdeas(month, year, storage);	
});

leftBtn.addEventListener('click', function(e) {
	if (month == 0) {
		month = 11;
		--year;
	} else {
		month--;
	}

	var DAY = month == date.getMonth() ? date.getDay() : 0;

	calendar.clearDays();
	stream.fillCells(date.getDays(year, month, day), month, year);
	calendar.initDays(storage, DAY, month, year);
	headerMonth.innerText = date.getHeaderDate(month, year);
	calendar.fillAllIdeas(month, year, storage);
});

currentBtn.addEventListener('click', function(e) {
	day = date.getDay();
	month = date.getMonth();
	year = date.getYear();	

	calendar.clearDays();
	stream.fillCells(date.getDays(year, month, day), month, year);
	calendar.initDays(storage, day, month, year);
	headerMonth.innerText = date.getHeaderDate(month, year);
	calendar.fillAllIdeas(month, year, storage);
});

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
	calendar.setIdea(storage, KEY, DATA);			

	popupTop.style.display = 'none';
	addIdea.className = 'action border';
});

/* Show and hide popup left */
var popupLeft = document.getElementById('popup-left');
var closeLeft = popupLeft.getElementsByClassName('close')[0];
var deleteBtn = document.getElementById('delete-full-idea');
var createBtn = document.getElementById('create-full-idea');

closeLeft.addEventListener('click', function(e) {
	calendar.updateCell(storage, day, month, year, GLOBAL_KEY);
	popupLeft.style.display = 'none';
});

deleteBtn.addEventListener('click', function(e) {
	calendar.updateCell(storage, day, month, year, GLOBAL_KEY);
	var data = storage.read(GLOBAL_KEY);
	var json = JSON.parse(data);	
	storage.delete(json.day + '-' + json.month + '-' + json.year);
	popupLeft.style.display = 'none';
});

var inputMessage = document.getElementById('message-full');
var inputPeople = document.getElementById('people-full');
var inputDescription = document.getElementById('description-full');

// Hardcoding
function fillData(key) {
	GLOBAL_KEY = key;
	var message = document.getElementById('message-of-calendar');	
	var people = document.getElementById('people-of-calendar');	
	var description = document.getElementById('description-of-calendar');	

	message.style.display = 'none';
	inputMessage.style.display = 'block';
	people.style.display = 'none';
	inputPeople.style.display = 'block';
	description.style.display = 'none';
	inputDescription.style.display = 'block';

	var data = storage.read(key);
	var _json = JSON.parse(data);
	var dataStorage = storage.read(_json.day + '-' + _json.month + '-' + _json.year);

	var dateCalendar = document.getElementById('date-of-calendar');
	dateCalendar.innerText = _json.day + ' ' + Calendar.fastMonths[_json.month];

	if (dataStorage != null) {
		var jsonData = JSON.parse(dataStorage);
		if (jsonData.message != null) {			
			message.style.display = 'block';
			message.innerText = jsonData.message;
			inputMessage.style.display = 'none';			
		}

		if (jsonData.people != null) {
			people.style.display = 'block';
			people.innerText = jsonData.people;
			inputPeople.style.display = 'none';
		}

		if (jsonData.description != null) {
			description.style.display = 'block';
			description.innerText = jsonData.description;
			inputDescription.style.display = 'none';
		}
	}
}