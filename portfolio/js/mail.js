'use strict'

document.addEventListener('DOMContentLoaded', () => {

	const form = document.querySelector('form');

	const message = {
		load: 'icons/spinner.svg',
		success: 'Ваше сообщение успешно отправлено!',
		fail: 'Произошла ошибка. Сообщение не отправлено!',
		form: 'Заполните поля формы!'
	};

	sendForm(form);

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method : "POST",
			body: data	
		});
		if(!res.ok){
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res;
	};
	
	function sendForm(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			let error = validateForm();
			
			if(error===0){
				const messageSpinner = document.createElement('img');
				messageSpinner.src = message.load;
				messageSpinner.style.cssText = `
					display:block;
					margin: 0 auto;
				`;
				form.append(messageSpinner);

				const formData = new FormData(form);
				
				postData('mail.php', formData)
				.then((res) => {
					if(res.ok){
						showThanksModal(message.success);
					}
				})
				.catch(() => {
					showThanksModal(message.fail);
				})
				.finally(() => {
					form.reset();
					messageSpinner.remove();
				})

			} else {
				showThanksModal(message.form);
			}
		});
	}

	function validateForm() {
		let error = 0;
		const reqForm = document.querySelectorAll('._req');

		reqForm.forEach(input => {
			removeError(input);

			if (input.name === 'mail') {

				if (emailTest(input)) {
					removeError(input);
				} else {
					addError(input);
					error++;
				}
			
			}	else if(input.getAttribute('type') === 'checkbox' && input.checked === false){
					addError(input);
					error++;
			
			} else {
					if(input.value === ''){
						addError(input);
						error++;
					}
			}
		});
		return error;
	}
	function addError(input){
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function removeError(input){
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	function emailTest(input){
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(input.value).toLowerCase());
	}

	// Modal
	const modal = document.querySelector('.modal'),
				modalContent = modal.querySelector('.modal__content');
			
	function openModal() {
		modal.style.display = 'flex';
		document.body.style.overflow = 'hidden';
	}
	function closeModal() {
		modal.style.display = 'none';
		document.body.style.overflow = '';
	}

	modal.addEventListener('click', e => {
		if(e.target && e.target.classList.contains('modal__close')){
			closeModal()
		} else if(e.target === modal) {
			closeModal();
		}
	});
	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && window.getComputedStyle(modal, "display:flex")) { 
				closeModal();
		}
	});

	function showThanksModal(message) {
		openModal();
	
		modalContent.innerHTML = `
			<div class="modal__close">&times;</div>
			<h2>${message}</h2>
		`;
		
		setTimeout(() => {
			closeModal();
	}, 3000);
	}
});