const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
btnStart = document.querySelector('.start');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1200);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) {
      peep();
    }
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  peep();
  setTimeout(() => {
    localStorage.setItem('score', `${score}`); // add score to localstorage
    timeUp = true;
  }, 20000);
}

function touchMole(e) {
  if (!e.isTrusted) {
    return;
  } else {
    this.parentNode.classList.remove('up');
    score++;
    scoreBoard.textContent = score;
  }
}

moles.forEach((mole) => {
  mole.addEventListener('click', touchMole);
});

btnStart.addEventListener('click', startGame);
