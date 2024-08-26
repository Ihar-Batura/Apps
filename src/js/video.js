const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-line');

const toggle = document.querySelector('.toggle');
const skipBtn = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player-slider');

function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.textContent = '❚ ❚';
  } else {
    video.pause();
    toggle.textContent = '►';
  }
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipBtn.forEach((btn) => {
  btn.addEventListener('click', skip);
});
console.log(ranges);
ranges.forEach((range) => {
  range.addEventListener('change', handleRangeUpdate);
});
ranges.forEach((range) => {
  range.addEventListener('mousemove', handleRangeUpdate);
});
progress.addEventListener('click', scrub);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
