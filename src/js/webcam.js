const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const btnTakePhoto = document.querySelector('.take-photo');

// получает видео
function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error(`Oh no!`, err);
    });
}

//отрисовывает видео в канвас
function paintVideoToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height); // рисует фото на большой экран
    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = rgbSplit(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

//делает скриншот фото
function takePhoto() {
  snap.currentTime = 0;
  snap.play(); // звук щелчка

  const data = canvas.toDataURL('image/jpeg'); // создает данные в указанном формате
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome'); // можно загружать фото
  link.innerHTML = `<img src="${data}" alt="Handsome Man"  />`;
  strip.insertBefore(link, strip.firstChild); //добавляет элемент в список дочерних элементов родителя перед указанным элементом.
}

function rgbSplit(pixels) {
  const red = document.querySelector('.input-red').value;
  const green = document.querySelector('.input-green').value;
  const blue = document.querySelector('.input-blue').value;

  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - red] = pixels.data[i + 0]; // RED
    pixels.data[i + green] = pixels.data[i + 1]; // GREEN
    pixels.data[i - blue] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

btnTakePhoto.addEventListener('click', takePhoto);

video.addEventListener('canplay', paintVideoToCanvas); // если видео есть то его отрисует

getVideo();
