const input = document.querySelector('.calculator__input-value');
const output = document.querySelector('.calculator__output-result');
const clearBtn = document.querySelector('.clear');
const equalsBtn = document.querySelector('.equals');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');

let value = '';

const addNumbers = (e) => {
	value += e.target.textContent;
	input.textContent = value;
	output.textContent = value;
};

const deleteAll = () => {
	value = '';
	input.textContent = value;
	output.textContent = '0';
};

const addOperator = () => {
    
};

numberBtns.forEach((number) => {
	number.addEventListener('click', addNumbers);
});

operatorBtns.forEach((sign) => {
	sign.addEventListener('click', addOperator);
});

clearBtn.addEventListener('click', deleteAll);
