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
    diff = duration - parseInt(((Date.now() - initialTime) / 1000), 10);

    // create minutes and seconds
    minutes = parseInt(diff / 60, 10);
    seconds = parseInt(diff % 60, 10);

    // if minutes or seconds are less than 10 add a zero to the front
    // example: 9 seconds becomes 09 seconds
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    // add time to textContent of displayTimer
    displayTimer.textContent = `${minutes}:${seconds}`;

    // check if timer has run out
    // if (displayTimer.textContent === '00:00') {
    //   return;
    // }
  }

  recordTime();
  setInterval(recordTime, 1000);
}

function startTimer(time) {
  const timerAmount = time * 60;
  timer(timerAmount);
}

startButton.addEventListener('click', () => startTimer(.1));
