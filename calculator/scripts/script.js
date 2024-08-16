document.addEventListener('DOMContentLoaded', function() {
    const screen = document.getElementById('calculator-screen');
    let currentInput = '';
    let previousInput = '';
    let operation = null;

    function updateScreen() {
        screen.innerText = currentInput || previousInput || '0';
    }

    function handleNumber(number) {
        if (currentInput.length < 10) {
            currentInput += number;
        }
        updateScreen();
    }

    function handleOperation(op) {
        if (currentInput === '') return;
        if (previousInput !== '') calculate();
        operation = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operation = null;
        previousInput = '';
        updateScreen();
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operation = null;
        updateScreen();
    }

    function deleteLast() {
        currentInput = currentInput.slice(0, -1);
        updateScreen();
    }

    function addDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateScreen();
    }

    document.querySelector('.calculator-buttons').addEventListener('click', function(e) {
        const target = e.target;
        const action = target.getAttribute('data-action');
        const value = target.innerText;

        switch (action) {
            case 'number':
                handleNumber(value);
                break;
            case 'operation':
                handleOperation(value);
                break;
            case 'equals':
                calculate();
                break;
            case 'clear':
                clear();
                break;
            case 'delete':
                deleteLast();
                break;
            case 'decimal':
                addDecimal();
                break;
        }
    });
});
