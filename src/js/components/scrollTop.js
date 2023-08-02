const scrollBtn = document.querySelector('#scrollTop')


window.addEventListener('scroll', (e) => {
  e.preventDefault()
  if (scrollBtn ) {
    if (window.scrollY > 600) {
      scrollBtn.classList.remove('_hide')
    } else {
      scrollBtn.classList.add('_hide')
    }
  }
})

if (scrollBtn) {
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault()
    window.scrollBy({
      top: -99999,
      behavior: 'smooth'
    });

  })
}
