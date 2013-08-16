/**
 * Модуль работы с календарем во View
 */

(function() {
	
	Calendar.Loader.HtmlLoader = function(id) {
		this._parent = document.getElementById(id);
		this.cash_cells = [];
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

				tr.appendChild(td);	
			}

			this._parent.appendChild(tr);
		}		
	};

	Calendar.Loader.HtmlLoader.prototype.initDaysOfWeek = function() {
		var cells = this._parent.rows[0].cells;

		for (var column = 0; column < cells.length; column++) {
			var span = document.createElement('span');
			span.innerText = Calendar.dayOfWeek[column] + ",";
			var div = document.createElement('div');
			div.appendChild(span);
			cells[column].appendChild(div);
		}
	};

	Calendar.Loader.HtmlLoader.prototype.fillDays = function(array, day) {
		this.cash_cells = [];

		for (var rows = 0; rows < 5; rows++) {
			for (var columns = 0; columns < 7; columns++) {
				var cash_item = {};				

				var el = this._parent.rows[rows].cells[columns];
				var value = array.shift();

				cash_item['element'] = el;
				cash_item['value'] = value;

				if (rows == 0) {					
					var span = el.getElementsByTagName('span')[0];
					span.innerText = span.innerText + " " + value;

					if (value < 8 && value == day) {
						el.className = el.className + ' current-date';
					} 
				} else {
					var span = document.createElement('span');
					span.innerText = value;
					var div = document.createElement('div');
					div.appendChild(span);
					el.appendChild(div);

					if (value == day) {
						el.className = el.className + ' current-date';	
					}
				}

				this.cash_cells.push(cash_item);
			}
		}		
	};

	Calendar.Loader.HtmlLoader.prototype.clearDays = function() {
		for (var rows = 0; rows < 5; rows++) {
			for (var columns = 0; columns < 7; columns++) {
				var el = this._parent.rows[rows].cells[columns];
				el.innerText = '';
				el.className = 'item';
					
			}
		}
	};

	Calendar.Loader.HtmlLoader.prototype.setIdea = function(key, data) {
		var dateKey = key.split('-');
		var d = parseInt(dateKey[0]);
		var m = parseInt(dateKey[1]);

		if (m != new Date().getMonth()) return;

		var start_index = 0;

		// Find need cell start
		for (var item in this.cash_cells) {
			var cell = this.cash_cells[item];
			if (item == 0 && cell.value > 1) {
				continue;
			}

			if (cell.value == 1) {
				start_index = item;
				break;
			}
		}		

		for (var i = start_index; i < this.cash_cells.length; i++) {
			var cell = this.cash_cells[i];
			if (cell.value == d) {
				var div = document.createElement('div');
				var header = document.createElement('strong');
				header.innerText = data.message;
				div.appendChild(header);
				cell.element.appendChild(div);
				cell.element.className = cell.element.className + ' idea';
				break;
			}
		}
	};

	Calendar.Loader.HtmlLoader.prototype.fillAllIdeas = function(month, year, storage) {
		var days = new Date(year, month, 0).getDate();
		
		var start_index = 0;

		// Find need cell start
		for (var item in this.cash_cells) {
			var cell = this.cash_cells[item];
			if (item == 0 && cell.value > 1) {
				continue;
			}

			if (cell.value == 1) {
				start_index = item;
				break;
			}
		}	

		var current_day = 1;
		for (var i = start_index; i < this.cash_cells.length; i++) {
			if (current_day == days) break;
			
			var cell = this.cash_cells[i];
			var dataStorage = storage.read(current_day + '-' + month + '-' + year);
			if (dataStorage != null) {
				var data = JSON.parse(dataStorage);

				var div = document.createElement('div');
				
				var header = document.createElement('strong');
				header.innerText = data.message;
				div.appendChild(header);

				var p1 = document.createElement('p');
				p1.innerText = data.people;
				div.appendChild(p1);

				var p2 = document.createElement('p');
				p2.innerText = data.description;
				div.appendChild(p2);

				cell.element.appendChild(div);
				cell.element.className = cell.element.className + ' idea';
			}

			current_day++;
		}		
	};

}());