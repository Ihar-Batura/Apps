const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.video-container video');

  //Sounds
  const sounds = document.querySelectorAll('.sound-picker button');

  //Time Display
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');

  // Get the length of the outline
  const outlineLength = outline.getTotalLength();

  //Duration
  let fakeDuration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Pick different sounds
  sounds.forEach((sound) => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlying(song);
    });
  });

  //play sound
  play.addEventListener('click', () => {
    checkPlying(song);
  });

  //select sound
  timeSelect.forEach((option) => {
    option.addEventListener('click', function () {
      fakeDuration = this.getAttribute('data-time');
      let min = Math.floor(fakeDuration / 60);
      let sec = Math.floor(fakeDuration % 60);
      timeDisplay.textContent = `${min < 10 ? '0' + min : min}:${
        sec < 10 ? '0' + sec : sec
      }`;
    });
  });

  // function play and stop the sound
  const checkPlying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = '../assets/svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = '../assets/svg/play.svg';
    }
  };

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //Animate the time
    timeDisplay.textContent = `${minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = '../assets/svg/play.svg';
      video.pause();
    }
  };
};

app();
