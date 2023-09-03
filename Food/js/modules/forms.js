import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
	const forms = document.querySelectorAll(formSelector);
	const message = {
		load: 'icons/spinner.svg',
		success: 'Успешно отправлено!',
		fail: 'Произошла ошибка. Данные не отправлены!'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	function bindPostData(form){

		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const messageText = document.createElement('img');
			messageText.src = message.load;
			messageText.style.cssText = `
				display:block;
				margin: 0 auto;
			`;
			form.append(messageText);

			const formData = new FormData(form);
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
				messageText.remove();
			})
			.catch(()=>{
				showThanksModal(message.fail);
				console.log(data);
			})
			.finally(()=>{
				form.reset();
			});
		});
	}
	
	function showThanksModal(message){
		const modal = document.querySelector('.modal');
		const prevModal = document.querySelector('.modal__dialog');

		prevModal.classList.add('hide');
		openModal('.modal', modalTimerId);

		const newModal = document.createElement('div');

		newModal.classList.add('modal__dialog');
		newModal.innerHTML = `
			<div class="modal__content">
				<div data-modal-close class="modal__close">×</div>
				<div class="modal__title">${message}</div>
			</div>
		`;
		modal.append(newModal);

		setTimeout(() => {
			newModal.remove();
			prevModal.classList.add('show');
			prevModal.classList.remove('hide');
			closeModal('.modal');

		}, 3000);
	}
}
export default forms;