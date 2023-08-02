import './_components';
import AirDatepicker from 'air-datepicker';
import { initInputMask } from "./components/inputMask";

const tabBtns = document.querySelectorAll('.program__date-btn')
const tabs = document.querySelectorAll('.program__lists')

// Инициализация Inputmask

initInputMask()

const removeClasses = (arr, className) => {
  arr.forEach(el => {
    if (el.classList.contains(className)) {
      el.classList.remove(className)
    }
  })
}

// Управление состоянием табов в разделе "Программа"
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!btn.classList.contains('_active')) {
      removeClasses(tabBtns, '_active')
      btn.classList.add('_active')
      tabs.forEach(tab => {
        if (tab.classList.contains('_active')) {
          tab.classList.remove('_active')
        } else {
          tab.classList.add('_active')
        }
      })
    }
  })
})



// Кастомный datepicker

const dateInput = document.querySelector('.reg-form__date-input');
let startDate = new Date('1905-09-08');
new AirDatepicker(dateInput, {
  startDate,
});


// появление модалки при успешной регистрации

const regForm = document.querySelector('.reg-form')
const regFormModal = document.querySelector('.registration__success-modal')

if (regForm) {
  regForm.addEventListener('submit', (e) => {
    e.preventDefault()
    regFormModal.classList.add('_active')
  })
}
// появление модалки в форме обратной связи

const feedbackForm = document.querySelector('.feedback__form')
const feedbackFormModal = document.querySelector('.feedback__success-modal')

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault()
    feedbackFormModal.classList.add('_active')
  })
}





