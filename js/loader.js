(function() {
	/** 
	 * Constructor. Set your panel for calendar
	 */
	Calendar.Loader.HtmlLoader = function(id) {
		this._parent = document.getElementById(id);
	}

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
				tr.appendChild(td);	
			}

			this._parent.appendChild(tr);
		}		
	}

}());