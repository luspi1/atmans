import {removeClasses} from "../_functions";

const navTabs = document.querySelectorAll('.navigation .navigation__list-item')

if (navTabs) {

  const navMap = document.querySelector('.navigation__map')

  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      if (!e.currentTarget.classList.contains('_active')) {

        const targetState = e.currentTarget.dataset.map
        removeClasses(navTabs, '_active')
        e.currentTarget.classList.add('_active')
        navMap.dataset.state = targetState
      }
    })
  })

}
