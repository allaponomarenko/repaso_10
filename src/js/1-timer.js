import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Глобальна змінна для обраної дати
let userSelectedDate = null;

// Параметри для flatpickr


// Ініціалізація flatpickr на полі вводу
flatpickr("#datetime-picker", options);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log("Обрана дата:", userSelectedDate);
  },
};
