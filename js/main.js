$(document).ready(function(){
	//Mobile Nav
	let mobileNavButton = document.querySelector('.header-top__nav-icons-wrapper');
	let mobileNavicons = document.querySelector('.header-top__nav-icons');
	let mobileNav = document.querySelector('.mobile-nav');
	let overlay = document.querySelector('#overlay');


	mobileNavButton.addEventListener('click', function(){
		mobileNavButton.classList.toggle('header-top__nav-icons-wrapper--active');
		mobileNavicons.classList.toggle('header-top__nav-icons--active');
		mobileNav.classList.toggle('mobile-nav--active');
		overlay.classList.toggle('active');
	
	})

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