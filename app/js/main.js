"use strict";

$('.slider').slick ({
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    responsive: [
        {
            breakpoint: 950,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

$('.discounts-slider').slick ({
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    responsive: [
        {
            breakpoint: 950,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },

    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },

    IOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },

    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },

    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.IOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};

if (isMobile.any()) {
    document.body.classList.add('_mobile');
} else {
    document.body.classList.add('_pc');
}

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto))  { //проверка на существование объекта на который сcылаемся
            const gotoBlock = document.querySelector(menuLink.dataset.goto); //получаем объект на который ссылаемся
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

            if(iconMenu.classList.contains('menu__icon--active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove("menu__icon--active");
                headerBurger.classList.remove("header__burger--active");
            }
            window.scrollTo ({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

const links = document.getElementsByTagName('a');
for (let link of links) {
    link.addEventListener ("click", function(){
        link.blur();
    });
}

const buttons = document.getElementsByTagName('button');
for (let button of buttons) {
    button.addEventListener ("click", function(){
        button.blur();
    });
}

const checkboxs = document.getElementsByClassName("form__checkbox");
for (let checkbox of checkboxs) {
    checkbox.addEventListener ("click", function(){
        checkbox.blur();
    });
}

const labels = document.getElementsByClassName("popup__label");
for (let label of labels) {
    label.addEventListener ("click", function(){
        label.blur();
    });
}


let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
let popup = document.querySelector('.popup'); // Само окно
let openPopupButtons = document.querySelectorAll('.call-back__btn'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.close-btn'); // Кнопка для скрытия окна
let popupBtn = document.querySelector('.popup__btn'); // Кнопка для скрытия окна
const formInput = document.querySelector('.popup__input');
const formCheckbox = document.querySelector('.popup__checkbox');

let scrollbarWidth = (window.innerWidth - document.documentElement.clientWidth - 0.5) + "px";

function openForm (buttons, formBG, form) {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            formBG.classList.add('active');
            form.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = scrollbarWidth;
            form.tabIndex = 0;
            form.focus();
        });
    });
}

function closeForm (formBG, form) {
    formBG.classList.remove('active');
    form.classList.remove('active');
    document.body.style.overflowY = 'scroll';
    document.body.style.paddingRight = 0;
}

function closeFormClickBG (formBG, form, Body) {
    document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
        if(e.target === Body) {
            closeForm(formBG, form);
            form.reset();
        }
    });
}

function closeFormClickBtn(formBG, form) {
    CloseBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            closeForm(formBG, form);
            form.reset();
        });
    });
}

function submitFormBtn (formBG, form) {
    form.addEventListener('submit', () => {
        let formValidation = true;
        const formElements = form.querySelectorAll('*');
        formElements.forEach((element) => {
            if (element.classList.contains('form__input') && element.getAttribute("required") != null && element.value == '') {
                formValidation = false;
            }
            if (element.classList.contains('form__checkbox') && element.getAttribute("required") != null && !element.checked) {
                formValidation = false;
            }
            if (element.classList.contains('form__textarea') && element.getAttribute("required") != null && element.value == '') {
                formValidation = false;
            }
        });
        if (formValidation) {
            clearForm(form, formBG);
        }
    });
}

function clearForm(form, formBG) {
    closeForm(formBG, form);
    setTimeout(() => {  form.reset(); }, 2000);
}


function Form (openBtns, formBG, form, body) {
    openForm(openBtns, formBG, form);
    closeFormClickBG(formBG, form, body);
    closeFormClickBtn(formBG, form);
    submitFormBtn(formBG, form);
}

//закрывающие кнопки формы
const CloseBtns = document.querySelectorAll('.close-btn');



const CallBackOpenBtns = document.querySelectorAll('.call-back__btn');
const CallBackFormBG = document.querySelector('.call-back__bg');
const CallBackForm = document.querySelector('.call-back__popup');
const CallBackBody = document.querySelector('.call-back__body');

Form(CallBackOpenBtns, CallBackFormBG, CallBackForm, CallBackBody);

const OfferOpenBtns = document.querySelectorAll('.offer-btn');
const offerFormBG = document.querySelector('.offer__bg');
const offerBackForm = document.querySelector('.offer__popup');
const offerBody = document.querySelector('.offer__body');

Form(OfferOpenBtns, offerFormBG, offerBackForm, offerBody);

const ReviewsOpenBtns = document.querySelectorAll('.reviews-btn');
const ReviewFormBG = document.querySelector('.review__bg');
const ReviewBackForm = document.querySelector('.review__popup');
const ReviewBody = document.querySelector('.review__body');

Form(ReviewsOpenBtns, ReviewFormBG, ReviewBackForm, ReviewBody);

const WatchMoreOpenBtns = document.querySelectorAll('.watch-more-btn');
const WatchMoreOpenBtnsFormBG = document.querySelector('.watch-more__bg');
const WatchMoreOpenBtnsForm = document.querySelector('.watch-more__popup');
const WatchMoreBody = document.querySelector('.watch-more__body');

Form(WatchMoreOpenBtns, WatchMoreOpenBtnsFormBG, WatchMoreOpenBtnsForm, WatchMoreBody);


$('.js-tab-trigger').click(function() {
    let id = $(this).attr('data-tab'),
        content = $('.js-tab-content[data-tab="'+ id +'"]');
    
    $('.js-tab-trigger.active').removeClass('active');
    $(this).addClass('active');
    
    $('.js-tab-content.active').removeClass('active');
    content.addClass('active');
 });

 const toBookOpenBtns = document.querySelectorAll('.booking__button');
 const toBookFormBG = document.querySelector('.tobook__bg');
 const toBookForm = document.querySelector('.tobook__popup');
 const toBookBody = document.querySelector('.tobook__body');
 
 Form(toBookOpenBtns, toBookFormBG, toBookForm, toBookBody);


//burger
const iconMenu = document.querySelector('.menu__icon');
const headerBurger = document.querySelector('.header__burger');
iconMenu.addEventListener("click", function () {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle("menu__icon--active");
    headerBurger.classList.toggle("header__burger--active");
    headerBurger.scrollTop = 0;
});

 $(function () {
    $(".advantages__span").on('click', function () {
        if ($(this).hasClass("advantages__span--active")) {
            $(this).removeClass('advantages__span--active');
            $(this).parent().parent().removeClass("advantages__item--active");
        } else {
            $(this).addClass("advantages__span--active");
            $(this).parent().parent().addClass("advantages__item--active");
        }
    });
});