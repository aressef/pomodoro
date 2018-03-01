const displayTimer = document.querySelector('.timer-display');
const startButton = document.querySelector('.start-button');
const stopButton = document.querySelector('.stop-button');

function Podoromo(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity;
  this.tickFtns = [];
  this.active = false;
}

Podoromo.prototype.start = function() {
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

    obj = Podoromo.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  }());
};

Podoromo.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

Podoromo.prototype.expired = function() {
  return !this.running;
};

Podoromo.parse = function(seconds) {
  return {
    'minutes': parseInt((seconds / 60), 10),
    'seconds': parseInt((seconds % 60), 10)
  };
};

function formatSeconds(minutes, seconds) {
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  displayTimer.textContent = `${minutes}:${seconds}`;
}

window.onload = function() {
  const timer = new Podoromo(5);
  const timeObj = Podoromo.parse(5);

  formatSeconds(timeObj.minutes, timeObj.seconds);

  timer.onTick(formatSeconds);

  startButton.addEventListener('click', () => timer.start());
};
