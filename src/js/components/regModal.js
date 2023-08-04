import {initCustomMasks} from "./inputMask";
import {formToObj, sendData, serializeForm, showInfoModal} from "../_functions";
import {overlay} from "../_vars";

const regModal = document.querySelector('#regModal')

if (regModal) {
  const stateSelect = regModal.querySelector('.reg-modal__state-select')
  const statesFragment = document.querySelector('#regStates')?.content
  const regModalContent = regModal.querySelector('.reg-modal__content')

  stateSelect.addEventListener('input', (e) => {
    let stateId = e.target.value

    const currentState = statesFragment.querySelector(`.reg-modal__state[data-state="${stateId}"]`)?.cloneNode(true)
    regModalContent.innerHTML = ''
    regModalContent.append(currentState)
    initCustomMasks()
  })

  //отправка данных формы

  const regModalForm = regModal.querySelector('form')

  const dataUrl = regModalForm.action

  async function handleRegSubmit(event) {
    event.preventDefault()

    const data = serializeForm(event.target)
    const objData = formToObj(data)
    const jsonData = JSON.stringify(objData)


    try {
      const response = await sendData(jsonData, dataUrl)
      const finishedResponse = await response.json()


      const {status, errortext} = finishedResponse
      if (status === 'ok') {
        regModal.classList.remove('_active')
        overlay.classList.remove('_active')
        showInfoModal('Регистрация прошла успешно. На указанный вами номер телефона поступит ссылка на билет.')
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  }

  regModalForm.addEventListener('submit', handleRegSubmit)

}
