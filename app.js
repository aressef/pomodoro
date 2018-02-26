function timer(duration) {
  const initialTime = Date.now();
  const diff;
  const minutes;
  const seconds;

  function recordTime() {
    // the difference between inital start and time recordTime is called
    diff = duration  - (((Date.now() - initalStart) / 1000) | 0);

    // create minutes and seconds
    minutes = (diff / 60) | 0;
    seconds = (diff % 60) | 0;

    // if minutes or seconds are less than 10 add a zero to the front
    // example: 9 seconds becomes 09 seconds
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // add time to texContent of displayTimer
    displayTimer.textContent = `${minutes}:${seconds}`;
  }
  timer();
  setInterval(timer, 1000);
}

function startTimer(time) {
  var timerAmount = time * 60;
  timer(time);
}


const displayTimer = document.querySelector('.timer-display');
const startButton = document.querySelector('.start-button');
const stopButton = document.querySelector('.stop-button');
