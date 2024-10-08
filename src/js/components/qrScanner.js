import {Html5QrcodeScanner} from 'html5-qrcode'
import {sendData, showInfoModal} from '../_functions'

const qrScanner = document.querySelector('#qrScanner')

if (qrScanner) {
  // новый код

  const newCodeBtn = document.querySelector('.new-code-btn')

  newCodeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    location.reload()
  })
  const submitQr = async (decodedText) => {
    const qrScanner = document.querySelector('#qrScanner')
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
        guest_status,
        fio,
        group_name,
        code,
        minutes
      } = finishedResponse
      if (status === 'ok') {
        const qrReading = document.querySelector('.qr-reading')
        const qrReadingMinutes = qrReading?.querySelector('span')
        qrScanner.classList.add('hidden')
        qrReading.classList.remove('hidden')
        qrReading.classList.add(guest_status)
        newCodeBtn.classList.remove('hidden')
        if ((guest_status === '_cooldown') && qrReadingMinutes) {
          qrReadingMinutes.textContent = minutes
        }

        if (guest_status === '_guest') {
          const guestContainer = document.querySelector('.qr-scanner__one-guest')
          const guestName = guestContainer?.querySelector('.guest-name')
          const guestCode = guestContainer?.querySelector('.guest-code')
          if (guestName) {
            guestName.textContent = fio
          }

          if (guestCode) {
            guestCode.textContent = code
          }

          if (guestContainer) {
            guestContainer.classList.remove('hidden')
          }
        }
        if (guest_status === '_group') {
          const groupContainer = document.querySelector('.qr-scanner__group')
          const groupName = groupContainer.querySelector('.group-name')
          const groupLeader = groupContainer.querySelector('.group-leader')
          const groupCode = groupContainer.querySelector('.group-code')

          groupName.textContent = group_name
          groupLeader.textContent = fio
          groupCode.textContent = code
          groupContainer.classList.remove('hidden')
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
    'qrScanner',
    {fps: 10, qrbox: {width: 250, height: 250}},
    /* verbose= */ false)
  html5QrcodeScanner.render(onScanSuccess)

}
