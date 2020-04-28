(function($) {

    var screenRes_ = {
        isDesktop: true,
        isTablet: false,
        isMobile: false,
        isMd: false,
        isXl: false,
    };

    $(document).ready(function() {
        checkScreenSize();
        imgToBg();
        openMenu();
        initMenu();
        sliders();
        hideMobileMenu();
    }); // ready

    $(window).on('resize', function() {
        checkScreenSize();
    }); // resize 
    $(window).on('scroll', function() {

    }); // scroll 

    $(window).on('load', function() {

    }); // load


    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    } //polyfill

    function checkScreenSize() {
        var winWidth = $(window).outerWidth();
        screenRes_.isMd = (winWidth > 992);
        screenRes_.isXl = (winWidth > 1439);
        screenRes_.isDesktop = (winWidth > 1024);
        screenRes_.isMobile = (winWidth < 768);
        screenRes_.isTablet = (!screenRes_.isMobile && (winWidth < 992));
    }

    function imgToBg() {
        $('.bg-img').each(function() {
            var $img = $(this).find('> img');

            if ($img.length) {
                $(this).css('background-image', 'url(' + $img.attr('src') + ')');
                $img.hide();
            }
        });
    }
    function hideMobileMenu() {
        $('.header-menu  li:not(.has-drop) a').on('click', function(e) {
            e.target
            $('html,body,.header-menu,.open-menu').removeClass('menu-opened');
            $('body').removeClass('lock')
        })
        $('.header-menu  li.has-drop ul a').on('click', function(e) {
            e.target
            $('html,body,.header-menu,.open-menu').removeClass('menu-opened');
            $('body').removeClass('lock')
        })
        $('.header-menu li').on('click', function(e){
            $('.header-menu li').not(this).removeClass('opened');
        })
    };

    function initMenu() {
        var $menu = $('.header-menu');

        $('.open-menu').click(function(event) {
            event.preventDefault();
            $('html, body').toggleClass('menu-opened');
        });

        $menu.find('li').has('ul').addClass('has-drop');
        $('.has-drop > a').click(function(event) {
            if ($(window).width() < 768) {
                if (!$(this).parent().hasClass('opened')) {
                    event.preventDefault();
                    $(this).parent().addClass('opened');
                    $(this).parent().siblings('.opened').removeClass('opened');
                } else {
                    $(this).parent().removeClass('opened');
                }
            }
        }).on('touchend', function(event) {
            if ($(window).width() > 767) {
                if (!$(this).parent().hasClass('hover')) {
                    event.preventDefault();
                    $(this).parent().addClass('hover');
                    $(this).parent().siblings('.hover').removeClass('hover');
                } else {
                    $(this).parent().removeClass('hover');
                }
            }
        });
        $(document).on('mouseup touchend ', function(e) {
            var container = $('.header-menu .hover');
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.removeClass('hover');
            }
        });
    }

    function openMenu() {
        $('.open-menu').on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('menu-opened');
            $('.header-menu').toggleClass('menu-opened');
            $('body').toggleClass('menu-opened');
        });
    };

    function sliders() {
        $('.main-slider').slick({
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            prevArrow: '<div id="prev" class="arrow-prev"><img src="images/arrow-left.png" alt="left"></div>',
            nextArrow: '<div id="next" class="arrow-next"> <img src="images/arrow-right.png" alt="right"></div>',
            customPaging: function(slider, i) {
                return '<span></span>';
            },
        })
    };

})(jQuery);