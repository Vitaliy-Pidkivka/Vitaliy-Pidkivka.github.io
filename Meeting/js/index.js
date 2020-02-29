let btnLeft = document.querySelector('.slider-left');
let btnRight = document.querySelector('.slider-right');
let left = 0;
let btn = document.getElementById('send');
let timer;
btnLeft.addEventListener('click', sliderLeft);
btnLeft.addEventListener('mouseenter', stopSlider);
btnLeft.addEventListener('mouseleave', startSlider);
btnRight.addEventListener('click', sliderRight);
btnRight.addEventListener('mouseenter', stopSlider);
btnRight.addEventListener('mouseleave', startSlider);
btn.addEventListener('click', send);


window.onload = function() {
    autoSlider();
}


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
    if (walk.value == 'Hikolu') {
        alert('Неправильна відпоповідь, попробуй знову ))')
    } else {
        document.querySelector('.full-img').style.display = 'block';
        setTimeout(function() {
            document.querySelector('.full-img').style.display = 'none';
            document.querySelector('.modal').style.display = 'none';
        }, 1500)
    }
};

function autoSlider() {
    timer = setInterval(sliderLeft, 1500)
};

function stopSlider() {
    clearInterval(timer)
};

function startSlider() {
    autoSlider()
};