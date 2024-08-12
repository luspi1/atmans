import {Html5QrcodeScanner} from "html5-qrcode";
import {sendData, showInfoModal} from "../_functions";

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

      const {status, errortext, reg_status} = finishedResponse
      if (status === 'ok') {
        const qrReading = document.querySelector('.qr-reading')
        qrScanner.classList.add('hidden')
        qrReading.classList.remove('hidden')
        qrReading.classList.add(reg_status)
        // newCodeBtn.classList.add('hidden')
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }
  }

  let lastResult
  let countResults = 0;
  function onScanSuccess(decodedText) {
    if (decodedText !== lastResult) {
      ++countResults;
      lastResult = decodedText;
      submitQr(lastResult)
        .then(() => html5QrcodeScanner.clear())
    }

  }


  let html5QrcodeScanner = new Html5QrcodeScanner(
    "qrRegScan",
    {fps: 10, qrbox: {width: 250, height: 250}},
    /* verbose= */ false);
  html5QrcodeScanner.render(onScanSuccess);


}
