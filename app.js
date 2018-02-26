const displayTimer = document.querySelector('.timer-display');
const startButton = document.querySelector('.start-button');
// const stopButton = document.querySelector('.stop-button');

function timer(duration) {
  const initialTime = Date.now();
  let diff;
  let minutes;
  let seconds;

  function recordTime() {
    // the difference between inital start and time recordTime is called
    diff = duration - (((Date.now() - initialTime) / 1000) | 0);

    // create minutes and seconds
    minutes = (diff / 60) | 0;
    seconds = (diff % 60) | 0;

    // if minutes or seconds are less than 10 add a zero to the front
    // example: 9 seconds becomes 09 seconds
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    // add time to texContent of displayTimer
    displayTimer.textContent = `${minutes}:${seconds}`;
  }
  recordTime();
  setInterval(recordTime, 1000);
}

function startTimer(time) {
  const timerAmount = time * 60;
  timer(timerAmount);
}

startButton.addEventListener('click', () => startTimer(5));
