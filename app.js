//jshint esversion: 6
const pomodoroBody = document.querySelector('.pomodoro-body');
const displayTimer = document.querySelector('.timer-display');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const adjustTime = document.querySelector('.adjust-time');
const inputTime = document.querySelector('.input-time');
const addMinute = document.querySelector('.add-minute');
const subtractMinute = document.querySelector('.subtract-minute');

function start(duration) {
  let start = Date.now();

  (function f() {
    const adjustedDuration = duration * 60;

    let diff = adjustedDuration - parseInt(((Date.now() - start) / 1000), 10);

    if (diff > 0) {
      setTimeout(f, 1000);
    } else {
      diff = 0;
    }

    // const diff = Date.now() - start;
    // const ns = (((300000 - diff) / 1000) >> 0);
    const m = (diff / 60) >> 0;
    const s = diff - m * 60;

    displayTimer.textContent = `${m}:${(('' + s).length > 1 ? '' : '0')}${s}`;

    if (diff > 300000) {
      start = Date.now();
    }
  })();

}

function toggleStartandStop(e) {
  if (e.target.classList.contains('start')) {
    console.log('test');
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
  } else if (stopButton.classList.contains('stop')) {
    stopButton.style.display = 'none';
    startButton.style.display = 'block';
  }
}

function setTime() {
  // when user changes time in inputTime the clock changes to that time
  let time;
  const errorMessage = document.querySelector('.error-message');
  // clear error if already there
  if (errorMessage) document.body.removeChild(errorMessage);

  if (inputTime.value === '') {
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

// Event Listeners
startButton.addEventListener('click', () => start(1));
stopButton.addEventListener('click', () => start(0));
document.addEventListener('click', toggleStartandStop);
inputTime.addEventListener('keyup', setTime);
addMinute.addEventListener('click', addTime);
subtractMinute.addEventListener('click', subtractTime);





// function Pomodoro(duration, granularity) {
//   this.duration = duration;
//   this.granularity = granularity || 1000;
//   this.tickFtns = [];
//   this.active = false;
// }

// Pomodoro.prototype.start = function(cancel) {
//   if (this.active) {
//     return;
//   }
//   this.running = true;
//   const start = Date.now();
//   const that = this;
//   let diff;
//   let obj;
//   let activeTimer;

//   if (cancel === 0) {
//     clearTimeout(activeTimer);
//     return;
//   } else {
//     timer();
//   }

//   function timer() {
//     diff = that.duration - parseInt(((Date.now() - start) / 1000), 10);
//     if (diff > 0) {
//       activeTimer = setTimeout(timer, that.granularity);
//     } else {
//       diff = 0;
//       that.running = false;
//     }

//     obj = Pomodoro.parse(diff);
//     that.tickFtns.forEach(function(ftn) {
//       ftn.call(this, obj.minutes, obj.seconds);
//     }, that);
//   }
// };

// Pomodoro.prototype.onTick = function(ftn) {
//   if (typeof ftn === 'function') {
//     this.tickFtns.push(ftn);
//   }
//   return this;
// };

// Pomodoro.prototype.expired = function() {
//   return !this.running;
// };

// Pomodoro.parse = function(seconds) {
//   return {
//     'minutes': parseInt((seconds / 60), 10),
//     'seconds': parseInt((seconds % 60), 10)
//   };
// };

// function formatTime(minutes, seconds) {
//   const newTimer = document.querySelector('.timer-display');

//   seconds = seconds < 10 ? `0${seconds}` : seconds;
//   if (displayTimer) {
//     displayTimer.textContent = `${minutes}:${seconds}`;
//   } else {
//     newTimer.textContent = `${minutes}:${seconds}`;
//   }
// }

// function stopTimer() {
//   pomodoroBody.removeChild(displayTimer);
//   const newTimer = document.createElement('p');
//   newTimer.classList.add('timer-display');
//   pomodoroBody.insertBefore(newTimer, startButton);
  
//   const time = inputTime.value;
//   timer = new Pomodoro(time * 60);
//   timeObj = Pomodoro.parse(time * 60);
//   formatTime(timeObj.minutes, timeObj.seconds);
//   timer.onTick(formatTime);
// }

// let timer = new Pomodoro(25 * 60);
// let timeObj = Pomodoro.parse(25 * 60);

// formatTime(timeObj.minutes, timeObj.seconds);
// timer.onTick(formatTime);