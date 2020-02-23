let btnLeft = document.querySelector('.slider-left');
let btnRight = document.querySelector('.slider-right');
let left = 0;
let btn = document.getElementById('send');
btnLeft.addEventListener('click', sliderLeft);
btnRight.addEventListener('click', sliderRight);
btn.addEventListener('click', send);


function sliderLeft() {
    let line = document.querySelector('.line');
    left -= 128;
    if (left <= -956) {
        left = 0;
    }
    line.style.left = left + 'px';
};

function sliderRight() {
    let line = document.querySelector('.line');
    if (left <= -128) {
        left += 128;
        line.style.left = left + 'px';
    }
};

function send() {
    let walk = document.querySelector('.walk');
    if (walk.value == 'never') {
        alert('Wrong choice, please try again')
    } else {
        document.querySelector('.full-img').style.display = 'block';
        setTimeout(function() {
            document.querySelector('.full-img').style.display = 'none';
            document.querySelector('.modal').style.display = 'none';
        }, 5000)
    }
};