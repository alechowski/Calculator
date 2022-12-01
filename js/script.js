const input = document.querySelector('.calculator__input-value');
const output = document.querySelector('.calculator__output-result');
const clearBtn = document.querySelector('.clear');
const equalsBtn = document.querySelector('.equals');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const allBtns = document.querySelectorAll('button');

let value = '';
let result;
let firstNumber;
let secondNumber;
let sign;

function removeStyle () {
	allBtns.forEach(function(btn) {
		btn.classList.remove('pushed-btn')
	})
}

function pushingButton () {
	this.classList.add('pushed-btn')
	setTimeout(removeStyle, 150)
}

const addNumbers = (e) => {	
	
	if (e.target.textContent === '.' && output.textContent.includes('.')) {
		return
	} 

	if(e.target.textContent === '.' && (output.textContent === '0' || output.textContent === '')) {
		value = '0'
		value += e.target.textContent
		output.textContent = value
	}else if (value === '' && value !== '0.' && e.target.textContent === '0' ) { 
		return
	}
	else {
		value += e.target.textContent
		output.textContent = value
	}

};

const deleteAll = () => {
	value = '';
	input.textContent = '';
	output.textContent = '0';
	firstNumber = '';
	result ='';
};

const addOperator = (e) => {
	if(value === '0' || value === '') {
		return
	}

	input.textContent = output.textContent

	if(firstNumber == undefined || firstNumber === '') {
		firstNumber = value
	}else {
		firstNumber = result
	}

	output.textContent = ''
	value = ''
	sign = e.target.textContent
	input.textContent += e.target.textContent

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
	
	
	Number.prototype.round = function (decimalPlaces) {
		return +(Math.round(this + "e+" + decimalPlaces) + "e-" + decimalPlaces)
	}

	let x = Number(firstNumber);
	let y = Number(secondNumber);
	
	let xLength = 0
	let yLength = 0

	if (Number.isInteger(x) === false || Number.isInteger(y) === false) {
		xLength = x.toString()
		xLength = xLength.substring(xLength.indexOf('.'))
		xLength = xLength.length - 1

		yLength = y.toString()
		yLength = yLength.substring(yLength.indexOf('.'))
		yLength = yLength.length - 1

	}



	switch (sign) {
		case '+':
			result = x + y;
			result = result.round(xLength + yLength)
			break;
		case '-':
			result = x - y;
			result = result.round(xLength + yLength)
			break;
		case 'x':
			result = x * y;
			result = result.round(xLength + yLength)
			break;
		case '÷':
			result = x / y;
			break;		
			
	}

	output.textContent = result;

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

allBtns.forEach((btn) => {
	btn.addEventListener('click', pushingButton);
})