$(document).ready(function() {
    $('.menu__item').filter('.has-menu').on("click", function() {
        $(this).toggleClass('active');
    });

    $('.menu-item__content').on("mouseleave", function() {
        $('.menu__item').filter('.has-menu').removeClass('active');

    });


    $('.features__item--1').on('mouseover', function() {
        $('.preview__item').attr('src', './images/first.webp');
        // clearInterval(timer);
    });
    $('.features__item--1').on('mouseleave', function() {

    });

    $('.features__item--2').on('mouseover', function() {
        $('.preview__item').attr('src', './images/second.png');
        // clearInterval(timer);
    });

    $('.features__item--2').on('mouseleave', function() {


    });
    $('.features__item--3').on('mouseover', function() {
        $('.preview__item').attr('src', './images/third.webp');
        // clearInterval(timer);
    });
    $('.features__item--3').on('mouseleave', function() {


    });

    // let seconds = 12

    // function interval() {
    //     if (seconds > 0) {
    //         seconds--;
    //         if (seconds == 9) {
    //             $('.preview__item').attr('src', './images/second.png');
    //             $('.features__item--1').removeClass('active');
    //             $('.features__item--2').addClass('active');
    //         } else if (seconds == 6) {
    //             $('.preview__item').attr('src', './images/third.webp');
    //             $('.features__item--2').removeClass('active');
    //             $('.features__item--3').addClass('active');
    //         } else if (seconds == 3) {
    //             $('.preview__item').attr('src', './images/first.webp');
    //             $('.features__item--3').removeClass('active');
    //             $('.features__item--1').addClass('active');
    //             seconds = 15;
    //         }
    //     }
    // }
    // let timer = setInterval(interval, 1000);


});