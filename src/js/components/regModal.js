import {initCustomMasks} from "./inputMask";

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
}
