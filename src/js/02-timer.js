import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix'

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btn.addEventListener('click', onBtnClick);

const today = new Date();
btn.disabled = true;


function onBtnClick() {
  timer.start();
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validDate(selectedDates[0]);
    
  },
};

flatpickr('#datetime-picker', options);

function validDate(date) {
  btn.disabled = true;
  
  if (date <= today) {
    setTimeout(() => {
      Notiflix.Notify.warning('Please choose a date in the future');
    }, 50);
  } else if (date > today) {
    btn.disabled = false;
  }
}

const timer = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    const targetDate = new Date(input.value);
    this.isActive = true;

    const timerId=setInterval(() => {
      const currentDate = Date.now();
      const deltaTime = targetDate - currentDate;
      const time = convertMs(deltaTime);

      
      if (deltaTime <= 1000) {
        clearInterval(timerId)
      }
      

      updateDisplay(time);
    }, 1000);
  },
};

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateDisplay({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
