// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  input: document.querySelector("input[name='delay']"),
  fulfilledBtn: document.querySelector("input[value='fulfilled']"),
  rejectedBtn: document.querySelector("input[value='rejected']"),
  submitBtn: document.querySelector("button[type='submit']")
}

refs.submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const delay = refs.input.value; 
  const result = new Promise((resolve, reject) => {
    setTimeout(() => {
      const selectedBtn = document.querySelector("input[name='state']:checked").value
      if (selectedBtn === "fulfilled") {
        resolve(delay); 
      } else {
        reject(delay); 
      }
    }, delay);
  });

  result.then((delay) => {
    iziToast.success({
      message: `Fulfilled promise in ${delay}ms`,
    });
  }).catch((delay) => {
    iziToast.error({
      message: `Rejected promise in ${delay}ms`,
    });
  });
});
