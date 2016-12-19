/* global Chance, fetch, Papa, doT */

(function() {
	'use strict';
	
	let doc = document;
	
	
	
	const EXPIRATION_TIME = TD.expiry;
	const DONORS_CSV_URL = './csv/donors.csv';
	const FETCH_GET_INIT = {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Pragma': 'no-cache',
			'Cache-Control': 'no-cache',
		},
	};
	const CSV_CONFIG = {
		header: true,
	};
	
	
	
	let initTypeChance = function() {
		// Get seed
		let seed = TD.seed.get();
		// Save seed to URL hash
		TD.seed.set(seed);
		
		return new Chance(seed);
	};
	
	let donorFilter = function(_donors) {
		let candidates = [];
		
		for (let i = 0; i < _donors.length; i++) {
			if (_donors[i].type === 'ind' && _donors[i].flag === '0') {
				candidates.push(_donors[i]);
			}
		}
		
		return candidates;
	};
	
	let typeDraw = function(candidates, round) {
		let luckNum;
		let typeChance = initTypeChance();
		
		for (let i = 0; i < round; i++) {
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
	
	let initDraw = function() {
		// Filter donors to get candidates
		let candidates = donorFilter(TD.donors);
		console.log(JSON.parse(JSON.stringify(candidates)));
		
		// Get round value
		let $rndNum = doc.querySelector('#rnd-num');
		let round = $rndNum.value;
		
		// Draw
		typeDraw(candidates, round);
		console.log(TD.lucks);
		
		// Destroy round control and draw button
		destroyMachine();
		
		// Init the announcement view
		initAnnounce();
	};
	
	let destroyMachine = function() {
		let $machine = doc.querySelector('.machine');
		$machine.classList.add('is-hidden');
	};
	
	let initAnnounce = function() {
		let $announce = doc.querySelector('.announce');
		
		// Contruct the view by doT template
		let tmplText = doc.getElementById('tmpl-result').text;
		let tmplFunc = doT.template(tmplText);
		let tmpl = tmplFunc(TD.lucks);
		$announce.innerHTML = tmpl;
		
		$announce.classList.add('is-show');
	};
	
	
	
	// Fetch donor's data
	fetch(DONORS_CSV_URL, FETCH_GET_INIT).then(function(res) {
		if (res.ok) {
			return res.text();
		} else {
			let error = new Error(res.statusText);
			error.res = res;
			throw error;
		}
	}).then(function(text) {
		TD.donors = Papa.parse(text, CSV_CONFIG).data;
		console.log(JSON.parse(JSON.stringify(TD.donors)));
		
		// Init footer's ack info
		let $ackTime = doc.querySelector('.ack-time');
		let $ackNum = doc.querySelector('.ack-num');
		let $ack = doc.querySelector('.ack');
		$ackTime.textContent = EXPIRATION_TIME;
		$ackNum.textContent = TD.donors.length;
		$ack.classList.remove('is-disabled');
		
		// Init draw button
		let $drawBtn = doc.querySelector('#draw-btn');
		$drawBtn.classList.remove('is-disabled');
		$drawBtn.addEventListener('click', initDraw);
	});

})();
