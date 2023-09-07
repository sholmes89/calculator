const buttons = document.querySelectorAll('.btn');
const inputScreen = document.querySelector('.screen-main');
const subScreen = document.querySelector('.screen-sub')
const clearButton = document.querySelector('.btn-clear')
const opButtons = document.querySelectorAll('.btn-op')

let display = '0';

inputScreen.innerHTML = display;

let firstValue = null;
let operator = null;

const updateInput = (x) => {
    if (display === '0') {
        display = x;
    } else {
        display = display.concat(x)
    }
    inputScreen.innerHTML = display
}

const reset = () => {
    display = '0';
    operator = null;
    firstValue = null;
    subScreen.innerHTML = ''
    inputScreen.innerHTML = display;
}

clearButton.addEventListener('click', (e) => {
    e.preventDefault(e);
    reset()
})

const operate = (first, second, op) => {
    switch(op) {
        case '+':
            return parseFloat(first) + parseFloat(second);
            break;
        case '-':
            return parseFloat(first) - parseFloat(second);
            break;
        case '/':
            if (first === '0' && second === '0') {
                return 'fool'
            }
            return parseFloat(first) / parseFloat(second);
            break;
        case '*':
            return parseFloat(first) * parseFloat(second);
            break;
        default: 
        return 0    
    }
}

const handleEvents = (button) => {
    button.classList.add('btn-active')
    //checks to see if button is a number
    let value = button.getAttribute('data-key')
    if (button.classList.contains('btn-num')) {
        updateInput(value)
    }
    if (button.classList.contains('btn-op')) {
        if (!operator) {
            firstValue = display;
            display = '0'
            operator = value;
            inputScreen.innerHTML = display
            subScreen.innerHTML = firstValue + ' ' + operator
        } else {
            display = operate(firstValue, display, operator).toString()
            if (display === 'fool') {
                alert(display)
                reset()
            } else {
                firstValue = display
                subScreen.innerHTML = display + ' ' + operator
                operator = value;
                display = '0'
                inputScreen.innerHTML = display
            }
        }
    }
    if (button.classList.contains('btn-equals')) {
        display = operate(firstValue, display, operator).toString()
        if (display === 'fool') {
            alert(display)
            reset()
        } else {
            operator = null;
            inputScreen.innerHTML = display;
            subScreen.innerHTML = ''
        }
    }
    if (button.classList.contains('btn-pm')) {
        if (display !== '0') {
            if (display > 0) {
                display = '-'.concat(display)
            } else {
                display = display.slice(1)
            }
            inputScreen.innerHTML = display;
        }
    }
    if (button.classList.contains('btn-dec')) {
        display = display.concat(value)
        inputScreen.innerHTML = display
    }
    if (button.classList.contains('btn-del')) {
        if (display.length > 1 ) {
            display = display.slice(0, -1)
        } else {
            display = '0'
        }
        inputScreen.innerHTML = display;
    }
}


buttons.forEach((button) => button.addEventListener('click', (e) => {
    e.preventDefault()
    handleEvents(button)
 }))

buttons.forEach((button) => button.addEventListener('transitionend', (e) => {
    e.preventDefault()
    button.classList.remove('btn-active')
}))

window.addEventListener('keydown', (e) => {
    e.preventDefault()
    let key = e.key;
    key === 'Enter' ? key = '=' : null;  
    let btn = document.querySelector(`.btn[data-key="${key}"]`)
    if (btn) {
        handleEvents(btn)
    }
})