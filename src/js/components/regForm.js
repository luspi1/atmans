import {sendData, showInfoModal} from '../_functions'
import {initCustomMasks} from './inputMask'
import {initGenerateTmpl} from './generateTemplate'

const handleSmsSubmit = async (codeValue, script) => {
  const data = {
    code: codeValue,
  }
  const jsonData = JSON.stringify(data)

  try {
    const response = await sendData(jsonData, script)
    const finishedResponse = await response.json()

    const {status, errortext} = finishedResponse
    if (status === 'ok') {
      showInfoModal('Код принят!')
    } else {
      showInfoModal(errortext)
    }
  } catch (err) {
    showInfoModal('Во время выполнения запроса произошла ошибка')
    console.error(err)
  }
}

const regForms = document.querySelectorAll('.reg-form')

if (regForms?.length) {
  regForms.forEach(formEl => {
    // логика отправки смс с проверочным кодом

    const smsCodePhone = formEl.querySelector('.reg-form__code-input-wrapper .main-input')
    const smsCodeBtn = formEl.querySelector('.reg-form__code-input-wrapper button')
    const smsCodeScript = smsCodeBtn.dataset.script
    smsCodeBtn.addEventListener('click', async (e) => {
      const data = {
        phone: smsCodePhone.value,
      }
      const jsonData = JSON.stringify(data)

      try {
        const response = await sendData(jsonData, smsCodeScript)
        const finishedResponse = await response.json()

        const {status, errortext} = finishedResponse
        if (status === 'ok') {
          showInfoModal('Код отправлен успешно!')
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        showInfoModal('Во время выполнения запроса произошла ошибка')
        console.error(err)
      }
    })

    const smsCodeInput = formEl.querySelector('.reg-form__sms-code-input')

    smsCodeInput.addEventListener('input', (e) => {
      if (e.currentTarget.value.length === 5) {
        handleSmsSubmit(e.currentTarget.value, e.currentTarget.dataset.script)
      }
    })


    // логика появления блоков, после выбора чекбоксов

    const regFormOptions = formEl.querySelectorAll('.reg-form__options .reg-form__option-item')

    regFormOptions.forEach(optItem => {
      const optionCheckbox = optItem.querySelector('.main-checkbox input[type="checkbox"]')
      const optionContent = optItem.querySelector('.reg-form__option-content')
      const optionTemplate = optItem.querySelector('template')?.content

      optionCheckbox.addEventListener('change', (e) => {
        if (optionCheckbox.checked) {
          const optionTmplClone = optionTemplate.querySelector('.option-tmpl').cloneNode(true)

          optionContent.append(optionTmplClone)
          initCustomMasks()
          initGenerateTmpl(optionTmplClone)
        } else {
          optionContent.innerHTML = ''
        }
      })
    })
  })

}



