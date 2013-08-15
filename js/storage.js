/**
 * Модулья для работы с хранилищем
 */
(function() {

	Calendar.Storage.Stream = function() {
		this.storage = false;

		try {
			this.storage = 'localStorage' in window && window['localStorage'] !== null;
		} catch(e) {
			this.storage = false;
		}	
	};

	Calendar.Storage.Stream.prototype.write = function(key, data) {
		if (!this.storage) return;

		try {
			localStorage.setItem(key, data);
		} catch(e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				console.log('Memory not empty');
			}
		}
	};

	Calendar.Storage.Stream.prototype.read = function(key) {
		if (!this.storage) return null;

		return localStorage.getItem(key);
	};

	Calendar.Storage.Stream.prototype.delete = function(key) {
		if (!this.storage) return;

		localStorage.removeItem(key);
	};

	Calendar.Storage.Stream.prototype.removeAll = function() {
		if (!this.storage) return;

		localStorage.clear();
	};

}());