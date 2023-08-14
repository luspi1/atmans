import {initCustomMasks} from "./inputMask";
import {formToObj, sendData, serializeForm, showInfoModal} from "../_functions";
import {body, overlay} from "../_vars";

const changeModalRegContent = (state, content) => {
  const statesFragment = document.querySelector('#regStates')?.content
  const currentState = statesFragment.querySelector(`.reg-modal__state[data-state="${state}"]`)?.cloneNode(true)
  content.innerHTML = ''
  content.append(currentState)
}
const changeHomeRegContent = (state, content) => {
  const statesFragment = document.querySelector('#homeStates')?.content
  const currentState = statesFragment.querySelector(`.home-registration__state[data-state="${state}"]`)?.cloneNode(true)
  content.innerHTML = ''
  content.append(currentState)
}

async function handleRegSubmit(event) {
  event.preventDefault()
  const currentForm = event.currentTarget
  const dataUrl = currentForm.action
  const data = serializeForm(event.target)
  const objData = formToObj(data)
  const jsonData = JSON.stringify(objData)
  const modal = document.querySelector('#regModal')

  try {
    const response = await sendData(jsonData, dataUrl)
    const finishedResponse = await response.json()

    const {status, errortext} = finishedResponse
    if (status === 'ok') {
      currentForm.reset()
      modal.classList.remove('_active')

      const modalStateContent = modal.querySelector('.reg-modal__content')
      changeModalRegContent(1, modalStateContent)

      const regHomeContent = currentForm.querySelector('.home-registration__content')

      if (regHomeContent) {
        changeHomeRegContent(1, regHomeContent)
      }

      overlay.classList.remove('_active')
      body.classList.remove('_lock')
      initCustomMasks()
      showInfoModal('Регистрация прошла успешно. На указанный вами номер телефона поступит ссылка на билет.')
    } else {
      showInfoModal(errortext)
    }
  } catch (err) {
    showInfoModal("Во время выполнения запроса произошла ошибка")
    console.error(err)
  }
}


//Форма регистрации в модалке
const regFormModal = document.querySelector('#regModal')
if (regFormModal) {
  const stateSelect = regFormModal.querySelector('.reg-modal__state-select')

  const regModalContent = regFormModal.querySelector('.reg-modal__content')

  stateSelect.addEventListener('input', (e) => {
    let stateId = e.target.value
    changeModalRegContent(stateId, regModalContent)
    initCustomMasks()
  })

  //отправка данных формы

  const regModalForm = regFormModal.querySelector('form')
  regModalForm.addEventListener('submit', handleRegSubmit)

}

//Форма регистрации на главной

const homeRegForm = document.querySelector('.home-registration__reg-form')

if (homeRegForm) {
  const homeStateSelect = homeRegForm.querySelector('.home-registration__state-select')
  const homeRegFormContent = homeRegForm.querySelector('.home-registration__content')

  homeStateSelect.addEventListener('input', (e) => {
    let stateId = e.target.value
    changeHomeRegContent(stateId, homeRegFormContent)
    initCustomMasks()
  })
  //отправка данных формы
  homeRegForm.addEventListener('submit', handleRegSubmit)
}
