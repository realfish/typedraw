/* global Chance, fetch, Papa, doT */

(function() {
	'use strict';
	
	var doc = document;
	
	
	
	var EXPIRATION_TIME = '24 October 2016 00:00 UTC+8';
	var DONORS_CSV_URL = 'csv/donors.csv';
	var FETCH_GET_INIT = {
		method: 'GET',
		mode: 'cors',
	};
	var CSV_CONFIG = {
		header: true,
	};
	
	
	
	var initTypeChance = function() {
		// Get seed
		var seed = TD.seed.get();
		// Save seed to URL hash
		TD.seed.set(seed);
		
		return new Chance(seed);
	};
	
	var donorFilter = function(_donors) {
		var candidates = [];
		
		for (var i = 0; i < _donors.length; i++) {
			if (_donors[i].type === 'ind' && _donors[i].flag === '0') {
				candidates.push(_donors[i]);
			}
		}
		
		return candidates;
	};
	
	var typeDraw = function(candidates, round) {
		var luckNum;
		var typeChance = initTypeChance();
		
		for (var i = 0; i < round; i++) {
			// Draw a lucky donor
			luckNum = typeChance.integer({
				min: 0,
				max: candidates.length - (1 + i),
			});
			console.log(luckNum);
			console.log(JSON.parse(JSON.stringify(candidates)));
			console.log('The lucky donor: ' + candidates[luckNum].id + ' via ' + candidates[luckNum].channel);
			TD.lucks.push(candidates[luckNum]);
			
			// Omit the drawed donor
			candidates.splice(luckNum, 1);
		}
	};
	
	var initDraw = function() {
		// Filter donors to get candidates
		var candidates = donorFilter(TD.donors);
		console.log(JSON.parse(JSON.stringify(candidates)));
		
		// Get round value
		var $rndNum = doc.querySelector('#rnd-num');
		var round = $rndNum.value;
		
		// Draw
		typeDraw(candidates, round);
		console.log(TD.lucks);
		
		// Destroy round control and draw button
		destroyMachine();
		
		// Init the announcement view
		initAnnounce();
	};
	
	var destroyMachine = function() {
		var $machine = doc.querySelector('.machine');
		$machine.classList.add('is-hidden');
	};
	
	var initAnnounce = function() {
		var $announce = doc.querySelector('.announce');
		
		// Contruct the view by doT template
		var tmplText = doc.getElementById('tmpl-result').text;
		var tmplFunc = doT.template(tmplText);
		var tmpl = tmplFunc(TD.lucks);
		$announce.innerHTML = tmpl;
		
		$announce.classList.add('is-show');
	};
	
	
	
	// Fetch donor's data
	fetch(DONORS_CSV_URL, FETCH_GET_INIT).then(function(res) {
		if (res.ok) {
			return res.text();
		} else {
			var error = new Error(res.statusText);
			error.res = res;
			throw error;
		}
	}).then(function(text) {
		TD.donors = Papa.parse(text, CSV_CONFIG).data;
		console.log(JSON.parse(JSON.stringify(TD.donors)));
		
		// Init footer's ack info
		var $ackTime = doc.querySelector('.ack-time');
		var $ackNum = doc.querySelector('.ack-num');
		var $ack = doc.querySelector('.ack');
		$ackTime.textContent = EXPIRATION_TIME;
		$ackNum.textContent = TD.donors.length;
		$ack.classList.remove('is-disabled');
		
		// Init draw button
		var $drawBtn = doc.querySelector('#draw-btn');
		$drawBtn.classList.remove('is-disabled');
		$drawBtn.addEventListener('click', initDraw);
	});

})();
