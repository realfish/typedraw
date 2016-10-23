(function() {
	'use strict';
	
	var doc = document;
	
	var $rndNum = doc.querySelector('#rnd-num');
	var $rndDec = doc.querySelector('#rnd-dec');
	var $rndInc = doc.querySelector('#rnd-inc');
	
	var roundDecrement = function() {
		var round = $rndNum.value;
		
		if (round <= 1) {
			$rndDec.classList.add('is-disabled');
			return;
		}
		
		round--;
		$rndNum.value = round;
		$rndDec.classList.remove('is-disabled');
		
		if (round <= 1) {
			$rndDec.classList.add('is-disabled');
		}
	};
	
	var roundIncrement = function() {
		var round = $rndNum.value;
		round++;
		$rndNum.value = round;
		
		if (round > 1) {
			$rndDec.classList.remove('is-disabled');
		}
	};
	
	$rndDec.addEventListener('click', roundDecrement);
	$rndInc.addEventListener('click', roundIncrement);	

})();
