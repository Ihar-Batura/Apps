//Create html elements

const main = document.querySelector('.main');
const calculator = document.createElement('div');

calculator.className = 'calc';
main.appendChild(calculator);
calculator.innerHTML = `
<div class="calc-display">
<input disabled type="text" id="display" value="0" name="" placeholder="000000000000000000" class="calc-display-input">
</div>
<div class="calc-buttons">
<table class="calc-table">
<tr class="calc-buttons-row">
<td>
<button type="button" class="clear-btn btn btn-hover-red" id="ce">ce</button>
</td>
<td>
<button type="button" class="clear-btn btn btn-hover-red" id="c">c</button>
</td>
<td>
<button type="button" class="operator btn btn-hover-orange">/</button>
</td>
<td>
<button type="button" class=" operator btn btn-hover-orange">*</button>
</td>
</tr>
<tr class="calc-buttons-row">
<td>
<button type="button" class="number btn-hover-green btn">7</button>
</td>
<td>
<button type="button" class="number btn-hover-green btn">8</button>
</td>
<td>
<button type="button" class="number btn-hover-green btn">9</button>
</td>
<td>
<button type="button" class="operator btn btn-hover-orange">-</button>
</td>
</tr>
<tr class="calc-buttons-row">
<td>
<button type="button" class="number btn-hover-green btn">4</button>
</td>
<td>
<button type="button" class="number btn-hover-green btn">5</button>
</td>
<td>
<button type="button" class="number btn-hover-green btn">6</button>
</td>
<td>
<button type="button" class="operator btn btn-hover-orange">+</button>
</td>
</tr>
<tr class="calc-buttons-row">
<td>
<button type="button" class="number btn-hover-green btn">1</button>
</td>
<td>
<button type="button" class="number btn-hover-green btn">2</button>
</td>
<td>
<button type="button" class="number btn-hover-green btn">3</button>
</td>
<td rowspan="2">
<button type="button" class="operator btn btn-equal btn-hover-orange" id="result">=</button>
</td>
</tr>
<tr class="calc-buttons-row">
<td colspan="2">
<button type="button" class="number btn-hover-green btn btn-long">0</button>
</td>
<td>
<button type="button" class="btn  btn-hover-orange" id="decimal">.</button>
</td>
</tr>
</table>
</div>
`;

// Find all buttons and etc
const btnsNumbers = document.querySelectorAll('.number');
const btnsOperations = document.querySelectorAll('.operator');
const btnDecimal = document.getElementById('decimal');
const btnsCrear = document.querySelectorAll('.clear-btn');
const display = document.getElementById('display');
let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';

// Add event listeners for buttons
for (let i = 0; i < btnsNumbers.length; i++) {
  let btnNumber = btnsNumbers[i];
  btnNumber.addEventListener('click', (e) => {
    numberPress(e.target.textContent);
  });
}

for (let i = 0; i < btnsOperations.length; i++) {
  let btnOperation = btnsOperations[i];
  btnOperation.addEventListener('click', (e) => {
    operation(e.target.textContent);
  });
}

for (let i = 0; i < btnsCrear.length; i++) {
  let btnCrear = btnsCrear[i];
  btnCrear.addEventListener('click', (e) => {
    clearResult(e.target.id);
  });
}

btnDecimal.addEventListener('click', addDot);

function numberPress(number) {
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operation(oper) {
  let displayNumberValue = display.value;
  if (memoryNewNumber && memoryPendingOperation !== '=') {
    display.value = memoryCurrentNumber;
  } else {
    memoryNewNumber = true;
    if (memoryPendingOperation === '+') {
      memoryCurrentNumber += parseFloat(displayNumberValue);
    } else if (memoryPendingOperation === '-') {
      memoryCurrentNumber -= parseFloat(displayNumberValue);
    } else if (memoryPendingOperation === '*') {
      memoryCurrentNumber *= parseFloat(displayNumberValue);
    } else if (memoryPendingOperation === '/') {
      memoryCurrentNumber /= parseFloat(displayNumberValue);
    } else {
      memoryCurrentNumber = parseFloat(displayNumberValue);
    }
  }
  display.value = memoryCurrentNumber;
  memoryPendingOperation = oper;
}

function addDot(argument) {
  let decimalMemory = display.value;
  if (memoryNewNumber) {
    decimalMemory = '0.';
    memoryNewNumber = false;
  } else {
    if (decimalMemory.indexOf('.') === -1) {
      decimalMemory += '.';
    }
  }
  display.value = decimalMemory;
}

function clearResult(id) {
  console.log(id);
  if (id === 'ce') {
    display.value = '0';
    memoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    memoryNewNumber = true;
    memoryCurrentNumber = 0;
    memoryPendingOperation = '';
  }
}
