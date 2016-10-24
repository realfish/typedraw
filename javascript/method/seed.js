(function() {
	'use strict';
	
	TD.seed = {
		get: function() {
			var hash = window.location.hash.substring(1);
			
			if (hash) {
				// URL with hash, return the hash fragment as seed
				return hash;
			} else {
				// URL without hash, return system time as seed
				return Date.now().toString();
			}
		},
		
		set: function(seed) {
			window.location.hash = seed;
		}
	};
})();
