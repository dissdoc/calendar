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
		for (var rows = 0; rows < 5; rows++) {
			for (var columns = 0; columns < 7; columns++) {
				var el = this._parent.rows[rows].cells[columns];
				var value = array.shift(); 				
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

}());