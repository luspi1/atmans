import {formToObj, sendData, serializeForm, showInfoModal} from '../_functions'
import {initCustomMasks} from './inputMask'
import {initGenerateTmpl} from './generateTemplate'

const handleSmsSubmit = async (codeValue, script, phoneData) => {
  const data = {
    code: codeValue,
    phone: phoneData
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

const regForms = document.querySelectorAll('.reg-form:not(.on-place-page__reg-form)')
if (regForms?.length) {
  regForms.forEach(formEl => {
    // логика отправки смс с проверочным кодом

    const smsCodePhone = formEl.querySelector('.reg-form__code-input-wrapper .main-input')
    const smsCodeBtn = formEl.querySelector('.reg-form__code-input-wrapper button')
    const smsCodeScript = smsCodeBtn.dataset.script
    let currentPhone = ''
    smsCodeBtn.addEventListener('click', async () => {

      if (!smsCodePhone.reportValidity()) return

      const data = {
        phone: smsCodePhone.value,
      }
      const jsonData = JSON.stringify(data)

      try {
        const response = await sendData(jsonData, smsCodeScript)
        const finishedResponse = await response.json()

        const {status, errortext} = finishedResponse
        if (status === 'ok') {
          currentPhone = smsCodePhone.value
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
        handleSmsSubmit(e.currentTarget.value, e.currentTarget.dataset.script, currentPhone)
      }
    })


    // логика появления блоков, после выбора чекбоксов

    const regFormOptions = formEl.querySelectorAll('.reg-form__options .reg-form__option-item')

    regFormOptions.forEach(optItem => {
      const optionCheckboxWrapper = optItem.querySelector('.main-checkbox._opt')
      const optionCheckbox = optionCheckboxWrapper?.querySelector('input[type="checkbox"]')
      const optionContent = optItem.querySelector('.reg-form__option-content')
      const optionTemplate = optItem.querySelector('template')?.content

      optionCheckbox?.addEventListener('change', () => {

        // подсветка активного пункта

        optionCheckboxWrapper.classList.toggle('_checked')
        if (!optionContent) return

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


    // логика отправки данных с формы и появления модалки в случае успеха

    formEl.addEventListener('submit', async (e) => {
      e.preventDefault()
      // Проверка обязательных полей
      const requiredFields = formEl.querySelectorAll('[required]')

      requiredFields.forEach(field => {
        if (!field.reportValidity()) {
          field.focus()
        }
      })

      const data = serializeForm(e.currentTarget)
      const objData = formToObj(data)

      const jsonData = JSON.stringify(objData)

      try {
        const response = await sendData(jsonData, formEl.action)
        const finishedResponse = await response.json()

        const {status, errortext, success_text} = finishedResponse

        if (status === 'ok') {
          showInfoModal(success_text ?? 'Вы успешно зарегистрированы!')
          formEl
            .querySelectorAll('.reg-form__option-content')
            .forEach(content => content.innerHTML = '')
          formEl
            .querySelectorAll('.main-checkbox._opt')
            .forEach(checkboxEl => checkboxEl.classList.remove('_checked'))
          formEl.reset()
        } else {
          showInfoModal(errortext)
        }
      } catch (err) {
        showInfoModal('Во время выполнения запроса произошла ошибка')
        console.error(err)
      }
    })
  })
}



