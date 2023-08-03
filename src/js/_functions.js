// Фунцкия отправки fetch запросов
import {infoModal} from "./_vars";

export const serializeForm = (formNode) => {
  return new FormData(formNode)
}
export async function sendData(data, url) {

  // установка времени прерывания запроса
  let controller = new AbortController()
  setTimeout(() => controller.abort(), 6000)

  return await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    body: data,
    signal: controller.signal
  })
}

export const showInfoModal = (responseText) => {
  infoModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('info-modal')) {
      infoModal.classList.add('hidden')
    }

  })
  const modalText = infoModal.querySelector('.info-modal__content-text')
  modalText.textContent = responseText
  infoModal.classList.remove('hidden')
}
