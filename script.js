const billAmount = document.getElementById('bill-amount');
const customTip = document.getElementById('custom-tip');
const customTipGroup = document.getElementById('custom-tip-group');
const resetBtn = document.getElementById('reset-btn');
const calculateBtn = document.getElementById('calculate-btn');
const result = document.getElementById('result');
const tipOptions = document.querySelectorAll('.tip-option');
const peopleInput = document.getElementById('people');
const currencyButtons = document.querySelectorAll('.currency-toggle button');

let selectedTip = 15;
let selectedCurrency = '£';

tipOptions.forEach(option => {
    option.addEventListener('click', () => {
        tipOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        if (option.dataset.tip === 'custom') {
            customTipGroup.style.display = 'block';
            selectedTip = parseFloat(customTip.value) || 0;
        } else {
            customTipGroup.style.display = 'none';
            selectedTip = parseFloat(option.dataset.tip);
        }
    });
});

customTip.addEventListener('input', () => {
    selectedTip = parseFloat(customTip.value) || 0;
});

currencyButtons.forEach(button => {
    button.addEventListener('click', () => {
        currencyButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedCurrency = button.textContent;
        calculateTip();
    });
});

calculateBtn.addEventListener('click', calculateTip);
resetBtn.addEventListener('click', resetCalculator);

function calculateTip() {
    const bill = parseFloat(billAmount.value);
    const people = parseInt(peopleInput.value) || 1;

    if (isNaN(bill) || bill <= 0) {
        result.textContent = 'Please enter a valid bill amount';
        return;
    }

    const tipAmount = (bill * selectedTip) / 100;
    const totalAmount = bill + tipAmount;
    const perPersonAmount = totalAmount / people;

    result.innerHTML = `
        Tip: ${selectedCurrency}${tipAmount.toFixed(2)}<br>
        Total: ${selectedCurrency}${totalAmount.toFixed(2)}<br>
        Per Person: ${selectedCurrency}${perPersonAmount.toFixed(2)}
    `;

    animateResult();
}

function resetCalculator() {
    billAmount.value = '';
    customTip.value = '';
    peopleInput.value = '1';
    result.textContent = '';
    tipOptions.forEach(opt => opt.classList.remove('active'));
    tipOptions[1].classList.add('active'); 
    selectedTip = 15;
    customTipGroup.style.display = 'none';
}

function animateResult() {
    gsap.from("#result", {
        duration: 0.5,
        opacity: 0,
        y: 20,
        ease: "power2.out"
    });
}


tipOptions[1].classList.add('active');


document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        calculateTip();
    } else if (event.key === 'r' || event.key === 'R') {
        resetCalculator();
    }
});