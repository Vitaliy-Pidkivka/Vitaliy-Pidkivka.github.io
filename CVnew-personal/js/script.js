'use strict';
const navBtn = $('#navBtn'),
    navBtnLabel = $('#navBtnLabel'),
    nav = $('.section-menu-nav__text');

console.dir(navBtn)

if ($(window).width() < 575) {
    $('#navBtn, .section-menu-nav').on('mouseover', () => {

        for (let i = 0; i < nav.length; i++) {
            nav[i].style.display = 'flex';
            $('.section-menu-nav').css({
                'margin-top': '15px',
            }).fadeIn(600);
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