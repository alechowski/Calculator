const input = document.querySelector('.calculator__input-value');
const output = document.querySelector('.calculator__output-result');
const clearBtn = document.querySelector('.clear');
const equalsBtn = document.querySelector('.equals');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');

let value = '';
let result = '';
let firstNumber;
let secondNumber;
let sign;

const addNumbers = (e) => {
	value += e.target.textContent;
	input.textContent = value;
	if (output.textContent === '0') {
		output.textContent = '';
		output.textContent += e.target.textContent;
	} else {
		output.textContent += e.target.textContent;
	}
};

const deleteAll = () => {
	value = '';
	input.textContent = value;
	output.textContent = '0';
};

const addOperator = (e) => {
	if (input.textContent === '' && e.target.textContent === '-') {
		value = '-';
		output.textContent = value;
	} else if (input.textContent === '') {
		return;
	} else if (input.textContent.lastIndexOf(' ') !== -1) {
		return;
	} else {
		firstNumber = output.textContent;
		output.textContent = '';
		value += ` ${e.target.textContent} `;
		input.textContent = value;
		sign = e.target.textContent;
	}
};

const expressionResult = () => {
	if (
		input.textContent === '' ||
		output.textContent === '' ||
		output.textContent === '0'
	) {
		return;
	}

	secondNumber = output.textContent;
	let x = Number(firstNumber);
	let y = Number(secondNumber);

	switch (sign) {
		case '+':
			result = x + y;
			break;
		case '-':
			result = x - y;
			break;
		case 'x':
			result = x * y;
			break;
		case '÷':
			result = x / y;
			break;
	}

	output.textContent = result;
	value = '';
	firstNumber = '';
	secondNumber = '';
	if (output.textContent === result) {
		return;
	}
};

numberBtns.forEach((number) => {
	number.addEventListener('click', addNumbers);
});

operatorBtns.forEach((sign) => {
	sign.addEventListener('click', addOperator);
});

clearBtn.addEventListener('click', deleteAll);

equalsBtn.addEventListener('click', expressionResult);
