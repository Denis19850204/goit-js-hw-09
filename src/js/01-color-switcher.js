const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.body;

let timeId = null;

startBtn.addEventListener('click', clickOnStartBtn);
stopBtn.addEventListener('click', clickOnStopBtn);
console.log('privet');

stopBtn.disabled = true;

function clickOnStartBtn() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  timeId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function clickOnStopBtn() {
  clearInterval(timeId);

  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
