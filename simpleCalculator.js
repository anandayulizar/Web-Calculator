let result = document.querySelector('#result span:nth-child(2)');
let temp = document.querySelector('#result span:nth-child(1)');
let op = document.getElementsByClassName('op');
let num = document.getElementsByClassName('num');
let special = document.getElementsByClassName('special');
let tempValue1 = 0;
let tempValue2 = 0;
let activeOp = 0;
let specialAction;
let showResult = false;

function doOperation() {
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

        result.innerHTML = tempValue1;
}

function doSpecial() {
    if (specialAction == 'AC') {
        tempValue1 = 0;
        tempValue2 = 0;
        activeOp = 0;
        result.innerHTML = 0;
        temp.innerHTML = '';
    } else if (specialAction == '=') {
        doOperation();
        activeOp = 0;
        showResult = true;
        temp.innerHTML = '';
    } else if (specialAction == 'Del') {
        if (activeOp == 0 && showResult == false) {
            tempValue1 = Math.floor(tempValue1 / 10);
            result.innerHTML = tempValue1;
        } else {
            tempValue2 = Math.floor(tempValue2 / 10);
            temp.innerHTML = ''+tempValue1+' '+activeOp+'';
            result.innerHTML = tempValue2;
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
            result.innerHTML = ''+tempValue1+'';
        } else {
            tempValue2 = (tempValue2 * 10) + parseInt(num[i].textContent);
            result.innerHTML = ''+tempValue2+'';
        }
    })
}

for (let i = 0; i < op.length; i++) {
    op[i].addEventListener('click', function() {
        showResult = false;
        if (activeOp != 0) {
            doOperation();
        }
        
        activeOp = op[i].textContent;
        temp.innerHTML = ''+tempValue1+' '+activeOp+'';
        result.innerHTML = '0';
    }); 
}

for (let i = 0; i < special.length; i++) {
    special[i].addEventListener('click', function() {
        specialAction = special[i].textContent;
        doSpecial();
    }); 
}