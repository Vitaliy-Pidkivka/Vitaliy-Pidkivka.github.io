'use strict';


function navMenu() {
    const nav = $('.section-menu-nav__text');

    if ($(window).width() < 575) {
        $('#navBtn, .section-menu-nav').on('mouseover', () => {

            for (let i = 0; i < nav.length; i++) {
                nav[i].style.display = 'flex';
                $('.section-menu-nav').css({
                    'margin-top': '15px',
                });
            }
        });
        $('.section-menu-nav__text').on('mouseout', () => {

            for (let i = 0; i < nav.length; i++) {
                nav[i].style.display = 'none';
                $('.section-menu-nav').css({
                    'margin-top': '0px',
                });

            }
        });
    }
};


function navContact() {
    $(document).ready(function() {
        $('#contact, #contactMe').on('click', () => {
            if ($(window).width() < 575) {
                $('.aside-contact').css({
                    'margin-top': '50px',
                    'background-color': 'yellow',
                    'border': '5px solid rgb(47, 165, 159)',
                    'border-radius': '12px',
                });

                setTimeout(() => {

                    $('.aside-contact').css({
                        'margin-top': '0px',
                        'background-color': 'rgba(252, 252, 252, 0.932)',
                        'border': 'none',
                    });
                }, 3400);
            } else {
                $('.aside-contact').css({
                    'transform': 'scale(1.2)',
                    'margin-top': '50px',
                    'background-color': 'yellow',
                    'border': '5px solid rgb(47, 165, 159)',
                    'border-radius': '12px',
                });

                setTimeout(() => {

                    $('.aside-contact').css({
                        'transform': 'scale(1)',
                        'margin-top': '0px',
                        'background-color': 'rgba(252, 252, 252, 0.932)',
                        'border': 'none',
                    });
                }, 3400);
            }

        });
    });

};





navMenu();
navContact();