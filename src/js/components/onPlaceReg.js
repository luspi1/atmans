import {initCustomMasks} from './inputMask'
import {initGenerateTmpl} from './generateTemplate'
import {formToObj, sendData, serializeForm, showInfoModal} from '../_functions'
import {Html5QrcodeScanner} from 'html5-qrcode'

const onPlaceRegForm = document.querySelector('.on-place-page__reg-form')

if (onPlaceRegForm) {
  // логика появления блоков, после выбора чекбоксов

  const regFormOptions = onPlaceRegForm.querySelectorAll('.reg-form__options .reg-form__option-item')

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

  onPlaceRegForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    // Проверка обязательных полей
    const requiredFields = onPlaceRegForm.querySelectorAll('[required]')

    requiredFields.forEach(field => {
      if (!field.reportValidity()) {
        field.focus()
      }
    })

    const data = serializeForm(e.currentTarget)
    const objData = formToObj(data)

    const jsonData = JSON.stringify(objData)

    try {
      const response = await sendData(jsonData, onPlaceRegForm.action)
      const finishedResponse = await response.json()

      const {status, errortext, success_text} = finishedResponse

      if (status === 'ok') {
        showInfoModal(success_text ?? 'Вы успешно зарегистрированы!')
        onPlaceRegForm
          .querySelectorAll('.reg-form__option-content')
          .forEach(content => content.innerHTML = '')
        onPlaceRegForm
          .querySelectorAll('.main-checkbox._opt')
          .forEach(checkboxEl => checkboxEl.classList.remove('_checked'))
        onPlaceRegForm.reset()
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal('Во время выполнения запроса произошла ошибка')
      console.error(err)
    }
  })


  // логика сканирования браслета

  const submitQr = async (decodedText) => {
    const qrScanner = document.querySelector('#onPlaceRegScan')
    const dataUrl = qrScanner.dataset.script

    const data = {
      decoded: decodedText
    }
    const jsonData = JSON.stringify(data)

    try {
      const response = await sendData(jsonData, dataUrl)
      const finishedResponse = await response.json()

      const {status, errortext, reg_status, ticket_number} = finishedResponse
      if (status === 'ok') {
        const qrReading = document.querySelector('.qr-reading')
        qrScanner.classList.add('hidden')
        qrReading.classList.remove('hidden')
        qrReading.classList.add(reg_status)

        if (reg_status === '_success-code') {
          const ticketNumber = qrReading.querySelector('._success-code')
          ticketNumber.textContent = ticket_number
        }

      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal('Во время выполнения запроса произошла ошибка')
      console.error(err)
    }
  }

  let lastResult
  let countResults = 0

  function onScanSuccess(decodedText) {
    if (decodedText !== lastResult) {
      ++countResults
      lastResult = decodedText
      submitQr(lastResult)
        .then(() => html5QrcodeScanner.clear())
    }

  }


  let html5QrcodeScanner = new Html5QrcodeScanner(
    'onPlaceRegScan',
    {fps: 10, qrbox: {width: 250, height: 250}},
    /* verbose= */ false)
  html5QrcodeScanner.render(onScanSuccess)


}
