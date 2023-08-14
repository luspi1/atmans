// Фунцкия отправки fetch запросов
import {infoModal} from "./_vars";


export const removeClasses = (arr, className) => {
  arr.forEach(el => {
    if (el.classList.contains(className)) {
      el.classList.remove(className)
    }
  })
}

// Преобразование formData в объект
export const formToObj = (formData) => {
  return Array.from(formData.entries()).reduce((memo, pair) => ({
    ...memo,
    [pair[0]]: pair[1],
  }), {})
}

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
  modalText.innerHTML = responseText
  infoModal.classList.remove('hidden')
}
