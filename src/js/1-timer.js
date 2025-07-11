// Імпортуємо бібліотеку для вибору дати й часу flatpickr та її стилі
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Імпортуємо бібліотеку для повідомлень iziToast та її стилі
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо елементи з HTML-документа
const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// Глобальна змінна для обраної дати
// Оголошуємо змінні для обраної дати та інтервалу таймера
let userSelectedDate = null;
let countdownInterval = null;

// Спочатку кнопка Start неактивна
startButton.disabled = true;

//Об’єкт налаштувань для flatpickr
const options = {
  enableTime: true, // дозвіл вибору часу
  time_24hr: true, // формат часу 24 години
  defaultDate: new Date(), // поточна дата як значення за замовчуванням
  minuteIncrement: 1, // крок у 1 хвилину
  onClose(selectedDates) {
    // функція виконується при закритті календаря
    const selectedDate = selectedDates[0]; // отримуємо обрану дату
    if (selectedDate <= new Date()) {
      // Якщо дата в минулому або теперішня — показуємо попередження
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
      startButton.disabled = true; // блокуємо кнопку
    } else {
      // Якщо дата коректна (в майбутньому)
      userSelectedDate = selectedDate; // зберігаємо обрану дату
      startButton.disabled = false; // розблоковуємо кнопку Start
    }
  },
};

// Ініціалізація flatpickr на полі вводу
flatpickr(datetimePicker, options);

// Додаємо слухача події на кнопку Start
startButton.addEventListener('click', () => {
  if (!userSelectedDate) return; // якщо дата не обрана — нічого не робимо

  startButton.disabled = true; // блокуємо кнопку Start
  datetimePicker.disabled = true; // блокуємо інпут вибору дати

  // Запускаємо інтервал, що оновлюється щосекунди
  countdownInterval = setInterval(() => {
    const currentTime = new Date(); // поточний час
    const timeDifference = userSelectedDate - currentTime; // різниця між обраною датою і поточним часом

    if (timeDifference <= 0) {
      // Якщо час вичерпано — зупиняємо таймер
      clearInterval(countdownInterval);
      datetimePicker.disabled = false; // знову дозволяємо обирати дату
      updateTimer(0, 0, 0, 0); // виводимо нулі
      return;
    }

    // Перетворюємо мілісекунди у дні, години, хвилини, секунди
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimer(days, hours, minutes, seconds); // оновлюємо інтерфейс
  }, 1000);
});

// Функція оновлення інтерфейсу таймера
function updateTimer(days, hours, minutes, seconds) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

// Функція для додавання початкового нуля (наприклад, 4 → 04)
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція перетворення мілісекунд на дні, години, хвилини, секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
