$(document).ready(function(){
	//Mobile Nav
	let mobileNavButton = document.querySelector('.header-top__nav-icons-wrapper');
	let mobileNavicons = document.querySelector('.header-top__nav-icons');
	let mobileNav = document.querySelector('.mobile-nav');
	let overlay = document.querySelector('#overlay');
	//Contacts Form
	const formItems = document.querySelectorAll('.form-item__field');

	//Изменение положения плейсхолдеров
	for(let item of formItems){
		const thisParent = item.closest('.form-item');
		const thisPlaceholder = thisParent.querySelector('.form-item__placeholder');
		//Если инпут в фокусе
		item.addEventListener('focus', function(){
			thisPlaceholder.classList.add('active');
			thisParent.classList.add('red-line');
		});

		//Если инпут теряет фокус
		item.addEventListener('blur', function(){
			if(item.value.length > 0){
				thisPlaceholder.classList.add('active');
				thisParent.classList.add('red-line');
			}
			else{
				thisPlaceholder.classList.remove('active');
				thisParent.classList.remove('red-line');
			}
		});
	}


	// Включение мобильной навигации
	mobileNavButton.addEventListener('click', function(){
		this.classList.toggle('header-top__nav-icons-wrapper--active');
		mobileNavicons.classList.toggle('header-top__nav-icons--active');
		mobileNav.classList.toggle('mobile-nav--active');
		overlay.classList.toggle('active');
		document.body.classList.toggle('no-scroll');
	})
	// Выключение мобильной навигации при ресайзе 
	window.addEventListener('resize', function(){
		mobileNavButton.classList.remove('header-top__nav-icons-wrapper--active');
		mobileNavicons.classList.remove('header-top__nav-icons--active');
		mobileNav.classList.remove('mobile-nav--active');
		overlay.classList.remove('active');
		document.body.classList.remove('no-scroll');
	})


	// Клик по оверлею вокруг навигации
	overlay.addEventListener('click', function () {
		 turnOffMobileNav();
	});

	// Закрываем моб навигацию при клике на ссылки внутрии нее
	mobileNav.querySelectorAll('a').forEach(function (link) {
		link.addEventListener('click', function () {
			turnOffMobileNav();
		});
	});
	
	// Функция выключения мобильной навигации
	function turnOffMobileNav() {
		// Выключаем иконку
		if (mobileNavicons.classList.contains('header-top__nav-icons--active')) {
			mobileNavicons.classList.remove('header-top__nav-icons--active');
		}

		// Выключаем оверлей
		if (overlay.classList.contains('active')) {
			overlay.classList.remove('active');
		}

		// Выключаем панель с меню
		if (mobileNav.classList.contains('mobile-nav--active')) {
			mobileNav.classList.remove('mobile-nav--active');
		}

		// Выключаем замок на скролл для всей страницы
		if (document.body.classList.contains('no-scroll')) {
			document.body.classList.remove('no-scroll');
		}}
    
		//FORM VALIDATE
	$('.contacts-form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите email',
				email: 'отсутсвует символ @'
			},
			
			message: {
				required: 'Поле не должно быть пустым'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}

	});

	//*************************************************** */
	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $(".contacts-form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".contacts-form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}

	// plagin pageNav
	$('#header-menu').onePageNav({
		currentClass: 'active',
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'swing',
	});
});
