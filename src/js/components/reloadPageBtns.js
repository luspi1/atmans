const reloadPageBtns = document.querySelectorAll('.reload-page-btn')

if (reloadPageBtns?.length) {
  reloadPageBtns.forEach(btnEl => {
    btnEl.addEventListener('click', (e) => {
      e.preventDefault()
      location.reload()
    })
  })
}
