const tabTriggers = document.querySelectorAll('[data-tab]')
if (tabTriggers) {

  tabTriggers.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const tabWrapper = e.currentTarget.closest('.main-tab-wrapper')
      const currentTriggers = tabWrapper.querySelectorAll('[data-tab]')
      const currentStates = tabWrapper.querySelectorAll('[data-state]')
      if (!e.currentTarget.classList.contains('_active')) {
        currentTriggers.forEach(el => el.classList.toggle('_active'))
        currentStates.forEach(el => el.classList.toggle('hidden'))
      }
    })
  })

}
