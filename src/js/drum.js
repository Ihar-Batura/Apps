function playMusic(e) {
  const audio = document.querySelector(`audio[data-key="${e.code}"]`);
  const key = document.querySelector(`div[data-key="${e.code}"]`);
  if (!audio) {
    return; //stop function
  } else {
    audio.currentTime = 0; //start music from start
    audio.play();
    key.classList.add('playing');
  }
}

const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
  key.addEventListener('transitionend', (e) => {
    // when transition finished
    if (e.propertyName !== 'transform') {
      return;
    } else {
      //if e.propertyName === transform
      e.target.classList.remove('playing');
    }
  });
});

window.addEventListener('keydown', playMusic);
