(function() {
	'use strict';
	
	var doc = document;
	
	
	
	var $modal = doc.querySelector('.modal');
	
	var initModal = function(modalWrapClassName, modalTmplId, modalTmplData, modalCloseId) {
		var $modalWrap = doc.getElementsByClassName(modalWrapClassName)[0];
		
		// Get modal template
		var tmplModalText = doc.getElementById(modalTmplId).text;
		var tmplModalFunc = doT.template(tmplModalText);
		var tmplModal = tmplModalFunc(modalTmplData);
		
		// Update modal HTML
		$modalWrap.innerHTML = tmplModal;
		// Open modal
		setTimeout(openModal, 50);
		
		// Bind `modal.close` event via the modal wrap delegate
		$modal.addEventListener('click', function(e) {
			var $target = e.target;
			
			// Travel up until get a Close-Modal button or the modal wrap
			while ($target && !$target.matches('#' + modalCloseId + ',' + '.' + modalWrapClassName)) {
				$target = $target.parentNode;
			}
			// Check if the click.target is a Close-Modal button
			if ($target && $target.matches('#' + modalCloseId)) {
				closeModal();
			}
		});
	};
	
	var openModal = function() {
		$modal.classList.add('is-active');
	};
		
	var closeModal = function() {
		$modal.classList.remove('is-active');
	};
	
	
	
	var $actionDonors = doc.getElementById('action-donors');
	
	
	
	var loadDonors = function() {
		
		initModal('modal-main', 'tmpl-donors', TD.donors, 'modal-close');
		
	};
	
	$actionDonors.addEventListener('click', loadDonors);

})();
