import	calc from './modules/calc';
import	cards from './modules/cards';
import	forms from './modules/forms';
import	modal from './modules/modal';
import	slider from './modules/slider';
import	tabs from './modules/tabs';
import	timer from './modules/timer';
import { openModal } from './modules/modal';

document.addEventListener('DOMContentLoaded', (e) => {
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000);

	calc();
	cards();
	forms('form', modalTimerId);
	modal('[data-open-modal]', '.modal', modalTimerId);
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prewArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
	tabs('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
	timer('.timer', '2023-09-01');

});