import { body, overlay } from "../_vars"


const handleCloseModalKeyboard = (e) => {
  if (e.keyCode === 27) {
    body.classList.remove('_lock')
    document.querySelectorAll('.modal').forEach(modal => {
      if (modal.classList.contains('_active')) {
        modal.classList.remove('_active')
      }
    })
    if (overlay) {
      overlay.classList.remove('_active')
    }
    document.removeEventListener('keydown', handleCloseModalKeyboard)
  }
}


const initOpenModals = () => {
  const openModalBtns = document.querySelectorAll('[data-modal]')

  if (openModalBtns) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()

        document.addEventListener('keydown', handleCloseModalKeyboard)
        const btnCurrentModal = btn.dataset.modal
        const currentBtn = e.currentTarget
        const currentModal = document.querySelector(`#${btnCurrentModal}`)
        const isBodyLock = currentModal.dataset.bodyLock
        const activeModal = document.querySelector('.modal._active')

        if (activeModal) {
          activeModal.classList.remove('_active')
        }

        currentModal.scrollTo(0, 0)

        if (isBodyLock) {
          body.classList.add('_lock')
        }

        if (currentBtn.dataset.id) {
          const dataIdInput = currentModal.querySelector('.data-modal-id')
          if (dataIdInput) {
            dataIdInput.value = currentBtn.dataset.id
          }
        }

        currentModal.classList.add('_active')
        overlay.classList.add('_active')
      })
    })
  }
}

initOpenModals()


const initCloseModals = () => {
  const closeModalBtns = document.querySelectorAll('button[data-close-modal]')

  if (closeModalBtns) {
    closeModalBtns.forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault()
        body.classList.remove('_lock')

        document.removeEventListener('keydown', handleCloseModalKeyboard)
        document.querySelectorAll('.modal').forEach(modal => {
          if (modal.classList.contains('_active')) {
            modal.classList.remove('_active')
          }
        })
        if (overlay) {
          overlay.classList.remove('_active')
        }
      })
    })
  }
}

initCloseModals()

if (overlay) {
  overlay.addEventListener('click', (e) => {
    e.preventDefault()
    document.removeEventListener('keydown', handleCloseModalKeyboard)
    body.classList.remove('_lock')
    e.currentTarget.classList.remove('_active')
    const activeModal = document.querySelector('.modal._active')
    if (activeModal) {
      activeModal.classList.remove('_active')
    }
  })
}

export { initCloseModals, initOpenModals }
