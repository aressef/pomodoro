//jshint esversion: 6
const pomodoroBody = document.querySelector('.pomodoro-body');
const displayTimer = document.querySelector('.timer-display');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const resetButton = document.querySelector('.reset');
const changeDuration = document.querySelector('.change-duration');
const timerOptions = document.querySelector('.timer-options');
const inputTime = document.querySelector('.input-time');
const addMinute = document.querySelector('.add-minute');
const subtractMinute = document.querySelector('.subtract-minute');

function timer(duration) {
  let startTime = Date.now();
  let currentTimer;
  let diff;

  function start() {
    const adjustedDuration = duration * 60;
    
    diff = adjustedDuration - parseInt(((Date.now() - startTime) / 1000), 10);

    if (diff > 0 && timerRunning !== false) {
      currentTimer = setTimeout(start, 1000);
    } else {
      diff = 0;
      timerRunning = true;
    }

    // const diff = Date.now() - start;
    // const ns = (((300000 - diff) / 1000) >> 0);
    const m = (diff / 60) >> 0;
    const s = diff - m * 60;

    displayTimer.textContent = `${m}:${(('' + s).length > 1 ? '' : '0')}${s}`;

    if (diff > 300000) {
      startTime = Date.now();
    }
  }

    if (duration > 4 && duration < 61) {
      start();
      if (!timerRunning) {
        timerRunning = true;
      }
    }

  timerOptions.style.display = 'none';
}

function stopTimer() {
  timerRunning = false;
}

function toggleStartandStop(e) {
  if (inputTime.value > 4 && inputTime.value < 61) {
    if (e.target.classList.contains('start') ) {
      startButton.style.display = 'none';
      stopButton.style.display = 'block';
    } else if (e.target.classList.contains('stop')) {
      stopButton.style.display = 'none';
      resetButton.style.display = 'block';
    } else if (e.target.classList.contains('reset')) {
      resetButton.style.display = 'none';
      startButton.style.display = 'block';
    }
  }
}

function setTime() {
  // when user changes time in inputTime the clock changes to that time
  let time = inputTime.value;
  const errorMessage = document.querySelector('.error-message');
  // clear error if already there
  if (errorMessage) document.body.removeChild(errorMessage);

  // time = inputTime.value;

  if (inputTime.value === '' || isNaN(Number(time))) {
    time = 25;
  } else if (inputTime.value > 60) {
    timeError();
    time = 25;
  } else if (inputTime.value < 5) {
    timeError();
    time = 5;
  } else {
    time = inputTime.value;
  }

  displayTimer.textContent = `${time}:00`;
  
}

function addTime() {
  if (inputTime.value > 0 && inputTime.value < 60) {
    const currentDuration = parseInt(inputTime.value, 10);
    inputTime.value = currentDuration + 1;
    setTime();
  }
}

function subtractTime() {
  if (inputTime.value > 1 && inputTime.value < 61) {
    const currentDuration = parseInt(inputTime.value, 10);
    inputTime.value = currentDuration - 1;
    setTime();
  }
}

function timeError() {
  const error = document.createElement('p');
  error.classList.add('error-message');
  error.style.color = 'red';

  if (inputTime.value < 5) {
    error.textContent = 'You should work for at least 5 minutes!';
  } else if (inputTime.value > 60) {
    error.textContent = 'You shouldn\'t work for longer than an hour at a time!';
  }

  document.body.appendChild(error);
}

function showDurationOptions() {
  if (stopButton.style.display !== 'block') {
    if (timerOptions.style.display === 'block') {
      timerOptions.style.display = 'none';
    } else {
      timerOptions.style.display = 'block';
    }
  }
}

let timerRunning;

// Event Listeners
startButton.addEventListener('click', () => timer(inputTime.value));
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', setTime);
document.addEventListener('click', toggleStartandStop);
changeDuration.addEventListener('click', showDurationOptions);
inputTime.addEventListener('keyup', setTime);
addMinute.addEventListener('click', addTime);
subtractMinute.addEventListener('click', subtractTime);

setTime();