const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []; // если в локалсторадж есть значения то они будут подгружены, если нет то будет пустой массив

//функция для добавление блюд из формы
function addItem(e) {
  e.preventDefault();
  const dish = document.querySelector('.dish').value;
  const item = {
    text: dish,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items)); // сохраняем в локалсторадж значения
  this.reset(); // сбрасывает значение введеное в форму
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
    <li>
    <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? 'checked' : ''
      }>
    <label for="item${i}">${plate.text}</label>
    </li>
    `;
    })
    .join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) {
    return;
  }
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done; // flag true - false
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList); // при перезагрузке страницы подтягивает данные из локалсторадж в форму
