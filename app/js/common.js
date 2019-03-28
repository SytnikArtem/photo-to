$(document).ready(function () {

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
       $('.header-basket').addClass('active');
    });

    $(document).mouseup(function (e) {
        var container = $(".header-basket");
        if (container.has(e.target).length === 0){
            container.removeClass('active');
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
    });

    $('.profile-file-popup-close').click(function(){
        $('.profile-file-popup').removeClass('active')
    });
    $('.profile-file-close').click(function(e){
        e.stopPropagation();
        $(this).parent().hide();
    });


});
