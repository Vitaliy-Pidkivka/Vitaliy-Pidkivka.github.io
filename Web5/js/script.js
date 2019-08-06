let numbersBtn = $('.numbers'),
    operationBtn = $('.operation'),
    decimalBtn = $('#decimal'),
    clearBtns = $('.clear_btn'),
    backBtn = $('#back'),
    resultBtn = $('#result'),
    display = $('.display'),
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
    let localDecimalMemory = display[0].innerHTML || display[1].innerHTML;
    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
    };
    display[0].innerHTML = localDecimalMemory;
    display[1].innerHTML = localDecimalMemory;
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
    let localDecimalMemory = display[0].innerHTML || display[1].innerHTML;
    if (display[0].innerHTML.length != '1' || display[1].innerHTML.length != '1') {
        display[0].innerHTML = localDecimalMemory.substring(0, localDecimalMemory.length - 1);
        display[1].innerHTML = localDecimalMemory.substring(0, localDecimalMemory.length - 1);
    } else if (display.innerHTML.length = '1') {
        localDecimalMemory == '0';
        display[0].innerHTML = localDecimalMemory;
        display[1].innerHTML = localDecimalMemory;
    }
}