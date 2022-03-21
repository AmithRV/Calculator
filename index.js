const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const screen = calculator.querySelector('.calculator__output');
const result = calculator.querySelector('.calculator__key--enter');

class mathError {
    constructor() {
        screen.innerHTML = 'Math error';
        setTimeout(() => screen.innerHTML = ' ', 800);
    }
}

class syntaxError {
    constructor() {
        screen.innerHTML = 'Syntax Error';
        setTimeout(() => screen.innerHTML = ' ', 800);
    }
}

class evaluate {
    constructor() {
        screen.innerHTML = eval(screen.innerHTML);
        if (String(screen.innerHTML) == 'NaN') {
            new mathError();
        }
    }
}

class operations {
    constructor(event) {
        if (event.target.matches('button')) {
            if (event.target.innerHTML === '=') {
                try {
                    new evaluate();
                }
                catch (error) {
                    new syntaxError();
                }
            }
            else if (event.target.innerHTML === 'C') {
                screen.innerHTML = ' ';
            }
            else {
                screen.innerHTML += event.target.innerHTML;
            }
        }
    }
}

keys.addEventListener('click', (event) => {
    new operations(event);
})

document.addEventListener('keydown', (event) => {
    class colorChange {
        constructor(key) {
            let color = document.getElementById(key).style.backgroundColor;
            setTimeout(() => document.getElementById(key).style.backgroundColor = color, 100);
            document.getElementById(key).style.backgroundColor = 'rgb(250, 192, 150)';
        }
    }

    if (event.key === '=' || event.key === 'Enter') {
        new colorChange('=')
        try {
            if (typeof (eval(screen.innerHTML)) != 'undefined') {
                new evaluate();
            }
        }
        catch (error) {
            new syntaxError();
        }
    }
    else if (event.key === 'c') {
        new colorChange(event.key);
        screen.innerHTML = ' ';
    }
    else if (event.key === 'Backspace') {
        let text = screen.innerHTML;
        text = text.replace(text[text.length - 1], '');
        screen.innerHTML = text;
    }
    else {
        const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '.'];
        if (arr.includes(event.key, 0) === true) {      //Start the search at position 0
            new colorChange(event.key);
            screen.innerHTML += event.key;
        }
    }
})