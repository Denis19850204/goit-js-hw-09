import Notiflix from 'notiflix'

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let delayEl = Number(form.elements.delay.value);
  let stepEl = Number(form.elements.step.value);
  let amountEl = Number(form.elements.amount.value);

  for (let i = 1; i <= amountEl; i += 1) {
    createPromise(i, delayEl)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })

      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delayEl += stepEl;
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

