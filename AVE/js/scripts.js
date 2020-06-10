(function ($) {
    let loadLazyLoadScript = false;
    let screenRes_ = {
        isDesktop: true,
        isTablet: false,
        isMobile: false,
        isMd: false,
        isXl: false,
    };

    $(document).ready(function () {
        checkScreenSize();
        imgToBg();
        openMenu();
        initMenu();
        closeMenu();
        lazyLoad();
        // scrollToSections();
        sliders();
        toggleShopCardImage();
        initCitiesTabs();
        initMap();
        validateForms();
        cardInput();
        customSelects();
        productTabs();
    }); // ready

    $(window).on("resize", function () {
        checkScreenSize();
        autoCloseMenu();
    }); // resize
    $(window).on("scroll", function () {
        fixedHeader();
    }); // scroll

    $(window).on("load", function () {}); // load

    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    } //polyfill

    function checkScreenSize() {
        let winWidth = $(window).outerWidth();
        screenRes_.isMd = winWidth > 992;
        screenRes_.isXl = winWidth > 1439;
        screenRes_.isDesktop = winWidth > 1024;
        screenRes_.isMobile = winWidth < 768;
        screenRes_.isTablet = !screenRes_.isMobile && winWidth < 992;
    }

    function imgToBg() {
        $(".bg-img").each(function () {
            let $img = $(this).find("> img");

            if ($img.length) {
                $(this).css("background-image", "url(" + $img.attr("src") + ")");
                $img.hide();
            }
        });
    }
    function lazyLoad() {
        if ("loading" in HTMLImageElement.prototype) {
            let images = document.querySelectorAll("img.lazyload");
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
                let script = document.createElement("script");
                script.async = true;
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.0/lazysizes.min.js";
                document.body.appendChild(script);
            }
            document.addEventListener("lazyloaded", function (e) {
                let img = e.target;
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
            let $img = $(this);
            let imgID = $img.attr("id");
            let imgClass = $img.attr("class");
            let imgURL = $img.attr("src");

            $.get(
                imgURL,
                function (data) {
                    let $svg = $(data).find("svg");
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
        });

        $menu.find("li").has("ul").addClass("has-drop");
        $(".has-drop > a")
            .click(function (event) {
                if ($(window).width() < 992) {
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
                if ($(window).width() > 991) {
                    cc($(this).next);
                }
            });
        $(document).on("mouseup touchend ", function (e) {
            let container = $(".header-menu .hover");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.removeClass("hover");
            }
        });
    }

    function openMenu() {
        $(".open-menu").on("click", function (e) {
            e.preventDefault();
            $(".header-menu").toggleClass("menu-opened");
            $("body").toggleClass("menu-opened");
            $(".black-mask").toggleClass("menu-opened");
        });
    }

    function closeMenu() {
        $(".header-menu a").on("click", function (e) {
            // e.preventDefault();
        });
        $(".header-menu li:not(.has-drop) a, .black-mask").on("click", function (e) {
            // e.preventDefault();
            $("html").removeClass("menu-opened");
            $("body").removeClass("menu-opened");
            $(".header-menu").removeClass("menu-opened");
            $(".black-mask").removeClass("menu-opened");
        });
        $(document).on("click", function (e) {
            let menu = $("#header");
            if (!menu.is(e.target) && menu.has(e.target).length === 0 && $(".header-menu").hasClass("menu-opened")) {
                $("html").removeClass("menu-opened");
                $("body").removeClass("menu-opened");
                $(".header-menu").removeClass("menu-opened");
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

    function scrollToSections() {
        let headerButtons = document.querySelectorAll(".header-menu li a");
        let projectButtons = document.querySelectorAll(".project a");
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
                // if (document.documentElement.clientWidth < 768) {
                //     window.scrollTo({
                //         top: sectionOffset - headerOuterHeight,
                //         behavior: 'smooth'
                //     });
                // } else {
                window.scroll({
                    top: sectionOffset,
                    behavior: "smooth",
                });
                // }
            });
        });
    }

    function sliders() {
        $(".product-slider").slick({
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            prevArrow: '<span class="arrow-prev slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></span>',
            nextArrow: '<span class="arrow-next slick-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></span>',
            customPaging: function (slider, i) {
                return "<span></span>";
            },
        });
    }

    function fixedHeader() {
        let header = document.querySelector(".header");
        if (window.pageYOffset > 1) {
            header.style.backgroundColor = "white";
        } else {
            header.style.backgroundColor = "";
        }
    }

    function toggleShopCardImage() {
        let shopCards = document.querySelectorAll(".shop-card");
        shopCards.forEach(function (card) {
            card.addEventListener("click", function (e) {
                if (e.target.nodeName === "IMG") {
                    let newImageSrc = e.target.attributes.src.nodeValue;
                    let newImageSrcValue = "url(" + newImageSrc + ")";
                    // ES6
                    // this.style.backgroundImage = `url(${newImageSrc})`
                    this.style.backgroundImage = newImageSrcValue;
                }
            });
        });
    }

    function initCitiesTabs() {
        if (".cities .tabs-item .tab") {
            let isFading = false;
            $(".cities .tabs-item .tab .btn").on("click", function (e) {
                e.preventDefault();
                if (!isFading) {
                    isFading = true;
                    let idx = $(this).parent().index();
                    $(".cities .tabs-item .tab").removeClass("active");
                    $(this).parent().addClass("active");
                    $(".cities .tab-content-item").fadeOut(0);
                    $(".cities .tab-content-item").eq(idx).fadeIn(700).css({ display: "flex" });
                    setTimeout(function () {
                        isFading = false;
                    }, 700);
                }
            });
        }
    }

    function initMap() {
        const grayMap = new google.maps.StyledMapType(
            [
                {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#444444",
                        },
                    ],
                },
                {
                    featureType: "landscape",
                    elementType: "all",
                    stylers: [
                        {
                            color: "#f2f2f2",
                        },
                    ],
                },
                {
                    featureType: "poi",
                    elementType: "all",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "road",
                    elementType: "all",
                    stylers: [
                        {
                            saturation: -100,
                        },
                        {
                            lightness: 45,
                        },
                    ],
                },
                {
                    featureType: "road.highway",
                    elementType: "all",
                    stylers: [
                        {
                            visibility: "simplified",
                        },
                    ],
                },
                {
                    featureType: "road.arterial",
                    elementType: "labels.icon",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "transit",
                    elementType: "all",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "water",
                    elementType: "all",
                    stylers: [
                        {
                            color: "#cfcfcf",
                        },
                        {
                            visibility: "on",
                        },
                    ],
                },
            ],
            { name: "Gray Map" }
        );
        const secondGray = new google.maps.StyledMapType(
            [
                {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#444444",
                        },
                    ],
                },
                {
                    featureType: "landscape",
                    elementType: "all",
                    stylers: [
                        {
                            color: "#f2f2f2",
                        },
                    ],
                },
                {
                    featureType: "poi",
                    elementType: "all",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "road",
                    elementType: "all",
                    stylers: [
                        {
                            saturation: -100,
                        },
                        {
                            lightness: 45,
                        },
                    ],
                },
                {
                    featureType: "road.highway",
                    elementType: "all",
                    stylers: [
                        {
                            visibility: "simplified",
                        },
                    ],
                },
                {
                    featureType: "road.arterial",
                    elementType: "labels.icon",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "transit",
                    elementType: "all",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "water",
                    elementType: "all",
                    stylers: [
                        {
                            color: "#464646",
                        },
                        {
                            visibility: "on",
                        },
                    ],
                },
            ],
            { name: "Second Gray" }
        );
        const thirdGray = new google.maps.StyledMapType(
            [
                {
                    featureType: "all",
                    elementType: "all",
                    stylers: [
                        {
                            saturation: -100,
                        },
                        {
                            gamma: 0.5,
                        },
                    ],
                },
            ],
            { name: "Third Gray" }
        );

        const mapHold = document.getElementsByClassName("map-box");

        for (let i = mapHold.length - 1; i >= 0; i--) {
            const latLng = {
                lat: parseFloat(mapHold[i].dataset.lat),
                lng: parseFloat(mapHold[i].dataset.lng),
            };
            const zoom = parseFloat(mapHold[i].dataset.zoom);
            const map = new google.maps.Map(mapHold[i], {
                center: latLng,
                zoom: zoom,
            });
            const marker = new google.maps.Marker({
                position: latLng,
                map: map,
            });
            if (mapHold[i].classList.contains("gray-second")) {
                map.mapTypes.set("second_gray", secondGray);
                map.setMapTypeId("second_gray");
                console.log(22);
            } else if (mapHold[i].classList.contains("gray-third")) {
                map.mapTypes.set("third_gray", thirdGray);
                map.setMapTypeId("third_gray");
                console.log(33);
            } else if (mapHold[i].classList.contains("gray-first")) {
                map.mapTypes.set("gray_map", grayMap);
                map.setMapTypeId("gray_map");
            }
        }
    }

    function validateForms() {
        $( "#sign-in-form" ).validate();
        $( "#register-form" ).validate({
            rules:{
                email: 'required',
                password: {
                    required: true,
                    minlength: 6,
                },
                'password-confirm': {
                    required: true,
                    minlength: 6,
                    equalTo: '#register-password'
                } 
            }
        });

    }

    function cardInput() {
		let inputBtn = $('.card-input .input-btn');
		$(inputBtn).each(function(i, item) {
			$(item).on('click', function(e) {
				if ($(item).hasClass('minus')) {
					if ($(item).next().text() <= 1) {
						return null;
					} else {
						$(item).next().text(+$(item).next().text() - 1);
					}
				} else if ($(item).hasClass('plus')) {
                    if ($(item).prev().text() >= 99) {
						return null;
					} else {
						$(item).prev().text(+$(item).prev().text() + 1);
					}
				}
			});
		});
	}

    function customSelects() {
		$('.select').select2({
			dropdownParent: $('.select-wrapper')
		});
    }
    
    function productTabs() {
        if (".product-tabs .tabs-item li") {
            let isFading = false;
            $(".product-tabs .tabs-item li").on("click", function () {
                if (!isFading) {
                    isFading = true;
                    let idx = $(this).index();
                    $(".product-tabs .tabs-item li").removeClass("active");
                    $(this).addClass("active");
                    $(".product-tabs .tab-content-item").fadeOut(0);
                    $(".product-tabs .tab-content-item").eq(idx).fadeIn(700);
                    setTimeout(function () {
                        isFading = false;
                    }, 700);
                }
            });
        }
    }
})(jQuery);
