$(document).ready(function(){
		$('.slider__inner').slick(
				{
						speed: 1200,
						slidesToShow: 1,
						prevArrow: '<button type="button" class="slick-prev"><img src="images/icons/chevron-left-solid.png"></button>',
						nextArrow: '<button type="button" class="slick-next"><img src="images/icons/chevron-right-solid.png"></button>',
						responsive: [
								{
									breakpoint: 1024,
									settings: {
										slidesToShow: 1,
										slidesToScroll: 1,
										infinite: true,
										arrows: false,
										mobileFirst: true
									}
								},
								{
									breakpoint: 600,
									settings: {
										slidesToShow: 1,
										slidesToScroll: 1,
										autoplay:true,
										swipeToSlide: true,
										arrows: false,
										mobileFirst: true
									}
								},
								{
									breakpoint: 480,
									settings: {
										slidesToShow: 1,
										slidesToScroll: 1,
										autoplay:true,
										swipeToSlide: true,
										arrows: false,
										mobileFirst: true
									}
								}
						]
				}
		);

		$('ul.catalog__tabs').on('click', 'li:not(.catalog_active)', function() {
				$(this)
					.addClass('catalog_active').siblings().removeClass('catalog_active')
					.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
		});

		function toggleSlide(item){
				$(item).each(function(i) {
						$(this).on('click', function(e){
								e.preventDefault();
								$('.catalog-card__content').eq(i).toggleClass('catalog-card__content_active');
								$('.catalog-card__information').eq(i).toggleClass('catalog-card__information_active');
						});
				}); 
		}
		toggleSlide('a.catalog-card__link');
		toggleSlide('a.catalog-card__back');

// Modalьное окно

		$('[data-modal=consultation]').on('click', function(){
			$('.overlay, #consultation').fadeIn();
		});

		$('.modal__close').on('click', function(){
			$('.overlay, #consultation, #order, #sucsess').fadeOut();
		});

		$('.button_card').each(function(i){
			$(this).on('click', function(){
				$('#order .modal__subtitle').text($('.catalog-card__subtitle').eq(i).text());
				$('.overlay, #order').fadeIn();
			});
		});

// Валидация формы

		function valideForms(form){
			$(form).validate({
				rules: {
					name: "required",
					phone: "required",
					email: {
						required: true,
						email: true
					}
				},
				messages: {
					name: "Введите Ваше имя",
					phone: "Введите Ваш номер телефона",
					email: {
						required: "Введите Вашу почту",
						email: "Не правильно введен почтовый адрес!"
					}
				}
			});
		}
		valideForms('#main-form');
		valideForms('#consultation form');
		valideForms('#order-form');

// Маска ввода данных номера

		$('input[name=phone]').mask("+7 (999) 999-99-99");

// Скрипт отправки данных из формы на почту

		$('form').submit(function(e) {
			e.preventDefault();
			if(!$(this).valid()){
				return;
			}
			$.ajax({
				type: "POST",	
				url: "mailer/smart.php",
				data: $(this).serialize()
			}).done(function(){
				$(this).find("input").val("");
				$("#consultation, #order").fadeOut();
				$('.overlay, #sucsess').fadeIn('slow');
				$("form").trigger("reset");
			});
			return false;
		});

// Плавный скролл вверх с какого-то кол-во пикселей

		$(window).scroll(function(){
			if($(this).scrollTop() > 1200){
				$('a.pageup').fadeIn('slow');
			} else{
				$('a.pageup').fadeOut('slow');
			}
		});

		$("a").on('click', function(event) {
			if (this.hash !== "") {
			  event.preventDefault();
			  const hash = this.hash;
	
			  $('html, body').animate({
				scrollTop: $(hash).offset().top
			  }, 800, function(){
				window.location.hash = hash;
			  });
			}
		  });

		new WOW().init();
});