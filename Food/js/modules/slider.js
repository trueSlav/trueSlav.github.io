function slider({container, slide, nextArrow, prewArrow, totalCounter, currentCounter, wrapper, field}) {

		const sliders = document.querySelectorAll(slide),
					buttonNext = document.querySelector(nextArrow),
					buttonPrew = document.querySelector(prewArrow),
					total = document.querySelector(totalCounter),
					current = document.querySelector(currentCounter),
					
					slidesWrapper = document.querySelector(wrapper),
					slidesInner = document.querySelector(field),
					width = window.getComputedStyle(slidesWrapper).width,
					
					slider = document.querySelector(container);

let slideIndex = 1;
let offset = 0;

if (sliders.length < 10) {
	total.textContent = `0${sliders.length}`;
	current.textContent = `0${slideIndex}`;
} else {
	total.textContent = sliders.length;
	current.textContent = slideIndex;
}

slidesInner.style.width = 100 * sliders.length +"%";
slidesInner.style.display = 'flex';
slidesInner.style.transition = '.5s all';

slidesWrapper.style.overflow = 'hidden';

sliders.forEach(sliders => {
	sliders.style.width = width;
});

slider.style.position = 'relative';
const indicators = document.createElement('ol'),
		dots = [];
indicators.classList.add('carousel-indicators');

indicators.style.cssText = `
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 15;
	display: flex;
	justify-content: center;
	margin-right: 15%;
	margin-left: 15%;
	list-style: none;
`;

slider.append(indicators);

for (let i = 0; i < sliders.length; i++) {
	const dot = document.createElement('li');
	dot.setAttribute('data-slide-to', i+1);

	dot.style.cssText = `
		box-sizing: content-box;
		flex: 0 1 auto;
		width: 30px;
		height: 6px;
		margin-right: 3px;
		margin-left: 3px;
		cursor: pointer;
		background-color: #fff;
		background-clip: padding-box;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		opacity: .5;
		transition: opacity .6s ease;
	`;
	indicators.append(dot);

	if(i == 0){
		dot.style.opacity = '1';
	}
	dots.push(dot);
}

buttonNext.addEventListener('click', () => {
	if (offset == +width.slice(0, width.length-2) * (sliders.length-1)) {
		offset = 0;			
	} else {
		offset += +width.slice(0, width.length-2)
	}

	slidesInner.style.transform = `translateX(-${offset}px)`;

	if (slideIndex == sliders.length) {
		slideIndex = 1;
	} else {
		slideIndex++;
	}

	if (sliders.length < 10) {
		current.textContent = `0${slideIndex}`;
	} else {
		current.textContent = slideIndex;
	}

	dots.forEach(dot => dot.style.opacity = '.5');
	dots[slideIndex-1].style.opacity = 1;
});

buttonPrew.addEventListener('click', () => {
	if (offset == 0) {
		offset = +width.slice(0, width.length-2) * (sliders.length-1);
	} else {
		offset -= +width.slice(0, width.length-2);
	}

	slidesInner.style.transform = `translateX(-${offset}px)`;

	if (slideIndex == 1) {
		slideIndex = sliders.length;
	} else {
		slideIndex--;
	}

	if (sliders.length < 10) {
		current.textContent = `0${slideIndex}`;
	} else {
		current.textContent = slideIndex;
	}
	dots.forEach(dot => dot.style.opacity = '.5');
	dots[slideIndex-1].style.opacity = 1;
});


dots.forEach(dot => {
	dot.addEventListener('click', (e) => {
		const slideTo = e.target.getAttribute('data-slide-to');

		slideIndex = slideTo;
		offset = +width.slice(0, width.length-2) * (slideTo-1);

		slidesInner.style.transform = `translateX(-${offset}px)`;

		if (sliders.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex-1].style.opacity = 1;
	});
});
}
export default slider;