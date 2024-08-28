const keyboardContainer = document.querySelector('.keyboard-container');

//создаем дисплей для вывода тескта
const display = document.createElement('textarea');
display.className = 'keyboard-display';
display.value = '';
keyboardContainer.appendChild(display);

//создаем элементы для клавиатуры
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
keyboardContainer.appendChild(keyboard);

// контейнер для букв и символов
const keyboardKeys = document.createElement('div');
keyboardKeys.className = 'keyboard-keys';
keyboard.appendChild(keyboardKeys);

// перечисление всех элементов на клавиатуре
const keyLayout = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'backspace',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'caps',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'enter',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '?',
  'space',
];

// функция для вставки в кнопку картинки спецсимвола
const createIconHTML = (icon_name) => {
  return `<i class="material-icons">${icon_name}</i>`;
};

// проходимся по списку и отрисовываем все елементы клавиатуры + навешиваем на них  слушатели
keyLayout.forEach((key) => {
  const keyElement = document.createElement('button');
  const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1; //элементы после которых идет перенос строки
  keyElement.setAttribute('type', 'button');
  keyElement.className = 'keyboard-key';
  if (key === 'backspace') {
    keyElement.classList.add('keyboard-key__wide');
    keyElement.innerHTML = createIconHTML('backspace');

    keyElement.addEventListener('click', () => {
      display.value = display.value.substring(0, display.value.length - 1);
    });
  } else if (key === 'caps') {
    keyElement.classList.add('keyboard-key__wide', 'keyboard-key__activatable');
    keyElement.innerHTML = createIconHTML('keyboard_capslock');

    keyElement.addEventListener('click', () => {
      toggleCapsLock();
      keyElement.classList.toggle('keyboard-key__active');
    });
  } else if (key === 'enter') {
    keyElement.classList.add('keyboard-key__wide');
    keyElement.innerHTML = createIconHTML('keyboard_return');

    keyElement.addEventListener('click', () => {
      display.value += '\n';
    });
  } else if (key === 'space') {
    keyElement.classList.add('keyboard-key__extra-wide');
    keyElement.innerHTML = createIconHTML('space_bar');

    keyElement.addEventListener('click', () => {
      display.value += ' ';
    });
  } else {
    keyElement.textContent = key.toLowerCase();
    keyElement.addEventListener('click', () => {
      display.value += keyElement.textContent;
    });
  }

  keyboardKeys.appendChild(keyElement);

  if (insertLineBreak) {
    keyboardKeys.appendChild(document.createElement('br')); //перенос строки
  }
});

let capsLock = false; // флаг нажатия капслок
function toggleCapsLock() {
  //функция меняет буквы в верхний и нижний регистр
  capsLock = !capsLock;
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    if (button.childElementCount === 0) {
      button.textContent =
        capsLock === true
          ? button.textContent.toUpperCase()
          : button.textContent.toLowerCase();
    }
  });
}

// слушатель для ввода символов с помощью клавиатуры
document.addEventListener('keydown', function (event) {
  const symbol = event.code;

  if (event.key === 'Backspace') {
    display.value = display.value.substring(0, display.value.length - 1);
  } else if (event.key === 'CapsLock') {
    toggleCapsLock();
  } else if (event.key === 'Enter') {
    display.value += '\n';
  } else if (event.key === ' ') {
    display.value += ' ';
  } else if (symbol.includes('Digit')) {
    display.value += event.key;
  } else if (symbol.includes('Key')) {
    display.value += event.key;
  } else if (event.key === '.' || event.key === ',' || event.key === '?') {
    display.value += event.key;
  }
});
