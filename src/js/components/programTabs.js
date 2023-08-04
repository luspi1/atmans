import {removeClasses} from "../_functions";

const tabBtns = document.querySelectorAll('.program__date-btn')
const tabs = document.querySelectorAll('.program__lists')



// Управление состоянием табов в разделе "Программа"
tabBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    if (!btn.classList.contains('_active')) {
      removeClasses(tabBtns, '_active')
      removeClasses(tabs, '_active')
      btn.classList.add('_active')
      const currentTab = document.querySelector(`.program__lists[data-list="${i + 1}"]`)
      currentTab.classList.add('_active')
    }
  })
})
