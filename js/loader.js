(function() {
	/** 
	 * Constructor. Set your panel for calendar
	 */
	Calendar.Loader.HtmlLoader = function(id) {
		this._parent = document.getElementById(id);
		this.dayOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 
		'Суббота', 'Воскресенье'];
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
			span.innerText = this.dayOfWeek[column] + ", ";
			var div = document.createElement('div');
			div.appendChild(span);
			cells[column].appendChild(div);
		}
	};

}());