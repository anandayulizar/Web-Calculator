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

const result = document.querySelector('#result span');
const nums  = Array.from(document.getElementsByClassName('num'));
const ops  = Array.from(document.getElementsByClassName('op'));
const specials  = Array.from(document.getElementsByClassName('special'));
let display = '';
let numStack = new Stack();
let opStack = new Stack();

function addToDisplay(item) {
    result.textContent += item;
}

function updateDisplay(item) {
    result.textContent = item;
}

function emptyDisplay() {
    result.textContent = '';
}

function doSpecial(item) {
    if (item == '=') {
        evaluate();
    } else if (item == 'AC') {
        emptyDisplay();
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
    display = result.textContent;
    while (i < display.length) {
        if (!isNaN(display[i])) {
            let startIdx = i++;
            while (!isNaN(display[i])) {
                i++;
            }
            let tempNum = parseInt(display.slice(startIdx, i));
            if (highPrio) {
                let prevNum = numStack.pop();
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
        let nextNum = numStack.pop();
        let prevNum = numStack.pop();
        let op = opStack.pop();

        numStack.push(doOperation(op, prevNum, nextNum));
    }

    updateDisplay
    (numStack.peek());
}

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

