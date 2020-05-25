(function ($) {
    var loadLazyLoadScript = false;
    var screenRes_ = {
        isDesktop: true,
        isTablet: false,
        isMobile: false,
        isMd: false,
        isXl: false,
    };

    $(document).ready(function () {
        checkScreenSize();
        imgToBg();
        initMenu();
        openMenu();
        closeMenu();
        autoCloseMenu();
        sliders();
        scrollToSections();
        toggleActiveHeaderItem();
        lazyLoad();
        questionsTabs();
    }); // ready

    $(window).on("resize", function () {
        checkScreenSize();
    }); // resize
    $(window).on("scroll", function () {
    }); // scroll

    $(window).on("load", function () {}); // load

    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    } //polyfill

    function checkScreenSize() {
        var winWidth = $(window).outerWidth();
        screenRes_.isMd = winWidth > 992;
        screenRes_.isXl = winWidth > 1439;
        screenRes_.isDesktop = winWidth > 1024;
        screenRes_.isMobile = winWidth < 768;
        screenRes_.isTablet = !screenRes_.isMobile && winWidth < 992;
    }

    function imgToBg() {
        $(".bg-img").each(function () {
            var $img = $(this).find("> img");

            if ($img.length) {
                $(this).css("background-image", "url(" + $img.attr("src") + ")");
                $img.hide();
            }
        });
    }

    function initMenu() {
        var $menu = $(".header-menu");

        $(".open-menu").click(function (event) {
            event.preventDefault();
            $("html, body").toggleClass("menu-opened");
        });

        $menu.find("li").has("ul").addClass("has-drop");
        $(".has-drop > a")
            .click(function (event) {
                if ($(window).width() < 768) {
                    if (!$(this).parent().hasClass("opened")) {
                        event.preventDefault();
                        $(this).parent().addClass("opened");
                        $(this).parent().siblings(".opened").removeClass("opened");
                    } else {
                        $(this).parent().removeClass("opened");
                    }
                }
            })
            .on("touchend", function (event) {
                if ($(window).width() > 767) {
                    if (!$(this).parent().hasClass("hover")) {
                        event.preventDefault();
                        $(this).parent().addClass("hover");
                        $(this).parent().siblings(".hover").removeClass("hover");
                    } else {
                        $(this).parent().removeClass("hover");
                    }
                }
            });
        $(document).on("mouseup touchend ", function (e) {
            var container = $(".header-menu .hover");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.removeClass("hover");
            }
        });
    }

    function openMenu() {
        $(".open-menu").on("click", function (e) {
            e.preventDefault();
            $(this).toggleClass("menu-opened");
            $(".header-menu").toggleClass("menu-opened");
            $("body").toggleClass("menu-opened");
        });
    }

    function closeMenu() {
        $(".header-menu li a").on("click", function (e) {
            e.preventDefault();
            $("html").removeClass("menu-opened");
            $("body").removeClass("menu-opened");
            $(".header-menu").removeClass("menu-opened");
            $(".open-menu").removeClass("menu-opened");
            $(".black-mask").removeClass("menu-opened");
        });
        $(document).on("click", function (e) {
            var menu = $("#header");
            if (!menu.is(e.target) && menu.has(e.target).length === 0 && $(".header-menu").hasClass("menu-opened")) {
                $("html").removeClass("menu-opened");
                $("body").removeClass("menu-opened");
                $(".header-menu").removeClass("menu-opened");
                $(".open-menu").removeClass("menu-opened");
                $(".black-mask").removeClass("menu-opened");
            }
        });
    }

    function autoCloseMenu() {
        if (window.innerWidth > 991) {
            $("html").removeClass("menu-opened");
            $("body").removeClass("menu-opened");
            $(".header-menu").removeClass("menu-opened");
            $(".open-menu").removeClass("menu-opened");
            $(".black-mask").removeClass("menu-opened");
        }
    }

    function toggleActiveHeaderItem() {
        $(".header-menu li a").on("click", function (e) {
            $(".header-menu li a").removeClass("active");
            $(this).addClass("active");
        });
    }

    function sliders() {
        $(".testimonial-slider").slick({
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            customPaging: function (slider, i) {
                return "<span></span>";
            },
        });
    }

    function scrollToSections() {
        let headerButtons = document.querySelectorAll(".header-menu li a");
        headerButtons.forEach(function (item) {
            $(item).on("click", function (e) {
                $(".header-menu li a").not(this).removeClass("active");
                $(this).toggleClass("active");
                e.preventDefault();
                let href = e.target.href;
                let hrefHash = href.indexOf("#", 0);
                let sectionName = href.slice(hrefHash);
                let section = $(sectionName);
                let sectionOffset = section.offset().top;
                let headerOuterHeight = $("#header").outerHeight();
                $(".header-menu, .dropdown-btn").removeClass("active");
                $(".flex-home").removeClass("menu-opened");
                window.scrollTo({
                    top: sectionOffset - headerOuterHeight - 28,
                    behavior: "smooth",
                });
            });
        });
    }

    // functions
    function lazyLoad() {
        if ("loading" in HTMLImageElement.prototype) {
            var images = document.querySelectorAll("img.lazyload");
            images.forEach(function (img) {
                img.src = img.dataset.src;
                img.classList.add("lazyloaded");
                if (img.classList.contains("svg-html")) {
                    replaseInlineSvg($(img));
                }
                if (img.classList.contains("lazyload-bg")) {
                    img.style.display = "none";
                    img.parentNode.style.backgroundImage = "url(" + img.dataset.src + ")";
                }
            });
        } else {
            if (!loadLazyLoadScript) {
                loadLazyLoadScript = true;
                var script = document.createElement("script");
                script.async = true;
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.0/lazysizes.min.js";
                document.body.appendChild(script);
            }
            document.addEventListener("lazyloaded", function (e) {
                var img = e.target;
                if (img.classList.contains("lazyload-bg")) {
                    img.style.display = "none";
                    img.parentNode.style.backgroundImage = "url(" + img.dataset.src + ")";
                }
                if (img.classList.contains("svg-html")) {
                    replaseInlineSvg($(img));
                }
            });
        }
    }

    function replaseInlineSvg(elem) {
        elem.each(function () {
            var $img = $(this);
            var imgID = $img.attr("id");
            var imgClass = $img.attr("class");
            var imgURL = $img.attr("src");

            $.get(
                imgURL,
                function (data) {
                    var $svg = $(data).find("svg");
                    if (typeof imgID !== "undefined") {
                        $svg = $svg.attr("id", imgID);
                    }
                    if (typeof imgClass !== "undefined") {
                        $svg = $svg.attr("class", imgClass + " replaced-svg");
                    }
                    $svg = $svg.removeAttr("xmlns:a");
                    $img.replaceWith($svg);
                },
                "xml"
            );
        });
    }
    function questionsTabs() {
        if (".questions .tabs-item li") {
            let isFading = false;
            $(".questions .tabs-item li").on("click", function () {
                if (!isFading) {
                    isFading = true;
                    let idx = $(this).index();
                    $(".questions .tabs-item li").removeClass("active");
                    $(this).addClass("active");
                    $(".questions .tab-content-item").fadeOut(0);
                    $(".questions .tab-content-item").eq(idx).fadeIn(700);
                    setTimeout(function () {
                        isFading = false;
                    }, 700);
                }
            });
        }
    }
})(jQuery);
