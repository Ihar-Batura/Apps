//строки префиксов для использования нужных объектов в Chrome и ссылки на объекты без префиксов для Firefox.
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

//определяет экземпляр объекта распознавания речи для управления записью приложения.
const recognition = new SpeechRecognition();

recognition.lang = 'en-US'; //возвращает и устанавливает язык текущего SpeechRecognition.
recognition.interimResults = true; // управляет тем, следует ли возвращать промежуточные результаты сказанного

const btnRecord = document.querySelector('.btn');
let record = false; // flag

const letter = document.querySelector('.letter');

function recordSentence() {
  record = !record;
  if (record) {
    recognition.start(); //сервис распознавания речи начинал работу
    btnRecord.classList.add('active');
  }
}

btnRecord.addEventListener('click', recordSentence);

//resultWeb Speech API запускается, когда служба распознавания речи возвращает результат
recognition.addEventListener('result', (event) => {
  const transcript = event.results[0][0].transcript; // сказанный текст
  // когда предложение закончено, оно добовляется в параграф
  if (event.results[0].isFinal) {
    let p = document.createElement('p');
    p.textContent = transcript;
    letter.appendChild(p);

    btnRecord.classList.toggle('active');
    record = false;
    recognition.stop();
  }
});
