/**
 * Модуль работы с календарем во View
 */

(function() {
	
	Calendar.Loader.HtmlLoader = function(id) {
		this._parent = document.getElementById(id);
	};

	/**
	 * Append your elements on panel
	 */
	Calendar.Loader.HtmlLoader.prototype.generate = function() {
		var rows = 0;
		var columns = 0;

		for (rows = 0; rows < 5; rows++) {
			var tr = document.createElement('tr')

			for (columns = 0; columns < 7; columns++) {
				var td = document.createElement('td');
				td.setAttribute('id', rows + '-' + columns);
				td.className = 'item';

				td.addEventListener('mouseover', function(e) {
					var span = this.getElementsByTagName('span');
					if (span[0]) {			
						span[0].className = 'checked';							
					}
				});

				td.addEventListener('mouseout', function(e) {
					var span = this.getElementsByTagName('span');
					if (span[0]) {			
						span[0].removeAttribute('class');							
					}						
				});

				td.addEventListener('click', function(e) {
					var rect = this.getBoundingClientRect();
					var popup = document.getElementById('popup-left');
					popup.style.top = parseInt(rect.top) + "px";
					popup.style.left = parseInt(rect.right + 10) + "px";
					popup.style.display = 'block';
					this.className = this.className + " idea";

					fillData(this.getAttribute('id'));
				});

				tr.appendChild(td);	
			}

			this._parent.appendChild(tr);
		}		
	};

	Calendar.Loader.HtmlLoader.prototype.initDays = function(storage, day, month, year) {
		for (var i = 0; i < this._parent.rows.length; i++) {
			for (var j = 0; j < this._parent.rows[i].cells.length; j++) {
				var data = storage.read(i + '-' + j);
				if (data == null) continue;

				var jsonData = JSON.parse(data);
				var cell = this._parent.rows[i].cells[j];

				var span = document.createElement('span');
				span.innerText = jsonData.week != null ? 
								 jsonData.week + ', ' + jsonData.day : 
								 jsonData.day;
				var div = document.createElement('div');
				div.appendChild(span);

				if (jsonData.month == month && jsonData.year == year && jsonData.day == day)
					cell.className = cell.className + ' current-date';
				cell.appendChild(div);
			}
		}
	}

	Calendar.Loader.HtmlLoader.prototype.updateCell = function(storage, day, month, year, key) {
		var data = storage.read(GLOBAL_KEY);
		if (data == null) return;

		var jsonData = JSON.parse(data);

		var table = GLOBAL_KEY.split('-');
		var row = parseInt(table[0]);
		var column = parseInt(table[1]);

		var cell = this._parent.rows[row].cells[column];
		cell.innerText = '';
		cell.className = 'item';

		var span = document.createElement('span');
		span.innerText = jsonData.week != null ? 
						 jsonData.week + ', ' + jsonData.day : 
						 jsonData.day;
		var div = document.createElement('div');
		div.appendChild(span);

		if (jsonData.month == month && jsonData.year == year && jsonData.day == day)
			cell.className = cell.className + ' current-date';

		cell.appendChild(div);

		var dataStorage = storage.read(jsonData.day + '-' + jsonData.month + '-' + jsonData.year);
		if (dataStorage == null) return;

		cell.className = cell.className + ' idea';

		var json = JSON.parse(dataStorage);

		div = document.createElement('div');
				
		var header = document.createElement('strong');
		header.innerText = json.message;
		div.appendChild(header);

		if (json.people != null) {
			var p1 = document.createElement('p');
			p1.innerText = json.people;
			div.appendChild(p1);
		}

		if (json.description != null) {
			var p2 = document.createElement('p');
			p2.innerText = json.description;
			div.appendChild(p2);		
		}

		cell.appendChild(div);
	}
	
	Calendar.Loader.HtmlLoader.prototype.clearDays = function() {
		for (var rows = 0; rows < 5; rows++) {
			for (var columns = 0; columns < 7; columns++) {
				var el = this._parent.rows[rows].cells[columns];
				el.innerText = '';
				el.className = 'item';					
			}
		}
	};

	Calendar.Loader.HtmlLoader.prototype.setIdea = function(storage, key, data) {
		var dateKey = key.split('-');
		var d = parseInt(dateKey[0]);
		var m = parseInt(dateKey[1]);
		if (m != new Date().getMonth()) return;

		for (var i = 0; i < this._parent.rows.length; i++) {
			for (var j = 0; j < this._parent.rows[i].cells.length; j++) {
				var _data = storage.read(i + '-' + j);
				if (_data == null) continue;

				var jsonData = JSON.parse(_data);
				if (m != jsonData.month) continue;

				if (jsonData.day == d) {
					var cell = this._parent.rows[i].cells[j];
					var div = document.createElement('div');
					var header = document.createElement('strong');
					header.innerText = data.message;
					div.appendChild(header);
					cell.appendChild(div);
					cell.className = cell.className + ' idea';
					break;
				}
			}
		}	
	};

	Calendar.Loader.HtmlLoader.prototype.fillAllIdeas = function(month, year, storage) {
		for (var i = 0; i < this._parent.rows.length; i++) {
			for (var j = 0; j < this._parent.rows[i].cells.length; j++) {
				var data = storage.read(i + '-' + j);
				if (data == null) continue;

				var jsonData = JSON.parse(data);
				var dataStorage = storage.read(jsonData.day + '-' + jsonData.month + '-' + jsonData.year);
				if (dataStorage == null) continue;

				var cell = this._parent.rows[i].cells[j];
				var json = JSON.parse(dataStorage);

				var div = document.createElement('div');
				
				var header = document.createElement('strong');
				header.innerText = json.message;
				div.appendChild(header);

				var p1 = document.createElement('p');
				p1.innerText = json.people;
				div.appendChild(p1);

				var p2 = document.createElement('p');
				p2.innerText = json.description;
				div.appendChild(p2);

				cell.appendChild(div);
				cell.className = cell.className + ' idea';
			}
		}	
	};

	Calendar.Loader.Stream = function(storage) {
		this.storage = storage;
	};

	Calendar.Loader.Stream.prototype.fillCells = function(array, month, year) {
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 7; j++) {
				var value = array.shift();
				var data = {
					'day': value,
					'month': month, 
					'year': year,
					'week': null	
				};
				
				if (i == 0) {
					if (value > 7) {
						if (month == 0) {
							data['month'] = 11;
							data['year'] = year - 1;
						} else {
							data['month'] = month - 1;	
						}
					}	

					data['week'] = Calendar.dayOfWeek[j];				
				} else if (i == 4 && value < 10) {
					if (month == 11) {
						data['month'] = 0;
						data['year'] = year + 1;
					} else {
						data['month'] = month + 1;
					}
				} else {
					data['month'] = month;
					data['year'] = year;
				}

				this.storage.write(i + '-' + j, JSON.stringify(data));
			}
		}
	}

}());