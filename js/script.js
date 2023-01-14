const input = document.querySelector('.calculator__input-value');
const output = document.querySelector('.calculator__output-result');
const clearBtn = document.querySelector('.clear');
const equalsBtn = document.querySelector('.equals');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const percentBtn = document.querySelector('.percent');
const rootBtn = document.querySelector('.root');
const switchBtn = document.querySelector('.switch');
const allBtns = document.querySelectorAll('button');

let value = '';
let result;
let firstNumber;
let secondNumber;
let sign;
let previousNumber;

function removeStyle() {
	allBtns.forEach(function (btn) {
		btn.classList.remove('pushed-btn');
	});
}

function pushingButton() {
	this.classList.add('pushed-btn');
	setTimeout(removeStyle, 150);
}

const checkNumber = () => {
	if (input.textContent.includes(sign)) {
		secondNumber = value;
	} else {
		firstNumber = value;
	}
};

function addNumbers(e) {
	if (firstNumber === result && previousNumber === secondNumber) {
		deleteAll();
	}

	if (e.target.textContent === '.' && output.textContent.includes('.')) {
		return;
	}

	if (
		e.target.textContent === '.' &&
		(output.textContent === '0' || output.textContent === '')
	) {
		value = '0';
		value += e.target.textContent;
		output.textContent = value;
	} else if (value === '' && value !== '0.' && e.target.textContent === '0') {
		return;
	} else {
		value += e.target.textContent;
		output.textContent = value;
	}

	checkNumber();
}

const deleteAll = () => {
	value = '';
	input.textContent = '';
	output.textContent = '0';
	firstNumber = '';
	secondNumber = '';
	result = '';
};

const calcRoot = () => {
	if (
		(firstNumber !== undefined || firstNumber !== '') &&
		(secondNumber === undefined || secondNumber === '')
	) {
		let a = Number(firstNumber);
		a = Math.sqrt(a);
		root = [];
		root.push('√', firstNumber);
		input.textContent = '';
		input.textContent += root.join('');
		output.textContent = a;
		firstNumber = a;
	} else {
		let a = Number(secondNumber);
		a = Math.sqrt(a);
		root = [];
		root.push('√', secondNumber);
		input.textContent = '';
		input.textContent += root.join('');
		output.textContent = a;
		secondNumber = a;
	}
};

const calcPercent = () => {
	if (secondNumber !== undefined && secondNumber !== '') {
		let a = Number(secondNumber);
		a = (firstNumber * a) / 100;
		output.textContent = a;
		secondNumber = a;
	} else {
		deleteAll();
	}
};

const signChange = () => {
	if (
		(firstNumber !== undefined || firstNumber !== '') &&
		(secondNumber === undefined || secondNumber === '')
	) {
		let a = Number(firstNumber);
		a = a * -1;
		output.textContent = a;
		input.textContent = output.textContent;
		firstNumber = output.textContent;
	} else {
		let a = Number(secondNumber);
		a = a * -1;
		output.textContent = a;
		input.textContent = output.textContent;
		secondNumber = output.textContent;
	}
};

const addOperator = (e) => {
	if (value === '0' || value === '') {
		return;
	}

	if (
		firstNumber !== '' &&
		firstNumber !== undefined &&
		secondNumber !== '' &&
		secondNumber !== undefined
	) {
		expressionResult();
		previousNumber = ''
	}

	value = '';
	sign = e.target.textContent;
	input.textContent = output.textContent;

	if (input.textContent.includes(sign)) {
		return;
	} else {
		input.textContent += ` ${e.target.textContent} `;
	}
};

const showEquation = (x, y, sign) => {
	input.textContent = `${x} ${sign} ${y} =`;
};

const expressionResult = () => {
	if (
		input.textContent === '' ||
		output.textContent === '' ||
		output.textContent === '0'
	) {
		return;
	}

	Number.prototype.round = function (decimalPlaces) {
		return +(Math.round(this + 'e+' + decimalPlaces) + 'e-' + decimalPlaces);
	};

	let x = Number(firstNumber);
	let y = Number(secondNumber);

	let xLength = 0;
	let yLength = 0;

	if (Number.isInteger(x) === false || Number.isInteger(y) === false) {
		xLength = x.toString();
		xLength = xLength.substring(xLength.indexOf('.'));
		xLength = xLength.length - 1;

		yLength = y.toString();
		yLength = yLength.substring(yLength.indexOf('.'));
		yLength = yLength.length - 1;
	}

	switch (sign) {
		case '+':
			result = x + y;
			result = result.round(xLength + yLength);
			showEquation(x, y, sign);
			break;
		case '-':
			result = x - y;
			result = result.round(xLength + yLength);
			showEquation(x, y, sign);
			break;
		case 'x':
			result = x * y;
			result = result.round(xLength + yLength);
			showEquation(x, y, sign);
			break;
		case '÷':
			result = x / y;
			showEquation(x, y, sign);
			break;
	}

	output.textContent = result;
	firstNumber = result;
	previousNumber = secondNumber;
};

numberBtns.forEach((number) => {
	number.addEventListener('click', addNumbers);
});

operatorBtns.forEach((sign) => {
	sign.addEventListener('click', addOperator);
});

clearBtn.addEventListener('click', deleteAll);

equalsBtn.addEventListener('click', expressionResult);

allBtns.forEach((btn) => {
	btn.addEventListener('click', pushingButton);
});

percentBtn.addEventListener('click', calcPercent);
rootBtn.addEventListener('click', calcRoot);
switchBtn.addEventListener('click', signChange);
