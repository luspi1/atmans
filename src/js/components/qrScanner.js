import {Html5QrcodeScanner} from "html5-qrcode";
import {sendData, showInfoModal} from "../_functions";

const qrScanner = document.querySelector('#qrScanner')

if (qrScanner) {

  async function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    // console.log(`Code matched = ${decodedText}`, decodedResult);

    const qrScanner = document.querySelector('#qrScanner')

    const dataUrl = qrScanner.dataset.script

    const data = {
      decoded: decodedText
    }
    const jsonData = JSON.stringify(data)

    try {
      const response = await sendData(jsonData, dataUrl)
      const finishedResponse = await response.json()

      const {status, errortext, guest_status} = finishedResponse
      if (status === 'ok') {
        const qrReading = document.querySelector('.qr-reading')
        qrScanner.classList.add('hidden')
        qrReading.classList.remove('hidden')
        qrReading.classList.add(guest_status)
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal("Во время выполнения запроса произошла ошибка")
      console.error(err)
    }


  }

  function onScanFailure(error) {
    showInfoModal(`Во время выполнения запроса произошла ошибка: ${error}`)
  }

  let html5QrcodeScanner = new Html5QrcodeScanner(
    "qrScanner",
    {fps: 10, qrbox: {width: 250, height: 250}},
    /* verbose= */ false);
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);




}
