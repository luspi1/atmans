import { body, overlay } from "../_vars";

const videoLinks = document.querySelectorAll('.header__modal-link')
const videoModal = document.querySelector('.header__video-modal')
const closeModalBtn = document.querySelector('.modal-close')
const videoSrc = document.querySelector('.header__video-src')

const openModal = () => {
  videoModal.classList.add('header__video-modal_active')
  overlay.classList.add('_active')
  body.classList.add('_lock')
}

const closeModal = () => {
  videoModal.classList.remove('header__video-modal_active')
  overlay.classList.remove('_active')
  body.classList.remove('_lock')
  videoSrc.src = ''
}

videoLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    openModal()
    closeModalBtn.addEventListener('click', closeModal)
    overlay.addEventListener('click', closeModal)
    videoSrc.src = link.dataset.link
  })
})

