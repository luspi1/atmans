import {Html5QrcodeScanner} from "html5-qrcode";

const qrScanner = document.querySelector('#qrScanner')

if (qrScanner) {
  function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    // console.log(`Code matched = ${decodedText}`, decodedResult);
    const qrReading = document.querySelector('.qr-reading ')
    qrReading.classList.remove('hidden')
    qrScanner.classList.add('hidden')
  }

  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }

  let html5QrcodeScanner = new Html5QrcodeScanner(
    "qrScanner",
    { fps: 10, qrbox: {width: 250, height: 250} },
    /* verbose= */ false);
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);


  const cameraBtn = qrScanner.querySelector('#html5-qrcode-button-camera-permission')
  cameraBtn.textContent = "наведите телефон на QR-КОД"

}
