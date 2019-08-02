let numbersBtn = $('.numbers'),
    operationBtn = $('.operation'),
    decimalBtn = $('#decimal'),
    clearBtns = $('.clear_btn'),
    backBtn = $('#back'),
    resultBtn = $('#result'),
    display = document.getElementById('display'),
    MemoryCurrentNumber = "0",
    MemoryNewNumber = false,
    MemoryPendingOperation = '';


for (let i = 0; i < numbersBtn.length; i++) {
    let number = numbersBtn[i];
    number.addEventListener('click', function (e) {
        numberPress(e.srcElement.innerHTML)
    });
}
for (let i = 0; i < operationBtn.length; i++) {
    let operation = operationBtn[i];
    operation.addEventListener('click', function (e) {
        operations(e.srcElement.innerHTML)
    });
}
for (let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.srcElement.id)
    });
}
$('#decimal').on('click', decimal);
$('#back').on('click', backSpace)


function numberPress(number) {
    if (MemoryNewNumber) {
        display.innerHTML = number;
        MemoryNewNumber = false;
    } else {
        if (display.innerHTML === '0') {
            display.innerHTML = number;
        } else {
            display.innerHTML += number;
        }
    }

};

function operations(op) {
    let lolacOperationMemory = display.innerHTML;
    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.innerHTML = MemoryCurrentNumber;
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

        display.innerHTML = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    }
};

function decimal() {
    let localDecimalMemory = display.innerHTML;
    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
    };
    display.innerHTML = localDecimalMemory;
};


function clear(id) {
    if (id === 'ce') {
        display.innerHTML = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display.innerHTML = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
};

function backSpace() {
    let localDecimalMemory = display.innerHTML;
    if (display.innerHTML.length != '1') {
        display.innerHTML = localDecimalMemory.substring(0, localDecimalMemory.length - 1);
    } else if (display.innerHTML.length = '1') {
        localDecimalMemory == '0';
        display.innerHTML = localDecimalMemory;
    }
}