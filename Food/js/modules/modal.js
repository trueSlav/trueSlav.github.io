function closeModal(modalSelector){
	const modal = document.querySelector(modalSelector);
	
	modal.classList.remove('show');
	modal.classList.add('hide');
	document.body.style.overflow = "";
}

function openModal(modalSelector, modalTimerId){
	const modal = document.querySelector(modalSelector);
	
	modal.classList.remove('hide');
	modal.classList.add('show');
	
	if(modalTimerId){
		clearInterval(modalTimerId);
	}
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	const openModalBtn = document.querySelectorAll(triggerSelector),
		  	modal = document.querySelector(modalSelector);

	closeModal(modalSelector);

	openModalBtn.forEach( item => {
		item.addEventListener('click', e => {
			openModal(modalSelector, modalTimerId);
			document.body.style.overflow = "hidden";
		});
	});

	modal.addEventListener('click', e => {
		if(e.target === modal || e.target.getAttribute('data-modal-close') == ''){
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', e => {
		if(e.code === 'Escape' && modal.classList.contains('show')){
			closeModal(modalSelector);
		}
	});

	function scrollModal(){
		if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', scrollModal);
		}
	}
	window.addEventListener('scroll', scrollModal);
}

export default modal;
export {openModal, closeModal};