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
        document.body.style.display = "block";
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
        showLightbox();
        init();
    }); // ready

    $(window).on("resize", function () {
        checkScreenSize();
    }); // resize
    $(window).on("scroll", function () {}); // scroll

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
            $(".black-mask").toggleClass("menu-opened");
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
        $(".black-mask").on("click", function () {
            $("html").removeClass("menu-opened");
            $("body").removeClass("menu-opened");
            $(".header-menu").removeClass("menu-opened");
            $(".open-menu").removeClass("menu-opened");
            $(".black-mask").removeClass("menu-opened");
            $(".lightbox").removeClass("visible");
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
    function showLightbox() {
        const lightbox = $(".lightbox");
        if (lightbox) {
            setTimeout(function () {
                $(".lightbox").addClass("visible");
                $(".black-mask").addClass("menu-opened");
                $("html").addClass("menu-opened");
                if ($(".lightbox-label").offset().top < 0) {
                    let lightboxTop = $(".lightbox-label").offset().top;
                    let defaultTop = lightboxTop.toString().slice(1);
                    $(".lightbox").css({ top: +defaultTop + 100 + "px", transform: "translate(-50%,0)" });
                }
            }, 4000);
            setTimeout(function () {
                $(".lightbox").removeClass("visible");
                $(".black-mask").removeClass("menu-opened");
                $("html").removeClass("menu-opened");
                if ($(".lightbox-label").offset().top < 0) {
                    let lightboxTop = $(".lightbox-label").offset().top;
                    let defaultTop = lightboxTop.toString().slice(1);
                    $(".lightbox").css({ top: +defaultTop + 100 + "px", transform: "translate(-50%,0)" });
                }
            }, 10000);
        }
    }
    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 11,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.67, -73.94), // New York

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [
                {
                    featureType: "administrative",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#a7a7a7",
                        },
                    ],
                },
                {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            visibility: "on",
                        },
                        {
                            color: "#737373",
                        },
                    ],
                },
                {
                    featureType: "landscape",
                    elementType: "geometry.fill",
                    stylers: [
                        {
                            visibility: "on",
                        },
                        {
                            color: "#ffffff",
                        },
                    ],
                },
                {
                    featureType: "poi",
                    elementType: "geometry.fill",
                    stylers: [
                        {
                            visibility: "on",
                        },
                        {
                            color: "#dadada",
                        },
                    ],
                },
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "poi",
                    elementType: "labels.icon",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [
                        {
                            visibility: "on",
                        },
                        {
                            color: "#ffa000",
                        },
                    ],
                },
                {
                    featureType: "road",
                    elementType: "geometry.fill",
                    stylers: [
                        {
                            visibility: "on",
                        },
                        {
                            color: "#ffa000",
                        },
                    ],
                },
                {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [
                        {
                            color: "#ffa000",
                        },
                        {
                            visibility: "on",
                        },
                    ],
                },
                {
                    featureType: "road",
                    elementType: "labels",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "road",
                    elementType: "labels.text",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#ffffff",
                        },
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "road",
                    elementType: "labels.text.stroke",
                    stylers: [
                        {
                            visibility: "off",
                        },
                        {
                            color: "#ffa000",
                        },
                    ],
                },
                {
                    featureType: "road",
                    elementType: "labels.icon",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [
                        {
                            color: "#ffa000",
                        },
                    ],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [
                        {
                            visibility: "on",
                        },
                        {
                            color: "#ffa000",
                        },
                    ],
                },
                {
                    featureType: "road.arterial",
                    elementType: "geometry.fill",
                    stylers: [
                        {
                            color: "#ffa000",
                        },
                    ],
                },
                {
                    featureType: "road.arterial",
                    elementType: "geometry.stroke",
                    stylers: [
                        {
                            color: "#ffa000",
                        },
                    ],
                },
                {
                    featureType: "road.local",
                    elementType: "geometry.fill",
                    stylers: [
                        {
                            visibility: "on",
                        },
                        {
                            color: "#ffcf7f",
                        },
                        {
                            weight: 1.8,
                        },
                    ],
                },
                {
                    featureType: "road.local",
                    elementType: "geometry.stroke",
                    stylers: [
                        {
                            color: "#ffa000",
                        },
                    ],
                },
                {
                    featureType: "transit",
                    elementType: "all",
                    stylers: [
                        {
                            color: "#808080",
                        },
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "water",
                    elementType: "geometry.fill",
                    stylers: [
                        {
                            color: "#d3d3d3",
                        },
                    ],
                },
            ],
        };
        var mapElement = document.getElementById("map");

        var map = new google.maps.Map(mapElement, mapOptions);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.67, -73.94),
            map: map,
            title: "Snazzy!",
        });
    }
})(jQuery);
