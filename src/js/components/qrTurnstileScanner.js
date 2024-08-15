import {Html5QrcodeScanner} from "html5-qrcode";
import {sendData, showInfoModal} from "../_functions";

const turnstilePage = document.querySelector('.turnstile-scan-page')


if (turnstilePage) {
  let port
  let writer

  let timerId
  let timerId2
  let gercon
  let walkfinish

  // Подключение к порту турникета

  const connectTurnstileBtn = turnstilePage.querySelector('.turnstile-scan-page__connect-gate-btn')

  connectTurnstileBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    port = await navigator.serial.requestPort()

    await port.open({baudRate: 19200})

    writer = port.writable.getWriter()

    console.log('connect')

    const closedPromise = readUntilClosed()

  })

  // открытие турникета
  function finishscan() {

    // currentTime = getDateTime()
    if (gercon == true) {
//		document.getElementById("logtext").value += '\n--- РџСЂРѕС…РѕРґ СЃРѕСЃС‚РѕСЏР»СЃСЏ ?--- '+currentTime;
    } else {
      document.getElementById('logtext').value += '\n--- РџСЂРѕС…РѕРґ РЅРµ СЃРѕСЃС‚РѕСЏР»СЃСЏ --- ' + currentTime
    }
    clearTimeout(timerId)
    clearTimeout(timerId2)
  }

  function finishwalk() {
    console.log('Р—Р°РІРµСЂС€Р°РµРј РїСЂРѕС…РѕРґ РґРѕСЃСЂРѕС‡РЅРѕ')
    clearTimeout(timerId)
    clearTimeout(timerId2)
  }

  const openTurnstile = async () => {
    const data = new Uint8Array([250, 1, 1, 7, 0, 7, 245]) //

    // currentTime = getDateTime()

    await writer.write(data)

    document.getElementById('logtext').value += '--- РћС‚РєСЂС‹РІР°РµРј Р·Р°РјРѕРє --- ' + currentTime
    gercon = false
    walkfinish = false
    data.forEach(function (entry) {
      const tohex = entry.toString(16)
    })

    timerId = setInterval(getanswer, 200)

    setTimeout(finishscan, 6000)
    timerId2 = setInterval(checkstatus, 300)
  }




  // скрипт отправки qr

  const submitQr = async (decodedText) => {
    const qrScanner = document.querySelector('#qrTurnstileScanner')
    const dataUrl = qrScanner.dataset.script

    const data = {
      decoded: decodedText
    }
    const jsonData = JSON.stringify(data)

    try {
      const response = await sendData(jsonData, dataUrl)
      const finishedResponse = await response.json()

      const {status, errortext, guest_status, fio, group_name, code, minutes} = finishedResponse
      if (status === 'ok') {
        // const qrReading = document.querySelector('.qr-reading')
        // qrScanner.classList.add('hidden')
        // qrReading.classList.remove('hidden')
        // qrReading.classList.add(guest_status)

        console.log(`код получен: ${data?.decoded}`)

        openTurnstile()
        setTimeout(() => {
          // qrScanner.classList.remove('hidden')
          // qrReading.classList.add('hidden')
          // qrReading.classList.remove(guest_status)
          html5QrcodeScanner.render(onScanSuccess)
        }, 5000)

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
    "qrTurnstileScanner",
    {fps: 10, qrbox: {width: 250, height: 250}},
    /* verbose= */ false);
  html5QrcodeScanner.render(onScanSuccess);

}
