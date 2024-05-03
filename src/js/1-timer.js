// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  input: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("[data-start]"),
  daysField: document.querySelector("[data-days]"), 
  hoursField: document.querySelector("[data-hours]"), 
  minField: document.querySelector("[data-minutes]"), 
  secField: document.querySelector("[data-seconds]"), 
}

let userSelectedDate = null
let timeInterval = null

 flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date()
    if (selectedDate <= currentDate) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future"
      })
      refs.startBtn.disabled = true
    } else {
      refs.startBtn.disabled = false
      userSelectedDate = selectedDate
    }
  },
});

refs.startBtn.addEventListener("click", () => {
  refs.startBtn.disabled = true
  refs.input.disabled = true

  timeInterval = setInterval(() => {
    const currentTime = new Date()
    const deltaTime = userSelectedDate - currentTime;
    if (deltaTime <=0 ) {
      clearInterval(timeInterval)
      updateTimeFields(0, 0, 0, 0)
      iziToast.success({
        title: "Success",
        message: "Countdown completed"
      })
      refs.startBtn.disabled = false
      refs.input.disabled = false
      return
    }
    const days = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
  // Remaining hours
    const hours = Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));;
  // Remaining minutes
    const minutes = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60));
  // Remaining seconds
    const seconds = Math.floor((deltaTime % (1000 * 60)) / 1000);

    updateTimeFields(days, hours, minutes, seconds)
  }, 1000)
})
  
function addLeadingZero(value) {
  return String(value).padStart(2, "0")
}

function updateTimeFields(days, hours, minutes, seconds) {
  refs.daysField.textContent = addLeadingZero(days)
  refs.hoursField.textContent = addLeadingZero(hours)
  refs.minField.textContent = addLeadingZero(minutes)
  refs.secField.textContent = addLeadingZero(seconds)
}


