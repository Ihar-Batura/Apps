// точка входа
const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
const searchInput = document.querySelector('.search');
const result = document.querySelector('.result');
const resultText = document.querySelector('.result-text');

//получаем массив с городами и штатами
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => cities.push(...data));
console.log(cities);

// фильтруем города по слову в инпуте
function findSearch(wordSearch, cities) {
  return cities.filter(
    (place) =>
      place.city.includes(wordSearch) || place.state.includes(wordSearch)
  );
}

function displaySearch() {
  const searchArray = findSearch(this.value, cities);
  // очищает результат перед новым поиском
  result.innerHTML = '';
  resultText.textContent = 'Result:';

  // при удалении запроса удаляет последний результат поиска
  if (this.value === '' || searchArray.length < 1) {
    resultText.textContent = 'there is not a single result';
    return;
  }

  // проходится по массиву с найдеными результатами и отприсовывает их
  searchArray.map((place) => {
    const resList = document.createElement('li');
    resList.innerHTML = `
  <span class="name">${place.city}, ${place.state}</span>
  <span class="name">${place.population}</span>
  `;
    result.appendChild(resList);
  });
}

// слушатель изменения ввода в инпут
searchInput.addEventListener('change', displaySearch);
// слушатель изменения ввода в инпут каждый символ
searchInput.addEventListener('keyup', displaySearch);
