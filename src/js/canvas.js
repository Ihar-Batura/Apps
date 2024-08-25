const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// window.addEventListener('resize', reSize);
//change canvas size when change size window
// function reSize() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   width = canvas.width;
//   height = canvas.height;
// }

let isDrawing = false; //flag

let canvasColor = 'red';
document.querySelector('.color').oninput = function () {
  canvasColor = this.value;
};

let lineSize = 1;
document.querySelector('.size').oninput = function () {
  lineSize = this.value;
};

canvas.addEventListener('mousedown', function () {
  isDrawing = true;
});

canvas.addEventListener('mouseup', function () {
  isDrawing = false;
  //при подьеме мыши сбрасывает путь
  ctx.beginPath();
});

canvas.addEventListener('mousemove', function (e) {
  if (isDrawing) {
    ctx.lineWidth = lineSize * 2;
    //дорисовывает линию от последней позиции к текущей позиции
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = canvasColor; //color line
    ctx.stroke();
    // рисует круг
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, lineSize, 0, Math.PI * 2);
    ctx.fillStyle = canvasColor; //color circle
    ctx.fill();
    //начинает новый путь и меняет позицию курсора
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
});
