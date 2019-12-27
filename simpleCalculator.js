let result = document.getElementById('result');
let op = document.getElementsByClassName('op');
let num = document.getElementsByClassName('num');
let special = document.getElementsByClassName('special');
let tempValue1 = 0;
let tempValue2 = 0;
let activeOp = 0;
let specialAction;
let showResult = false;

function doOperation() {
    if(activeOp != 0) {
        console.log('value 1 is ' + tempValue1);
        console.log('value 2 is ' + tempValue2);
        
        if (activeOp == '+') {
            tempValue1 = tempValue1 + tempValue2;
            tempValue2 = 0;
        } else if (activeOp == '-') {
            tempValue1 = tempValue1 - tempValue2;
            tempValue2 = 0;
        } else if (activeOp == 'x') {
            tempValue1 = tempValue1 * tempValue2;
            tempValue2 = 0;
        } else if (activeOp == '/') {
            tempValue1 = tempValue1 / tempValue2;
            tempValue2 = 0;
        } else if (activeOp == '%') {
            tempValue1 = tempValue1 % tempValue2;
            tempValue2 = 0;
        }

        console.log('Result is ' + tempValue1);
    }
    
}

function doSpecial() {
    if (specialAction == 'AC') {
        tempValue1 = 0;
        tempValue2 = 0;
        activeOp = 0;
    } else if (specialAction == '=') {
        doOperation();
        activeOp = 0;
        showResult = true;
    } else if (specialAction == 'Del') {
        if (activeOp == 0 && showResult == false) {
            tempValue1 = Math.floor(tempValue1 / 10);
            console.log('value 1 now is ' + tempValue1);
        } else {
            tempValue2 = Math.floor(tempValue2 / 10);
            console.log('value 2 now is ' + tempValue2);
        }
    }
}

for (let i = 0; i < num.length; i++) {
    num[i].addEventListener('click', function() {
        if (showResult) {
            tempValue1 = 0;
            showResult = false;
        }
        if (activeOp == 0) {
            tempValue1 = (tempValue1 * 10) + parseInt(num[i].textContent);
        } else {
            tempValue2 = (tempValue2 * 10) + parseInt(num[i].textContent);
        }
    })
}

for (let i = 0; i < op.length; i++) {
    op[i].addEventListener('click', function() {
        showResult = false;
        console.log('You pressed' + op[i].textContent);
        doOperation();
        activeOp = op[i].textContent;
    }); 
}

for (let i = 0; i < special.length; i++) {
    special[i].addEventListener('click', function() {
        specialAction = special[i].textContent;
        doSpecial();
    }); 
}