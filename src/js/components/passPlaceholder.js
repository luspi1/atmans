const passInputs = document.querySelectorAll('.main-input._pass')

if (passInputs?.length) {
  passInputs.forEach(inputEl => {
    inputEl.addEventListener('input', (e) => {
      if (e.currentTarget.value) {
        e.currentTarget.classList.add('_no-bg')
      } else {
        e.currentTarget.classList.remove('_no-bg')
      }
    })
  })
}
