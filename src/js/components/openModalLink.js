import {body, overlay} from "../_vars";

document.addEventListener('DOMContentLoaded', () => {
  const currentUrl = window.location.href
  if (currentUrl.includes('reglink')) {
    const regModal = document.querySelector('#regModal')
    regModal.classList.add('_active')
    overlay.classList.add('_active')
    body.classList.add('_lock')
  }
})
