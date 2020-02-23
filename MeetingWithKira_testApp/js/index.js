// let m = [];
// let m1 = ['black', 'yellow', 'red'];
// let i1 = document.getElementById('i1');
// i1.focus();

// function masOut() {
//     let p = document.getElementById('out');
//     let str = '';
//     let cookieStr = '';
//     for (let i = 0; i < m1.length; i++) {
//         str += i + ' -- ' + m1[i] + "<br>";
//     }
//     p.innerHTML = str;

// };
// masOut();

// function p1() {
//     let i1Value = i1.value;
//     if (i1Value == '' || i1Value == null) {
//         alert('Enter your value');
//         i1.focus();
//     } else if (m1.length > 5) {
//         alert('Too much elements, please delete multiple elements');
//         let btn = document.createElement('button');
//         btn.innerHTML = 'Delete elements';
//         btn.setAttribute('onclick', 'p3()');
//         btn.setAttribute('id', 'btn');
//         if (!document.getElementById('btn')) {
//             document.querySelector('button:last-of-type').insertAdjacentElement('afterEnd', btn);
//         }
//         btn.addEventListener('click', remove);

//     } else {
//         m1.push(i1Value);
//         masOut();
//         i1.value = '';
//         i1.focus();
//     }
// };

// function p2() {
//     if (m1.length == 0) {
//         alert('Nothing to pop, enter some values');
//         i1.focus();
//     }
//     m1.pop();
//     i1.focus();
//     masOut();
// };

// function p3() {
//     m1.length = 0;
//     masOut();
// };
// let remove = (e) => {
//     e.target.remove()
//     i1.value = '';
//     i1.focus();
// };




/////////////////////////////////////////


let btnLeft = document.querySelector('.slider-left');
let btnRight = document.querySelector('.slider-right');
let left = 0;
let right = 0;
btnLeft.addEventListener('click', sliderLeft);
btnRight.addEventListener('click', sliderRight);


function sliderLeft() {
    let line = document.querySelector('.line');
    left -= 128;
    if (left <= -956) {
        left = -896;
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


let btn = document.getElementById('send');
btn.addEventListener('click', send);

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