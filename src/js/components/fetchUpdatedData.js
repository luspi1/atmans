import {sendData, showInfoModal} from '../_functions'

const fetchUpdatedData = document.querySelector('.fetched-updated-data')

if (fetchUpdatedData) {
  const updatedScript = fetchUpdatedData.dataset.script
  const dataInterval = fetchUpdatedData.dataset.interval

  const fetchNewData = async () => {
    try {
      const response = await sendData(null, updatedScript)
      const finishedResponse = await response.json()
      const {
        status,
        errortext,
        html,
        updatedate
      } = finishedResponse
      if (status === 'ok') {
        fetchUpdatedData.querySelector('.fetched-updated-data__date').innerHTML = updatedate
        fetchUpdatedData.querySelector('.fetched-updated-data__content').innerHTML = html
      } else {
        showInfoModal(errortext)
      }
    } catch (err) {
      showInfoModal('Во время выполнения запроса произошла ошибка')
      console.error(err)
    }
  }

  setInterval(() => {
    fetchNewData()
  }, +dataInterval ?? 5000)

  fetchNewData()
}
