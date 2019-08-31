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

    $('#contact, #contactMe' ).on('click', () => {
        $('.aside-contact').addClass('focus');
        let intervalFirstId = setInterval(() => {
            $('.aside-contact').css({
                'transform': 'scale(1.35)',
                'margin-right': '50px',
                'margin-top': '50px',
                'background-color': 'yellow',
            });
        }, 10);
        setTimeout(() => {
            clearInterval(intervalFirstId);
            $('.aside-contact').css({
                'transform': 'scale(1)',
                'margin-right': '0px',
                'margin-top': '0px',
                'background-color': 'rgba(252, 252, 252, 0.932)',
            });
            setTimeout(() => {
                $('.aside-contact').removeClass('focus');
            }, 450);

        }, 3400);

    });

}





navMenu();
navContact();