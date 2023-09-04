document.addEventListener('DOMContentLoaded', (e) => {
    
    //Menu active

    const openBtn = document.querySelector('.hamburger__block'),
          closeBtn = document.querySelector('.menu__close'),
          menu = document.querySelector('.menu'),
          overlay = document.querySelector('.menu__overlay'),
          menuItem = document.querySelectorAll('.menu__item');

    openBtn.addEventListener('click', e => {
        menu.classList.add('active');
        document.body.style.overflow = "hidden";
    });

    function closeMenu(){
        menu.classList.remove('active');
        document.body.style.overflow = "";
    }

    closeBtn.addEventListener('click', closeMenu);

    menuItem.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    overlay.addEventListener('click', e => {
        if(e.target === overlay){
            closeMenu();
        }
    });

    document.addEventListener('keydown', e => {
        if(e.code === 'Escape' && menu.classList.contains('active')){
            closeMenu();
        }
    });

    //Percent-bar

    const percent = document.querySelectorAll('.skills__percent'),
          lineYellow = document.querySelectorAll('.skills__scale_yellow');

    percent.forEach((item, i) => {
        lineYellow[i].style.width = item.innerHTML;;
    });

    //Skills-menu

    const nextArr = document.querySelector('.arr'),
          prewArr = document.querySelector('.skills__all-back'),
          card = document.querySelector('.skills__wrapper-card'),
          all = document.querySelector('.skills__wrapper-all');
    
    nextArr.addEventListener('click', () => {
        card.classList.add('hide');
        all.classList.add('active');
    });

    prewArr.addEventListener('click', () => {
        card.classList.remove('hide');
        all.classList.remove('active');
    });
    
    //Slider

    const prev = document.querySelector('.promo__slider-prev'),
          next = document.querySelector('.promo__slider-next'),
          slidesWrapper = document.querySelector('.promo__slider-wrapper'),
          slidersInner = slidesWrapper.querySelector('.promo__slider-inner'),
          slides = slidesWrapper.querySelectorAll('.promo__slide'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0; //отступ

    let toggleSliderTimer = setInterval(toggleSliderNext, 5000);

    slidersInner.style.width = 100 * slides.length + '%';
    slides.forEach((slide) => {
        slide.style.width = width;
    });

    function toggleSliderNext(){
        if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)){ //'500px'
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidersInner.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        } else {
            ++slideIndex;
        }
    }

    next.addEventListener('click', () => {
        toggleSliderNext();
        clearInterval(toggleSliderTimer);
    });

    prev.addEventListener('click', () => {
        if(offset == 0){
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidersInner.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        } else {
            ++slideIndex;
        }

        clearInterval(toggleSliderTimer);
    });

		//Tabs

		const tab = document.querySelectorAll('.portfolio__tab'),
					tabWrapper = document.querySelector('.portfolio__tabs'),
					tabContent = document.querySelectorAll('.portfolio__item'), //a
					portfolioWrapper = document.querySelector('.portfolio__wrapper');

		hideTabsContent = (i) => {

			tabContent.forEach(item => {
				item.style.cssText = `
					display: none;
					grid-column: unset;
  				grid-row: unset;
					height: 280px;
				`;
			});

			tab.forEach(element => {
				element.classList.remove('tab-active');
			});

			tab[i].classList.remove('tab-active');

			// portfolioWrapper.classList.add('tab-content-hide')
		}

		showTabsContent = (attr, i) => {
			tabContent.forEach(item => {
				if(item.getAttribute('data-tab') == attr){
					item.style.display = 'block';
				}
			})

			tab[i].classList.add('tab-active');
		}

		tabWrapper.addEventListener('click', e => {
			if(e.target && e.target.classList.contains('portfolio__tab')){
				tab.forEach((element, i) => {
					if(e.target == element){
						if(e.target.getAttribute('data-tab') === 'singlepage'){
							hideTabsContent(i);
							showTabsContent('singlepage', i);
						}
						
						if(e.target.getAttribute('data-tab') === 'react'){
							hideTabsContent(i);
							showTabsContent('react', i);
							// portfolioWrapper.classList.add('tab-content-hide')
						}

						if(e.target.getAttribute('data-tab') === 'multipage'){
							hideTabsContent(i);
							showTabsContent('multipage', i);
						}
					}
				});
			}
		})
		// portfolioWrapper.classList.remove('tab-content-hide')
		
	//Animation
	
	//Поместить в пременную все элементы, которые я хочу анимировать. Задать им дежурный класс
	const animItems = document.querySelectorAll('.anim-items');

	if(animItems.length > 0){
		window.addEventListener('scroll', animScroll);

		function animScroll() {
			animItems.forEach(animItem => {
				const animItemHeight = animItem.offsetHeight, //Высота элемента
							animItemOffset = getOffset(animItem).top,
							animStart = 4;
							
				let animItemPoint = window.innerHeight - animItemHeight / animStart;

				if((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)){
					animItem.classList.add('contacts__img_anim');
				} else {
					animItem.classList.remove('contacts__img_anim');
				}
			})
		}
		
		function getOffset(el){
			const rect = el.getBoundingClientRect(),
						scrollLeft = document.documentElement.scrollLeft,
						scrollTop = document.documentElement.scrollTop;
	
			return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
		}
	}
	
	// console.log(window.innerHeight);
	// console.log(document.documentElement.offsetHeight);
	// console.log(scrollY);
	// console.log(document.documentElement.scrollTop);


});
