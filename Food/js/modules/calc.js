function calc() {
	//Calculator

	const result = document.querySelector('.calculating__result span');
	let sex = 'female', height, weight, age, ratio = 1.375; //Данные из формы

	function calcTotal() { //Функция расчета 
		if (!sex || !height || !weight || !age || !ratio) { //Проверка на заполняемость
			result.textContent = '____';
			return;
		}
		
		if(sex === 'femail'){
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}
	calcTotal();

	function getStaticInformation(parent, activeClass) { //Получение данных их дивов
		const elements = document.querySelectorAll(`${parent} div`); 

		elements.forEach(elem => {
			elem.addEventListener('click', e => {
				if(e.target.getAttribute('data-ratio')){
					ratio = +e.target.getAttribute('data-ratio');
				} else {
					sex = e.target.getAttribute('id');
				}
		
				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});
				e.target.classList.add(activeClass);
	
				calcTotal();
			});
		});

	}
	getStaticInformation('#gender', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

	function getDynamicInformation(selector){
		const input = document.querySelector(selector);
		input.addEventListener('input', () => {

			switch (input.getAttribute('id')) {
				case "height":
					height = +input.value;
					break;
				
				case "weight":
					weight = +input.value;
					break;

				case "age":
					age = +input.value;
					break;
			}
			
			calcTotal();
		});

	}
	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
}

export default calc;