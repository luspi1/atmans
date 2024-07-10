
// появление модалки при успешной регистрации

// const regForm = document.querySelector('.reg-form')
const regFormModal = document.querySelector('.registration__success-modal')

// if (regForm) {
//   regForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     regFormModal.classList.add('_active')
//   })
// }
// появление модалки в форме обратной связи

const feedbackForm = document.querySelector('.feedback__form')
const feedbackFormModal = document.querySelector('.feedback__success-modal')

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault()
    feedbackFormModal.classList.add('_active')
  })
}


