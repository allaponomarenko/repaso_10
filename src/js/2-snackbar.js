import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//🔸 DOMContentLoaded чекає, поки HTML повністю завантажиться.
document.addEventListener('DOMContentLoaded', () => {
  //🔸 querySelector('input[name="delay"]') шукає input з name="delay".
  const delayInput = document.querySelector('input[name="delay"]');
  if (delayInput) {
    //🔸 .classList.add('delay-input') додає CSS-клас до цього елемента.
    delayInput.classList.add('delay-input');
  }

  //🔹 Це знаходить усі радіо-кнопки, у яких є атрибут name="state"
  const stateInputs = document.querySelectorAll('input[name="state"]');
  //🔹 Ми перебираємо кожен знайдений input по черзі (їх може бути 2 або більше).
  stateInputs.forEach(input => {
    //🔹 Якщо значення value дорівнює 'fulfilled' — додаємо клас .fulfilled-input
    if (input.value === 'fulfilled') {
      input.classList.add('fulfilled-input');
      //🔹 Якщо значення value дорівнює 'rejected' — додаємо клас .rejected-input
    } else if (input.value === 'rejected') {
      input.classList.add('rejected-input');
    }
  });

  //🔸Шукаємо блок <fieldset> у формі — це той, що обгортає радіо-кнопки fulfilled і rejected.
  //🔸Якщо знайшли — додаємо йому клас .state-fieldset, щоб можна було окремо стилізувати цей блок у CSS.
  const fieldset = document.querySelector('fieldset');
  if (fieldset) {
    fieldset.classList.add('state-fieldset');
  }
  //🔸 Не дозволяємо формі “перезавантажити сторінку”, як це буває за замовчуванням при submit. Тепер ми все контролюємо вручну.
  const form = document.querySelector('.form');
  form.addEventListener('submit', (event, e) => {
    event.preventDefault();

    //🔸Беремо значення з поля Delay і перетворюємо в число (наприклад, 1000 мс).
    const delay = parseInt(delayInput.value);
    //🔸 Знаходимо, яка радіо-кнопка обрана (тобто, має checked)
    //🔸 І зчитуємо її значення (value): або 'fulfilled', або 'rejected'.
    const selectedState = Array.from(stateInputs).find(
      input => input.checked
    ).value;

    //🔸 Передаємо затримку (мс) та стан (fulfilled або rejected) у функцію, яка створить обіцянку (Promise).
    createPromise(delay, selectedState)
      //🔸 Якщо Promise успішно виконався — показуємо зелений тост ✅
      .then(delay => {
        iziToast.success({
          title: 'Succes',
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topCenter',
        });
      })
      //🔸 Якщо Promise відхилено — показуємо червоний тост ❌
      .catch(delay => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topCenter',
        });
      });
  });

  //🔸 Це функція створює відкладену обіцянку:
  //🔸чекає delay мілісекунд;
  //🔸якщо state === 'fulfilled' — виконує resolve();
  //🔸якщо state === 'rejected' — виконує reject().
  //🔸Це імітація справжніх асинхронних операцій, як наприклад, запит на сервер.
  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }
});

/**
 * ✅ Підсумок
 * Клас state-fieldset — для стилізації блоку з радіо-кнопками.
 * При submit зчитуємо значення.
 * Створюємо відкладену обіцянку.
 * Показуємо тост у стилі Success або Error через iziToast.
 */
