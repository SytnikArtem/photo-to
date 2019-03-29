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
        arrows: false
    });

    //слайдер на item
    $('.item-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.item-dots',
        swipe: false
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
        var topPosition = $(linkHref).offset().top;
        $('body,html').animate({scrollTop: topPosition}, 500);
    });

    //слайдер страница services

    $('.services-gallery-slider').slick({
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        infinite: false
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
       $(this).parent().find('.header-basket').addClass('active');
       $(this).addClass('active');
    });

    $(document).mouseup(function (e) {
        var container = $(".header-basket");
        if (container.has(e.target).length === 0){
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
    // var heightDuration = $('.contact-right').height() - $('.contact-form-trigger').position().top - $('.contact-form-trigger').height();
    // if (heightDuration < 1) {
    //     heightDuration = 1;
    // }
    var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-80"}});
    var scene1 = new ScrollMagic.Scene({
        triggerElement: ".price-right", // point of execution
        duration: $('.price-left').height() - $('.price-right').position().top - 20, // pin element for the window height - 1
        reverse: true // allows the effect to trigger when scrolled in the reverse direction
    })
        .setPin(".price-right") // the element we want to pin
        .addTo(controller);

    var controller2 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-100"}});
    var scene1 = new ScrollMagic.Scene({
        triggerElement: "#thermal .price-table-top", // point of execution
        duration: $('#thermal .price-table').height(), // pin element for the window height - 1
        reverse: true // allows the effect to trigger when scrolled in the reverse direction
    })
        .setPin("#thermal .price-table-top") // the element we want to pin
        .addTo(controller2);

    // var controller2 = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-90"}});
    // $('.price-table-top').each(function(){
    //     console.log('ww');
    //     var scene2 = new ScrollMagic.Scene({
    //         triggerElement: '.price-table-top', // point of execution
    //         duration: 100, // pin element for the window height - 1
    //         reverse: true // allows the effect to trigger when scrolled in the reverse direction
    //     })
    //         .setPin('.price-table-top') // the element we want to pin
    //         .addTo(controller2);
    // });


    if ($(window).width() > 1023) {
        gsapTop();
        gsapFade();
        gsapFadeTop();
        gsapCard();
        gsapFadeTop2()
    }
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