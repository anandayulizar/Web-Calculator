// Class declaration
class Stack {
    constructor() {
        this.items = [];
    }

    isEmpty() {
        return this.items.length == 0;
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (!this.isEmpty()) {
            return this.items.pop();
        }
    }

    peek() {
        if (!this.isEmpty()) {
            return this.items[this.items.length - 1];
        }
    }
}

// Variable declaration
const result = document.querySelector('#result span');
const nums  = Array.from(document.getElementsByClassName('num'));
const ops  = Array.from(document.getElementsByClassName('op'));
const specials  = Array.from(document.getElementsByClassName('special'));
let display = '';
let numStack = new Stack();
let opStack = new Stack();

// Function Declaration
function addToDisplay(item) {
    result.textContent += item;
}

function updateDisplay(item) {
    result.textContent = item;
}

function emptyDisplay() {
    result.textContent = '';
}

function delDisplay() {
    let currentDisplay = result.textContent;
    updateDisplay(currentDisplay.slice(0, currentDisplay.length - 1));
}

function doSpecial(item) {
    if (item == '=') {
        evaluate();
    } else if (item == 'AC') {
        emptyDisplay();
    } else if (item =='Del') {
        delDisplay();   
    }
}

function checkPriority(op) {
    if (op == '*' || op == '/') {
        return 2;
    } else {
        return 1;
    }
}

function doOperation(op, prev, next) {
    if (op == '+') {
        return prev + next;
    } else if (op == '-') {
        return prev - next;
    } else if (op == '*') {
        return prev * next;
    } else {
        return prev / next;
    }
}

function evaluate() {
    let i = 0;
    let highPrio = false;
    let startIdx, tempNum, prevNum, op, period;
    display = result.textContent;
    while (i < display.length) {
        if (!isNaN(display[i])) {
            period = false;
            startIdx = i++;
            while (!isNaN(display[i]) || (display[i] == '.' && !period)) {
                i++;
                if (display[i] == '.') {
                    period = true;
                }
            }
            tempNum = parseFloat(display.slice(startIdx, i));
            if (highPrio) {
                prevNum = numStack.pop();
                tempNum = doOperation(opStack.pop(), prevNum, tempNum);
                highPrio = false;
            }
            numStack.push(tempNum);
            i--;
        } else {
            if (checkPriority(display[i]) == 2) {
                highPrio = true;
            }
            opStack.push(display[i]);
        }
        i++;
    }

    while (!opStack.isEmpty()) {
        tempNum = numStack.pop();
        prevNum = numStack.pop();
        op = opStack.pop();

        numStack.push(doOperation(op, prevNum, tempNum));
    }

    updateDisplay
    (numStack.pop());
}

// Event Handler
for (let num of nums) {
    num.addEventListener('click', function() {
        addToDisplay(this.textContent);
    });
}

for (let op of ops) {
    op.addEventListener('click', function() {
        addToDisplay(this.textContent);
    })
}

for (let special of specials) {
    special.addEventListener('click', function() {
        doSpecial(special.textContent);
    })
}