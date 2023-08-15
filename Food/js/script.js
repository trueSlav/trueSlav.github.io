document.addEventListener('DOMContentLoaded', (e) => {

	//Tabs

	const tabsContent = document.querySelectorAll('.tabcontent'),
		  tabsParent = document.querySelector('.tabheader__items'),
		  tabs = tabsParent.querySelectorAll('.tabheader__item');

	function hideContent(){
		tabsContent.forEach(element => {
			element.classList.remove('show', 'fade');
			element.classList.add('hide');
		});

		tabs.forEach(element => {
			element.classList.remove('tabheader__item_active');
		});
	}

	function showContent(i = 0){
		tabsContent[i].classList.remove('hide');
		tabsContent[i].classList.add('show', 'fade');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideContent();
	showContent();

	tabsParent.addEventListener('click', e => {
		const target = e.target;
		if(target && target.classList.contains('tabheader__item')){
			tabs.forEach((element, i) => {
				if(target == element){
					hideContent();
					showContent(i);
				}
			});
		}
	});

	//Timer

	const deadline = '2023-06-02';

	function getTimeRemaining(endtime){
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - new Date();
		if(t <= 0){
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor(t / (1000 * 60 * 60) % 24),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);
		}
		
		return {
			'total' : t,
			'days' : days,
			'hours' : hours,
			'minutes' : minutes,
			'seconds' : seconds
		};
	}

	function addZero(num){
		if(num < 10){
			return num = `0${num}`;
		} else {
			return num;
		}
	} 

	function setTimeOnPages(timer, endtime) {
		const timerBlock = document.querySelector(timer),
			  days = timerBlock.querySelector('#days'),
			  hours = timerBlock.querySelector('#hours'),
			  minutes = timerBlock.querySelector('#minutes'),
			  seconds = timerBlock.querySelector('#seconds'),
			  timeInterval = setInterval(setTimer, 1000);

		setTimer();
		function setTimer() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = addZero(t.days);
			hours.innerHTML = addZero(t.hours);
			minutes.innerHTML = addZero(t.minutes);
			seconds.innerHTML = addZero(t.seconds);

			if(t.total <= 0){
				clearInterval(timeInterval);
			}
		}
	}

	setTimeOnPages('.timer', deadline);

	//Modal

	const openModalBtn = document.querySelectorAll('[data-open-modal]'),
		  modal = document.querySelector('.modal');
	
	// function toggleModal(m){
	// 	m.classList.toggle('show');
	// 	document.body.style.overflow = "";
	// 	clearInterval(modalTimerId);
	// }

	function closeModal(){
		modal.classList.remove('show');
		modal.classList.add('hide');
		document.body.style.overflow = "";
	}
	closeModal();

	function openModal(){
		modal.classList.remove('hide');
		modal.classList.add('show');
		clearInterval(modalTimerId);
	}

	openModalBtn.forEach( item => {
		item.addEventListener('click', e => {
			openModal();
			document.body.style.overflow = "hidden";
		});
	});

	modal.addEventListener('click', e => {
		if(e.target === modal || e.target.getAttribute('data-modal-close') == ''){
			closeModal();
		}
	});

	document.addEventListener('keydown', e => {
		if(e.code === 'Escape' && modal.classList.contains('show')){
			closeModal();
		}
	});

	//Окно откроется через 5сек
	const modalTimerId = setTimeout(openModal, 5000);

	//Открытие окна при достижении конца страницы
	function scrollModal(){
		if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
			openModal();
			window.removeEventListener('scroll', scrollModal);
		}
	}
	window.addEventListener('scroll', scrollModal);

	//Menu use class

	class MenuItem {
		constructor(img, alt, subtitle, descr, total, ...classes){
			this.img = img;
			this.alt = alt;
			this.subtitle = subtitle;
			this.descr = descr;
			this.total = total;
			this.parent = document.querySelector('.menu__field .container');
			this.classes = classes;
			this.transfer = 80;
			this.transferToRUB();
		}

		transferToRUB(){
			this.total = this.total * this.transfer;
		}

		render(){
			const menuItem = document.createElement('div');
			if(this.classes.length === 0){
				this.element = 'menu__item';
				menuItem.classList.add(this.element);
			} else {
				this.classes.forEach(className => menuItem.classList.add(className));
			}

			menuItem.innerHTML = `				
				<img src=${this.img} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.subtitle}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.total}</span> руб/день</div>
				</div>				
			`;

			this.parent.append(menuItem);
		}
	}

	const getData = async (url) => {
		const res = await fetch(url);

		if(!res.ok){
			throw new Error(`Couid not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getData('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuItem(img, altimg, title, descr, price).render();
			});
		});

	//Send Form

	const forms = document.querySelectorAll('form');

	const message = {
		load: 'icons/spinner.svg',
		success: 'Успешно отправлено!',
		fail: 'Произошла ошибка. Данные не отправлены!'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method : "POST",
			headers : {
				'Content-type': 'application/json'
			},
			body: data	
		});

		return await res.json();
	};

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

			// const request = new XMLHttpRequest();
			// request.open('POST', 'server.php');

			//если исп. без json - удалить заголовок.
			// request.setRequestHeader('Content-type', 'application/json');
			
			const formData = new FormData(form);

			// const dataObj = {};
			// formData.forEach((value, key) => {
			// 	dataObj[key] = value;
			// });
			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			// request.send(json);
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

			// request.addEventListener('load', ()=>{
			// 	if(request.status === 200){
					
			// 		showThanksModal(message.success);
					
			// 		form.reset();
			// 		messageText.remove(); 

			// 	} else {
			// 		showThanksModal(message.fail);
			// 	}
			// });

		});
	}
	
	function showThanksModal(message){
		const prevModal = document.querySelector('.modal__dialog');

		prevModal.classList.add('hide');
		openModal();

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
			closeModal();

		}, 3000);
	}
	
	// fetch('https://jsonplaceholder.typicode.com/todos', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-type' : 'application/json'
	// 	},
	// 	body: JSON.stringify({name: 'Ilya'})
	// })
	// .then(response => response.json())
	// .then(json => console.log(json));

	// fetch('http://localhost:3000/menu')
	// .then(data => data.json())
	// .then(json => console.log(json));


	//Slider

	const sliders = document.querySelectorAll('.offer__slide'),
		  buttonNext = document.querySelector('.offer__slider-next'),
		  buttonPrew = document.querySelector('.offer__slider-prev'),
		  total = document.querySelector('#total'),
		  current = document.querySelector('#current');
	let slideIndex = 1;

	showSlide(slideIndex);

	if (sliders.length < 10) {
		total.textContent = `0${sliders.length}`;
	} else {
		total.textContent = sliders.length;
	}

	function showSlide(n){
		//Смена индекса
		if(n > sliders.length){
			slideIndex = 1;
		}

		if (n < 1) {
			slideIndex = sliders.length;
		}
		//Скрыть все слайды
		sliders.forEach(item => item.classList.add('hide'));

		sliders[slideIndex-1].classList.remove('hide');
		sliders[slideIndex-1].classList.add('show');

		if (sliders.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	function plusSlide(n) {
		showSlide(slideIndex += n);
	}

	buttonNext.addEventListener('click', () => {
		plusSlide(1);
	});

	buttonPrew.addEventListener('click', () => {
		plusSlide(-1);
	});

});