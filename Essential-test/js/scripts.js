(function ($) {
    var loadLazyLoadScript = false;
    var screenRes_ = {
        isDesktop: true,
        isTablet: false,
        isMobile: false,
        isXl: false,
    };
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    $(document).ready(function () {
        initPolyfills();
        checkScreenSize();
        imgToBg();
        initMenu();
        lazyLoad();
        scrollToSections();
        initSlider();
		lazyLoadMap();
    }); // ready

    $(window).on("resize", function () {
        checkScreenSize();
    }); // resize
    $(window).on("scroll", function () {}); // scroll

    $(window).on("load", function () {}); // load

    function initPolyfills() {
        Number.isNaN =
            Number.isNaN ||
            function (value) {
                return typeof value === "number" && isNaN(value);
            }; // isNaN Polyfill
        if (window.NodeList && !NodeList.prototype.forEach) {
            NodeList.prototype.forEach = Array.prototype.forEach;
        } //polyfill
    }

    function checkScreenSize() {
        var winWidth = $(window).outerWidth();
        screenRes_.isXl = winWidth > 1439;
        screenRes_.isDesktop = winWidth > 1024;
        screenRes_.isMobile = winWidth < 768;
        screenRes_.isTablet = !screenRes_.isMobile && winWidth < 992;
        if (screenRes_.isTablet) {
            initSlider();
        } else if (screenRes_.isMobile) {
            initSlider();
        } else if (screenRes_.isDesktop) {
            initSlider();
        }
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

    function initMenu() {
        let $menu = $(".header-menu");

        $(".open-menu").click(function (event) {
            event.preventDefault();
            $("html, body").toggleClass("menu-opened");
            $(this).toggleClass("menu-opened");
            $(".header-menu").toggleClass("menu-opened");
        });

        $menu.find("li").has("ul").addClass("has-drop");
        $(".has-drop > a").click(function (event) {
            if ($(window).width() < 992) {
                if (!$(this).parent().hasClass("opened")) {
                    event.preventDefault();
                    $(this).parent().addClass("opened");
                    $(this).parent().siblings(".opened").removeClass("opened");
                } else {
                    $(this).parent().removeClass("opened");
                }
            }
        });
        $(document).on("mouseup touchend click", function (e) {
            let container = $(".header-menu .hover");
            let menu = $("#header");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.removeClass("hover");
            }
            if (!menu.is(e.target) && menu.has(e.target).length === 0 && $(".header-menu").hasClass("menu-opened")) {
                $("html").removeClass("menu-opened");
                $("body").removeClass("menu-opened");
                $(".header-menu").removeClass("menu-opened");
                $(".black-mask").removeClass("menu-opened");
                $(".open-menu").removeClass("menu-opened");
            }
        });
        $(window).on("resize", function () {
            if (!screenRes_.isMobile && !screenRes_.isMobile) {
                $("html").removeClass("menu-opened");
                $("body").removeClass("menu-opened");
                $(".header-menu").removeClass("menu-opened");
                $(".open-menu").removeClass("menu-opened");
                $(".black-mask").removeClass("menu-opened");
            }
        });
        $(".header-menu li a").on("click", function (e) {
            $("html").removeClass("menu-opened");
            $("body").removeClass("menu-opened");
            $(".header-menu").removeClass("menu-opened");
            $(".open-menu").removeClass("menu-opened");
            $(".black-mask").removeClass("menu-opened");
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
                $(".header-menu, .dropdown-btn").removeClass("active");
                $(".flex-home").removeClass("menu-opened");
                let headerOuterHeight = $("#header").outerHeight();
                window.scrollTo({
                    top: sectionOffset - headerOuterHeight,
                    behavior: "smooth",
                });
            });
        });
    }
    function initSlider() {
        $(".swiper-container").each(function (index, slider) {
            let newSlider = new Swiper(slider, {
                // loop: true,
                spaceBetween: index === 0 ? 0 : 30,
                slidesPerView: index === 0 ? (screenRes_.isDesktop ? 4 : screenRes_.isMobile ? 1 : 2) : screenRes_.isDesktop ? 3 : screenRes_.isMobile ? 1 : 2,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },

                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + "</span>";
                },
                //	Disable preloading of all images
                preloadImages: false,
                //	Enable lazy loading
                lazy: true,
                // effect: "fade",
            });
        });
	}
	function lazyLoadMap() {
		const clientsSection = $('.clients')
		let  clientsSectionTop = clientsSection.offset().top 
		$(window).bind('scroll', function(){
			let windowTop = $(this).scrollTop()
			if(windowTop > clientsSectionTop){
				initMap()
				$(window).unbind('scroll')
			}
		});
	}
	
})(jQuery);

function initMap() {
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 11,
        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(50.4231941, 30.4649937),
        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
            {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        saturation: 36,
                    },
                    {
                        color: "#000000",
                    },
                    {
                        lightness: 40,
                    },
                ],
            },
            {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [
                    {
                        visibility: "on",
                    },
                    {
                        color: "#000000",
                    },
                    {
                        lightness: 16,
                    },
                ],
            },
            {
                featureType: "all",
                elementType: "labels.icon",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
            {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [
                    {
                        color: "#000000",
                    },
                    {
                        lightness: 20,
                    },
                ],
            },
            {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [
                    {
                        color: "#000000",
                    },
                    {
                        lightness: 17,
                    },
                    {
                        weight: 1.2,
                    },
                ],
            },
            {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#000000",
                    },
                    {
                        lightness: 20,
                    },
                ],
            },
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#000000",
                    },
                    {
                        lightness: 21,
                    },
                ],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [
                    {
                        color: "#000000",
                    },
                    {
                        lightness: 17,
                    },
                ],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [
                    {
                        color: "#000000",
                    },
                    {
                        lightness: 29,
                    },
                    {
                        weight: 0.2,
                    },
                ],
            },
            {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#000000",
                    },
                    {
                        lightness: 18,
                    },
                ],
            },
            {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#000000",
                    },
                    {
                        lightness: 16,
                    },
                ],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#000000",
                    },
                    {
                        lightness: 19,
                    },
                ],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#000000",
                    },
                    {
                        lightness: 17,
                    },
                ],
            },
        ],
    };
    var mapElement = document.getElementById("map");
    var map = new google.maps.Map(mapElement, mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(50.4231941, 30.4649937),
        map: map,
        title: "Snazzy!",
    });
}
