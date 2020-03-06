let numbersBtn = document.querySelectorAll('.numbers'),
    operationBtn = document.querySelectorAll('.operation'),
    decimalBtns = document.querySelectorAll('.decimal'),
    clearBtns = document.querySelectorAll('.clear_btn'),
    backBtns = document.querySelectorAll('.back'),
    resultBtn = document.querySelector('#result'),
    display = document.querySelectorAll('.display'),
    squaredBtns = document.querySelectorAll('.squared'),
    cubeBtn = document.querySelector('.cube'),
    sqrtBtns = document.querySelectorAll('.sqrt'),
    MemoryCurrentNumber = "0",
    MemoryNewNumber = false,
    MemoryPendingOperation = '';

for (let i = 0; i < numbersBtn.length; i++) {
    let number = numbersBtn[i];
    number.addEventListener('click', function(e) {
        numberPress(e.srcElement.innerHTML)
    });
}
for (let i = 0; i < operationBtn.length; i++) {
    let operation = operationBtn[i];
    operation.addEventListener('click', function(e) {
        operations(e.srcElement.innerHTML)
    });
}
for (let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e) {
        clear(e.srcElement.id)
    });
}
for (let i = 0; i < backBtns.length; i++) {
    let backBtn = backBtns[i];
    backBtn.addEventListener('click', backSpace)
}

for (let i = 0; i < squaredBtns.length; i++) {
    let squaredBtn = squaredBtns[i];
    squaredBtn.addEventListener('click', toSquared)
}

for (let i = 0; i < sqrtBtns.length; i++) {
    let sqrtdBtn = sqrtBtns[i];
    sqrtdBtn.addEventListener('click', toSqrt)
}
for (let i = 0; i < decimalBtns.length; i++) {
    let decimalBtn = decimalBtns[i];
    decimalBtn.addEventListener('click', decimal)
}

cubeBtn.addEventListener('click', toCube);

function numberPress(number) {
    if (MemoryNewNumber) {
        display[0].innerHTML = number;
        display[1].innerHTML = number;
        MemoryNewNumber = false;
    } else {
        if (display[0].innerHTML === '0' || display[1].innerHTML === '0') {
            display[0].innerHTML = number;
            display[1].innerHTML = number;
        } else {
            display[0].innerHTML += number;
            display[1].innerHTML += number;
        }
    }

};

function operations(op) {
    let lolacOperationMemory = display[0].innerHTML || display[1].innerHTML;
    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display[0].innerHTML = MemoryCurrentNumber;
        display[1].innerHTML = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(lolacOperationMemory);
        } else if (MemoryPendingOperation === '×') {
            MemoryCurrentNumber *= parseFloat(lolacOperationMemory);
        } else if (MemoryPendingOperation === '÷') {
            MemoryCurrentNumber /= parseFloat(lolacOperationMemory);
        } else if (MemoryPendingOperation === '−') {
            MemoryCurrentNumber -= parseFloat(lolacOperationMemory);
        } else {
            MemoryCurrentNumber = parseFloat(lolacOperationMemory);
        }

        display[0].innerHTML = MemoryCurrentNumber;
        display[1].innerHTML = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    }
};

function decimal() {
    display.forEach((item) => {
        let localDecimalMemory = item.innerHTML;
        if (MemoryNewNumber) {
            localDecimalMemory = '0.';
            MemoryNewNumber = false;
        } else if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
        item.innerHTML = localDecimalMemory;
    })
};

function clear(id) {
    if (id === 'ce') {
        display[0].innerHTML = '0';
        display[1].innerHTML = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display[0].innerHTML = '0';
        display[1].innerHTML = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
};

function backSpace() {
    display.forEach((item) => {
        let localDecimalMemory = item.innerHTML;
        if (item.innerHTML.length > 1) {
            item.innerHTML = localDecimalMemory.substring(0, localDecimalMemory.length - 1);
        } else if (item.innerHTML.length <= 1) {
            item.innerHTML = '0'
        } else {
            item.innerHtml == '0'
        }
    })
}

function toSquared() {
    display.forEach((item) => {
        let localDecimalMemory = item.innerHTML;
        if (localDecimalMemory != '0') {
            item.innerHTML = Math.pow(localDecimalMemory, 2);
        } else {
            localDecimalMemory = '0';
        }
    })
}

function toCube() {
    display.forEach((item) => {
        let localDecimalMemory = item.innerHTML;
        if (localDecimalMemory != '0') {
            item.innerHTML = Math.pow(localDecimalMemory, 3);
        } else {
            localDecimalMemory = '0';
        }
    })
}

function toSqrt() {
    display.forEach((item) => {
        let localDecimalMemory = item.innerHTML;
        if (localDecimalMemory != '0') {
            item.innerHTML = Math.sqrt(localDecimalMemory);
        } else {
            localDecimalMemory = '0';
        }
    })
}