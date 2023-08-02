const tabBtns = document.querySelectorAll('.program__date-btn')
const tabs = document.querySelectorAll('.program__lists')

const removeClasses = (arr, className) => {
  arr.forEach(el => {
    if (el.classList.contains(className)) {
      el.classList.remove(className)
    }
  })
}

// Управление состоянием табов в разделе "Программа"
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!btn.classList.contains('_active')) {
      removeClasses(tabBtns, '_active')
      btn.classList.add('_active')
      tabs.forEach(tab => {
        if (tab.classList.contains('_active')) {
          tab.classList.remove('_active')
        } else {
          tab.classList.add('_active')
        }
      })
    }
  })
})
