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
	}

	Calendar.Storage.Stream.prototype.write = function(key, data) {
		try {
			this.storage.setItem(key, data);
		} catch(e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				console.log('Memory not empty');
			}
		}
	}

	Calendar.Storage.Stream.prototype.read = function(key) {
		return this.storage.getItem(key);
	}

}());