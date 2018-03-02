//jshint esversion: 6
const pomodoroBody = document.querySelector('.pomodoro-body');
const displayTimer = document.querySelector('.timer-display');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const adjustTime = document.querySelector('.adjust-time');

function Pomodoro(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity;
  this.tickFtns = [];
  this.active = false;
}

Pomodoro.prototype.start = function() {
  if (this.active) {
    return;
  }
  this.running = true;
  const start = Date.now();
  const that = this;
  let diff;
  let obj;

  (function timer() {
    diff = that.duration - parseInt(((Date.now() - start) / 1000), 10);

    if (diff > 0) {
      setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      that.running = false;
    }

    obj = Pomodoro.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  }());
};

Pomodoro.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

Pomodoro.prototype.expired = function() {
  return !this.running;
};

Pomodoro.parse = function(seconds) {
  return {
    'minutes': parseInt((seconds / 60), 10),
    'seconds': parseInt((seconds % 60), 10)
  };
};

function formatSeconds(minutes, seconds) {
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  displayTimer.textContent = `${minutes}:${seconds}`;
}

function toggleStartandStop(e) {
  if (e.target.classList.contains('start')) {
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
  } else if (stopButton.classList.contains('stop')) {
    stopButton.style.display = 'none';
    startButton.style.display = 'block';
  }
}


const timer = new Pomodoro(25);
const timeObj = Pomodoro.parse(25);

formatSeconds(timeObj.minutes, timeObj.seconds);
timer.onTick(formatSeconds);

startButton.addEventListener('click', () => timer.start());
document.addEventListener('click', toggleStartandStop);