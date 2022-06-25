$(document).ready(function(){

	document.querySelector('.header-top__nav-icons-wrapper').addEventListener('click', function(){
		document.querySelector('.mobile-nav__icons').classList.toggle('mobile-nav__icons--active');
		document.querySelector('.mobile-nav').classList.toggle('mobile-nav--active');
		document.querySelector('#overlay').classList.toggle('active');
	
	})

    const formItems = document.querySelectorAll('.form-item__field');

    for(let item of formItems){
        const thisParent = item.closest('.form-item');
        const thisPlaceholder = thisParent.querySelector('.form-item__placeholder');

        item.addEventListener('focus', function(){
            thisPlaceholder.classList.add('active');
        });

        item.addEventListener('blur', function(){
            if(item.value.length > 0){
                thisPlaceholder.classList.add('active');
            }
            else{
                thisPlaceholder.classList.remove('active');
            }
        })


    }
	

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