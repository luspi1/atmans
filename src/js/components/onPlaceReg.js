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
  const qrDataInput = document.querySelector('.on-place-page__scan-data-input')

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
    const objData = {
      ...formToObj(data),
      decoded: qrDataInput.value,
    }

    const jsonData = JSON.stringify(objData)

    try {
      const response = await sendData(jsonData, onPlaceRegForm.action)
      const finishedResponse = await response.json()

      const {status, errortext, reg_status} = finishedResponse

      if (status === 'ok') {
        if (!reg_status) showInfoModal('нет статуса')

        if (reg_status === '_guest') {
          alert('браслет привязан УСПЕШНО!')
          location.reload()
        }
        if (reg_status === '_not-valid') {
          alert('браслет уже привязан куда-то')
          location.reload()
        }
        if (reg_status === '_not-in-base') {
          alert('браслет не найден в базе')
          location.reload()
        }
      } else {
        alert(errortext)
        location.reload()
      }
    } catch (err) {
      showInfoModal('Во время выполнения запроса произошла ошибка')
      console.error(err)
    }
  })


  // логика сканирования браслета

  const recordQrData = (decodedText) => {
    qrDataInput.value = decodedText
    const qrScanner = document.querySelector('#onPlaceRegScan')
    const qrReading = document.querySelector('.qr-reading')
    qrScanner.classList.add('hidden')
    qrReading.classList.remove('hidden')
    qrReading.classList.add('_success')
  }
  let lastResult
  let countResults = 0

  function onScanSuccess(decodedText) {
    if (decodedText !== lastResult) {
      ++countResults
      lastResult = decodedText
      recordQrData(decodedText)
      html5QrcodeScanner.clear()
    }

  }


  let html5QrcodeScanner = new Html5QrcodeScanner(
    'onPlaceRegScan',
    {fps: 10, qrbox: {width: 250, height: 250}},
    /* verbose= */ false)
  html5QrcodeScanner.render(onScanSuccess)


}
