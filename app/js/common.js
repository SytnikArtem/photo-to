$(document).ready(function () {

    var $body = $('body');
    function bodyFreezeScroll() {
        let bodyWidth = $body.innerWidth();
        $body.css('overflow', 'hidden');
        $body.css('marginRight', ($body.css('marginRight') ? '+=' : '') + ($body.innerWidth() - bodyWidth))
    }

    function bodyUnfreezeScroll() {
        let bodyWidth = $body.innerWidth();
        $body.css('marginRight', '0')
        $body.css('overflow', 'auto');
    }

    //слайдер на главной
    $('.first-slider').slick({
        dots: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        autoplay: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: false
                }
            }
        ]
    });

    //слайдер на item
    $('.item-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.item-dots',
        // swipe: false
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerMode: true
                }
            }
        ]
    });
    $('.item-dots').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.item-slider',
        dots: false,
        arrows: false,
        // centerMode: true,
        focusOnSelect: true

    });

    //выбор файла item
    $('.item-file .item-form-input').change(function(e){
        var fileName = this.files[0].name;
        $(this).parent().find('.item-file-span').addClass('active');
        $(this).parent().find('.item-file-span-close').addClass('active');
        $(this).parent().find('.item-file-span-title').text('Файл:');
        $(this).parent().find('.item-file-span-text').text(fileName)
    });

    //удаленние файла item
    $('.item-file-span-close').click(function(e){
        e.preventDefault();
        $(this).removeClass('active');
        $(this).parent().find('.item-file-span-title').text('Выбрать файл');
        $(this).parent().find('.item-file-span-text').text('');
        $(this).parent().removeClass('active');
    });

    //поле количества item
    var inputNumber, currentNumber;
    $('.item-number-btn_up').click(function(){
        inputNumber = $(this).parent().parent().find('.item-number-input').val();
        currentNumber = +inputNumber + 1;
        $(this).parent().parent().find('.item-number-input').val(currentNumber );
        console.log(inputNumber)
    });
    $('.item-number-btn_down').click(function(){
        inputNumber = $(this).parent().parent().find('.item-number-input').val();
        currentNumber = +inputNumber - 1;
        if(currentNumber < 1) {
            currentNumber = 1;
        }
        $(this).parent().parent().find('.item-number-input').val(currentNumber );
        console.log(inputNumber)
    });

    //табы
    $('.item-tabs-link').click(function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        var thisIndex = $(this).index();
        if(thisIndex == 0) {
            $('.item-form-row_hide').slideDown();
        }
        else {
            $('.item-form-row_hide').slideUp()
        }
    });

    //скрол страница price
    $('.price-list-link').click(function(e){
        e.preventDefault();
        $(this).addClass('active').parent().siblings().find('.price-list-link').removeClass('active');
        var linkHref = $(this).attr('href');
        var topPosition = $(linkHref).offset().top - 100;
        $('body,html').animate({scrollTop: topPosition}, 500);
    });

    //слайдер страница services

    $('.services-gallery-slider').slick({
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    //табы services

    $('.services-gallery-tab').click(function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    });

    //скролбар корзины и сама корзина

    Scrollbar.initAll({
        alwaysShowTracks: true
    });

    $('.header-right-link_basket').click(function(e){
        e.preventDefault();
       $(this).parent().find('.header-basket').toggleClass('active');
       $(this).toggleClass('active');
       if($(window).width() < 1024 && $(this).hasClass('active')) {
           bodyFreezeScroll();
       }
       else {
           bodyUnfreezeScroll()
       }
    });

    $(document).mouseup(function (e) {
        var container = $(".header-basket");
        if (container.has(e.target).length === 0 && $(window).width() > 1023){
            container.removeClass('active');
            $('.header-right-link_basket').removeClass('active');
        }
    });


    //селект страница oreder

    $(".js-city").select2({
        placeholder : "Выберите город"
    });
    $(".js-country").select2({
        placeholder : "Выберите страну"
    });
    $(".back-popup-select").select2({
        placeholder : "Причина обращения"
    });
    $(".js-price").select2({
        placeholder : "Выберите услугу"
    });

    //табы profile
    var thisTitle;
    function checkHeight(){
      var currentHeight = $('.profile-item.active').height();
      $('.profile-list').height(currentHeight);
    }
    checkHeight();

    $('.profile-tab').click(function(e){
        e.preventDefault();
        var thisIndex = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.profile-item').eq(thisIndex).addClass('active').siblings().removeClass('active');
        var titles = ['Личная информация', 'Мои заказы', 'Изменить пароль', 'Мои файлы'];
        thisTitle = titles[thisIndex];
        $('.profile-subtitle .subtitle-span').text(thisTitle);
        checkHeight();
        if(thisIndex == 0) {
            $('.profile-bottom').slideDown()
        }
        else {
            $('.profile-bottom').slideUp()
        }
    });
    $('.profile-order-bottom-btn').click(function(e){
        e.preventDefault();
        $('.profile-item_detalis').addClass('active').siblings().removeClass('active');
        thisTitle = $(this).closest('.profile-order').find('.js-order-number').text();
        $('.profile-subtitle .subtitle-span').text(thisTitle);
        checkHeight();
    });
    $('.profile-btn_edit').click(function(e){
        e.preventDefault();
        $('.profile-item_edit').addClass('active').siblings().removeClass('active');
        $('.profile-bottom').slideUp();
        $('.profile-subtitle .subtitle-span').text('Редактировать личные данные');
        checkHeight();
    });


    //попап раздел мои файлы

    $('.profile-file-item').click(function(){
        // e.stopPropagation();
       var thisSrc = $(this).find('.profile-file-img').data('src');
       $('.profile-file-popup-img').attr('src', thisSrc);
       $('.profile-file-popup').addClass('active');
       bodyFreezeScroll();

    });

    $('.profile-file-popup-close').click(function(){
        $('.profile-file-popup').removeClass('active');
        bodyUnfreezeScroll();
    });
    $('.profile-file-close').click(function(e){
        e.stopPropagation();
        $(this).parent().hide();
        checkHeight();
    });

    //попап страница возврата

    $('.back-link_form').click(function(e){
        e.preventDefault();
        $('.back-popup').addClass('active');
        bodyFreezeScroll();
    });
    $('.back-popup-close').click(function () {
        $('.back-popup').removeClass('active');
        bodyUnfreezeScroll();
    });

    $('.thank-popup-close').click(function () {
        $('.thank-popup-main').removeClass('active');
        setTimeout(function(){
            $('.thank-popup').removeClass('active');
        }, 1000);

    });

    $('.back-popup-files-close').click(function(){
        $(this).parent().hide();
    });

    $('.back-popup-form').submit(function(e){
        e.preventDefault();
        $('.thank-popup').addClass('active');
        bodyFreezeScroll();
        setTimeout(function(){
            $('.thank-popup-main').addClass('active');
        }, 1000);
    });
    flexHeight();

    //Анимации
    function gsapTop() {
        var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter"}});

        $('.gsapTop').each(function() {
            var animationDelay = $(this).data("delay") || 1;
            var animationDuration = $(this).data("duration") || 0.5;
            var position = $(this).height();
            var tween = TweenMax.fromTo(this, animationDuration,
                {y: +position},
                {y: 0, ease: Power4.easeOut, delay: animationDelay, force3D:true}
            );
            var trigg = this;
            new ScrollMagic.Scene({triggerElement: trigg})
                .setTween(tween)
                .addTo(controller);
        })
    }
    function gsapFade() {
        var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter"}});

        $('.gsapFade').each(function() {
            var animationDelay = $(this).data("delay") || 1;
            var animationDuration = $(this).data("duration") || 4;
            var tween = TweenMax.fromTo(this, animationDuration,
                {opacity: 0},
                {opacity: 1, ease: Power4.easeOut, delay: animationDelay}
            );
            var trigg = this;
            new ScrollMagic.Scene({triggerElement: trigg})
                .setTween(tween)
                .addTo(controller);
        })
    }
    function gsapFadeTop() {
        var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onCenter"}});

        $('.gsapFadeTop').each(function() {
            var animationDelay = $(this).data("delay") || 0.5;
            var animationDuration = $(this).data("duration") || 1.5;
            var position = $(this).data("height") || $(this).height();
            var tween = TweenMax.fromTo(this, animationDuration,
                {opacity: 0, y: position},
                {opacity: 1, y: 0, ease: Power4.easeOut, delay: animationDelay, force3D:true}
            );
            var trigg = this;
            new ScrollMagic.Scene({triggerElement: trigg})
                .setTween(tween)
                .addTo(controller);
        })
    }
    function gsapFadeTop2() {
        var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter"}});

        $('.gsapFadeTop2').each(function() {
            var animationDelay = $(this).data("delay") || 0.5;
            var animationDuration = $(this).data("duration") || 1;
            var position = $(this).data("height") || $(this).height();
            var tween = TweenMax.fromTo(this, animationDuration,
                {opacity: 0, y: position},
                {opacity: 1, y: 0, ease: Power4.easeOut, delay: animationDelay, force3D:true}
            );
            var trigg = this;
            new ScrollMagic.Scene({triggerElement: trigg})
                .setTween(tween)
                .addTo(controller);
        })
    }
    function gsapCard() {
        var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter"}});

        $('.gsapCard').each(function() {
            var animationDelay = $(this).data("delay") || 0.5;
            var animationDuration = $(this).data("duration") || 1;
            var position = $(this).data("height") || $(this).height();
            var tween = TweenMax.fromTo(this, animationDuration,
                {opacity: 0, y: position,  width: '80%'},
                {opacity: 1, y: 0, width: "100%", ease: Power4.easeOut, delay: animationDelay, force3D:true}
            );
            var trigg = this;
            new ScrollMagic.Scene({triggerElement: trigg})
                .setTween(tween)
                .addTo(controller);
        })
    }

    if ($(window).width() > 1023) {
        gsapTop();
        gsapFade();
        gsapFadeTop();
        gsapCard();
        gsapFadeTop2()
    }
    if($('.price').length > 0) {
        var priceHeight = $('.price-right').height() / 2;
        var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-100"}});
        var scene1 = new ScrollMagic.Scene({
            triggerElement: ".price-right", // point of execution
            duration: $('.price-left').height() - $('.price-right').position().top - 290, // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin(".price-right") // the element we want to pin
            .addTo(controller);

        var controller2 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene2 = new ScrollMagic.Scene({
            triggerElement: "#thermal .price-table-fixed", // point of execution
            duration: $('#thermal .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#thermal .price-table-fixed") // the element we want to pin
            .addTo(controller2);

        var controller3 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene3 = new ScrollMagic.Scene({
            triggerElement: "#direct .price-table-fixed", // point of execution
            duration: $('#direct .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#direct .price-table-fixed") // the element we want to pin
            .addTo(controller3);

        var controller4 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene4 = new ScrollMagic.Scene({
            triggerElement: "#slick .price-table-fixed", // point of execution
            duration: $('#slick .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#slick .price-table-fixed") // the element we want to pin
            .addTo(controller4);

        var controller5 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene5 = new ScrollMagic.Scene({
            triggerElement: "#photo .price-table-fixed", // point of execution
            duration: $('#photo .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#photo .price-table-fixed") // the element we want to pin
            .addTo(controller5);

        var controller6 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene6 = new ScrollMagic.Scene({
            triggerElement: "#copy .price-table-fixed", // point of execution
            duration: $('#copy .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#copy .price-table-fixed") // the element we want to pin
            .addTo(controller6);

        var controller7 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene7 = new ScrollMagic.Scene({
            triggerElement: "#print .price-table-fixed", // point of execution
            duration: $('#print .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#print .price-table-fixed") // the element we want to pin
            .addTo(controller7);

        var controller8 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene8 = new ScrollMagic.Scene({
            triggerElement: "#scanning .price-table-fixed", // point of execution
            duration: $('#scanning .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#scanning .price-table-fixed") // the element we want to pin
            .addTo(controller8);

        var controller9 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene9 = new ScrollMagic.Scene({
            triggerElement: "#lamination .price-table-fixed", // point of execution
            duration: $('#lamination .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#lamination .price-table-fixed") // the element we want to pin
            .addTo(controller9);

        var controller10 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene10 = new ScrollMagic.Scene({
            triggerElement: "#widescreen .price-table-fixed", // point of execution
            duration: $('#widescreen .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#widescreen .price-table-fixed") // the element we want to pin
            .addTo(controller10);

        var controller11 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene11 = new ScrollMagic.Scene({
            triggerElement: "#cutaway .price-table-fixed", // point of execution
            duration: $('#cutaway .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#cutaway .price-table-fixed") // the element we want to pin
            .addTo(controller11);

        var controller12 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene12 = new ScrollMagic.Scene({
            triggerElement: "#flyer .price-table-fixed", // point of execution
            duration: $('#flyer .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#flyer .price-table-fixed") // the element we want to pin
            .addTo(controller12);

        var controller13 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene13 = new ScrollMagic.Scene({
            triggerElement: "#signet .price-table-fixed", // point of execution
            duration: $('#signet .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#signet .price-table-fixed") // the element we want to pin
            .addTo(controller13);

        var controller14 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene14 = new ScrollMagic.Scene({
            triggerElement: "#stamp .price-table-fixed", // point of execution
            duration: $('#stamp .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#stamp .price-table-fixed") // the element we want to pin
            .addTo(controller14);

        var controller15 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene15 = new ScrollMagic.Scene({
            triggerElement: "#photo-print .price-table-fixed", // point of execution
            duration: $('#photo-print .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#photo-print .price-table-fixed") // the element we want to pin
            .addTo(controller15);

        var controller16 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene16 = new ScrollMagic.Scene({
            triggerElement: "#cup .price-table-fixed", // point of execution
            duration: $('#cup .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#cup .price-table-fixed") // the element we want to pin
            .addTo(controller16);

        var controller17 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
        var scene17 = new ScrollMagic.Scene({
            triggerElement: "#cutaway-offset .price-table-fixed", // point of execution
            duration: $('#cutaway-offset .price-table').height(), // pin element for the window height - 1
            reverse: true // allows the effect to trigger when scrolled in the reverse direction
        })
            .setPin("#cutaway-offset .price-table-fixed") // the element we want to pin
            .addTo(controller17);
    }

    //мобильное меню
    $('.js-drop').click(function(e){
        e.preventDefault();
        $(this).parent().find('.header-drop').slideToggle();
        $(this).toggleClass('open');
    });
    $('.header-burger').click(function(){
        $('.menu').addClass('active');
        bodyFreezeScroll();
    });

    $('.menu').swipe({
        swipeLeft:function(event, direction) {
            $(this).removeClass('active');
            bodyUnfreezeScroll();
        }
    });
    $('.header-basket').swipe({
        swipeRight:function(event, direction) {
            $(this).removeClass('active');
            bodyUnfreezeScroll();
        }
    });
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('.header-fixed').addClass('active');
    } else {
        $('.header-fixed').removeClass('active');
        $('.header-fixed').find('.header-basket').removeClass('active');
        $('.header-fixed').find('.header-right-link_basket').removeClass('active');
    }
});
function flexHeight(){
    var popupHeight = $('.back-popup').height();
    var contentHeight = $('.back-popup-content').outerHeight();
    if(contentHeight > popupHeight) {
        $('.back-popup').addClass('flex-start')
    }
    else {
        $('.back-popup').removeClass('flex-start')
    }
}
$(window).resize(function(){
    flexHeight();
});