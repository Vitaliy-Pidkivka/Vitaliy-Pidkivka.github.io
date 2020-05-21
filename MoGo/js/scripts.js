(function($) {
    var loadLazyLoadScript = false;

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
        closeMenu();
        autoCloseMenu();
        toggleActiveHeaderItem();
        customTabs();
        lazyLoad();
        toggleAccordionHeader();
        customScrollBar();
        initTestimonialSlider();
        scrollToSections();

    }); // ready

    $(window).on('resize', function() {
        checkScreenSize();
    }); // resize 
    $(window).on('scroll', function() {
        fixedHeader();
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

    function lazyLoad() {
        if ('loading' in HTMLImageElement.prototype) {
            var images = document.querySelectorAll('img.lazyload');
            images.forEach(function(img) {
                img.src = img.dataset.src;
                img.classList.add('lazyloaded');
                if (img.classList.contains('svg-html')) {
                    replaseInlineSvg($(img));
                }
                if (img.classList.contains('lazyload-bg')) {
                    img.style.display = 'none';
                    img.parentNode.style.backgroundImage = 'url(' + img.dataset.src + ')';
                }
            });
        } else {
            if (!loadLazyLoadScript) {
                loadLazyLoadScript = true;
                var script = document.createElement('script');
                script.async = true;
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.0/lazysizes.min.js';
                document.body.appendChild(script);
            }
            document.addEventListener('lazyloaded', function(e) {
                var img = e.target;
                if (img.classList.contains('lazyload-bg')) {
                    img.style.display = 'none';
                    img.parentNode.style.backgroundImage = 'url(' + img.dataset.src + ')';
                }
                if (img.classList.contains('svg-html')) {
                    replaseInlineSvg($(img));
                }
            });
        }
    }

    function replaseInlineSvg(elem) {
        elem.each(function() {
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function(data) {
                var $svg = $(data).find('svg');
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }
                $svg = $svg.removeAttr('xmlns:a');
                $img.replaceWith($svg);
            }, 'xml');
        });
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

    function closeMenu() {
        $('.header-menu li a').on('click', function(e) {
            e.preventDefault();
            $('html').removeClass('menu-opened');
            $('body').removeClass('menu-opened');
            $('.header-menu').removeClass('menu-opened');
            $('.open-menu').removeClass('menu-opened');
            $('.black-mask').removeClass('menu-opened');
        });
        $(document).on('click', function(e) {
            var menu = $("#header");
            if (!menu.is(e.target) &&
                menu.has(e.target).length === 0 && $('.header-menu').hasClass('menu-opened')) {
                $('html').removeClass('menu-opened');
                $('body').removeClass('menu-opened');
                $('.header-menu').removeClass('menu-opened');
                $('.open-menu').removeClass('menu-opened');
                $('.black-mask').removeClass('menu-opened');
            }
        });
    };

    function autoCloseMenu() {
        if (window.innerWidth > 991) {
            $('html').removeClass('menu-opened');
            $('body').removeClass('menu-opened');
            $('.header-menu').removeClass('menu-opened');
            $('.open-menu').removeClass('menu-opened');
            $('.black-mask').removeClass('menu-opened');
        }
    };

    function toggleActiveHeaderItem() {
        $('.header-menu li a').on('click', function(e) {
            $('.header-menu li a').removeClass('active')
            $(this).addClass('active')
        })
    };

    function fixedHeader() {
        let header = $('.header')
        if (header) {
            if (window.pageYOffset > 1 && !$(header).hasClass('fixed')) {
                $(header).addClass('fixed');
            } else if (window.pageYOffset < 1 && $(header).hasClass('fixed')) {
                $(header).removeClass('fixed')
            }
        }
    };

    function customTabs() {
        $(".tabs-stage .tab").hide();
        $(".tabs-stage .tab:first-child").show();
        $(".tabs-nav li:first").addClass("tab-active");

        // Change tab class and display content
        $(".tabs-nav a").on("click", function(event) {
            event.preventDefault();
            let parent = $(this).parents(".tabs-container");
            $(".tabs-nav li", parent).removeClass("tab-active");
            $(this)
                .parent()
                .addClass("tab-active");
            $(".tabs-stage .tab", parent).hide();
            $($(this).attr("href")).show();
        });
    };

    function toggleAccordionHeader() {
        let accordionHeaderBtn = $('.accordion .card-header .btn-link')
        accordionHeaderBtn.on('click', function(e) {
            $(accordionHeaderBtn).parent().removeClass('active')
            if ($(this).parent().next().hasClass('show')) {
                $(this).parent().removeClass('active')
            } else {
                $(this).parent().addClass('active')
            }
        })
    };

    function customScrollBar() {
        $('.accordion').niceScroll({
            cursorwidth: 10,
            cursoropacitymin: 0.4,
            cursorcolor: '#95e1d3',
            cursorborder: 'none',

        })
        $('.card-body').niceScroll({
            cursorwidth: 10,
            cursoropacitymin: 0.4,
            cursorcolor: '#95e1d3',
            cursorborder: 'none',

        })
    };


    function initTestimonialSlider() {
        $('.testimonial .slider').slick({
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            prevArrow: '<div  class="arrow-prev"><img src="images/ico-arrow.svg" alt="#"></div>',
            nextArrow: '<div  class="arrow-next"><img src="images/ico-arrow.svg" alt="#"></div>',
        })
    };

    function scrollToSections() {
        let headerButtons = document.querySelectorAll('.header-menu li a')
        headerButtons.forEach(function(item) {
            $(item).on('click', function(e) {
                $('.header-menu li a').not(this).removeClass('active')
                $(this).toggleClass('active');
                e.preventDefault();
                let href = e.target.href;
                let hrefHash = href.indexOf('#', 0);
                let sectionName = href.slice(hrefHash);
                let section = $(sectionName);
                let sectionOffset = section.offset().top;
                let headerOuterHeight = $('#header').outerHeight();
                $('.header-menu, .dropdown-btn').removeClass('active');
                $('.flex-home').removeClass('menu-opened');
                window.scrollTo({
                    top: sectionOffset - headerOuterHeight,
                    behavior: "smooth"
                });
            })
        })
    };
})(jQuery);