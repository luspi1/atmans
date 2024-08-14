import {Html5QrcodeScanner} from 'html5-qrcode'
import {sendData, showInfoModal} from '../_functions'

//регистрация qr
const qrRegScan = document.querySelector('#qrRegScan')

if (qrRegScan) {

  // новый код

  const newCodeBtn = document.querySelector('.new-code-btn')

  newCodeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    location.reload()
  })


  const submitQr = async (decodedText) => {
    const qrScanner = document.querySelector('#qrRegScan')
    const dataUrl = qrScanner.dataset.script

    const data = {
      decoded: decodedText
    }
    const jsonData = JSON.stringify(data)

    try {
      const response = await sendData(jsonData, dataUrl)
      const finishedResponse = await response.json()

      const {
        status,
        errortext,
        reg_status,
        band_link,
        ticket_number,
        phone_number
      } = finishedResponse
      if (status === 'ok') {
        const qrReading = document.querySelector('.qr-reading')
        qrScanner.classList.add('hidden')
        qrReading.classList.remove('hidden')
        qrReading.classList.add(reg_status)

        if (reg_status === '_new-ticket') {
          newCodeBtn.classList.add('hidden')

          const ticketInfo = document.querySelector('.ticket-info')
          const ticketPhone = ticketInfo.querySelector('.ticket-info__phone')
          const ticketNumber = ticketInfo.querySelector('.ticket-info__number')
          const ticketLink = ticketInfo.querySelector('.ticket-info__link')

          ticketInfo.classList.remove('hidden')
          ticketPhone.textContent = phone_number
          ticketNumber.textContent = `Билет ${ticket_number}`
          ticketLink.href = band_link
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
    'qrRegScan',
    {fps: 10, qrbox: {width: 250, height: 250}},
    /* verbose= */ false)
  html5QrcodeScanner.render(onScanSuccess)


}

// регистрация браслета через qr

const bandRegScan = document.querySelector('#bandRegScan')

if (bandRegScan) {

  // новый код

  const newCodeBtn = document.querySelector('.new-code-btn')

  newCodeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    location.reload()
  })


  const submitQr = async (decodedText) => {
    const qrScanner = document.querySelector('#bandRegScan')
    const dataUrl = qrScanner.dataset.script

    const data = {
      decoded: decodedText
    }
    const jsonData = JSON.stringify(data)

    try {
      const response = await sendData(jsonData, dataUrl)
      const finishedResponse = await response.json()

      const {status, errortext, reg_status, band_number} = finishedResponse
      if (status === 'ok') {
        const qrReading = document.querySelector('.qr-reading')
        qrScanner.classList.add('hidden')
        qrReading.classList.remove('hidden')
        qrReading.classList.add(reg_status)

        if (reg_status === '_new-band') {
          const bandStatusNumber = qrReading.querySelector('.qr-reading__status._new-band')
          const bandConnectInfo = document.querySelector('.band-connect-info')

          bandStatusNumber.textContent = `браслет ${band_number}`
          bandConnectInfo.textContent = `связан с браслетом ${band_number}`
          bandConnectInfo.classList.remove('hidden')
        } else {
          newCodeBtn.classList.remove('hidden')
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
    'bandRegScan',
    {fps: 10, qrbox: {width: 250, height: 250}},
    /* verbose= */ false)
  html5QrcodeScanner.render(onScanSuccess)


}
