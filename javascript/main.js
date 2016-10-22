/* global Chance, fetch, Papa */

(function() {
	'use strict';
	
	var doc = document;
	
	var DONATORS_CSV_URL = 'csv/donators.csv';
	var FETCH_GET_INIT = {
		method: 'GET',
		mode: 'cors',
	};
	var CSV_CONFIG = {
		header: true,
	};
	
	var typeChance = new Chance(Date.now());
	
	fetch(DONATORS_CSV_URL, FETCH_GET_INIT).then(function(res) {
		if (res.ok) {
			return res.text();
		} else {
			var error = new Error(res.statusText);
			error.res = res;
			throw error;
		}
	}).then(function(text) {
		var donators = Papa.parse(text, CSV_CONFIG);
		console.debug(donators);
		
		var luck = typeChance.integer({
			min: 0,
			max: donators.data.length - 1,
		});
		console.log('The lucky one: ' + donators.data[luck].id);
		
		var $main = doc.querySelector('main');
		$main.innerHTML = '<p class="result">' + donators.data[luck].id + '</p>';
	});

})();
