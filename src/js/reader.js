const msg = new SpeechSynthesisUtterance(); //представляет речевой запрос. Он содержит контент, который речевая служба должна прочитать, и информацию о том, как его читать (например, язык, тон и громкость)
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value; //теперь здесь лежит текст из textarea

function populateVoices() {
  voices = speechSynthesis.getVoices(); // получаем массив с голосами
  const voicesOptions = voices
    .filter((el) => el.lang.includes('en'))
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join(''); // создаем элементы для выбора голоса и языка

  voicesDropdown.innerHTML = voicesOptions; // добавляем все в тег select
}

function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value); // выбираем голос
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel(); // останавливает чтение
  if (startOver) {
    speechSynthesis.speak(msg); //запускает чтение
  }
}

function setOption() {
  msg[this.name] = this.value; // меняет скорость воспроизведения
  toggle();
}

voicesDropdown.addEventListener('change', setVoice);

//представляет собой интерфейс контроллера для речевого сервиса; его можно использовать для получения информации о синтезированных голосах, доступных на устройстве, для запуска и приостановки речи, а также для выполнения других команд.
speechSynthesis.addEventListener('voiceschanged', populateVoices);

options.forEach((option) => {
  option.addEventListener('change', setOption);
});

speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
