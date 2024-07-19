const tabTriggers = document.querySelectorAll('[data-tab]')
if (tabTriggers) {



  // document.addEventListener('DOMContentLoaded', e => {
  //   const navigationMaps = document.querySelectorAll('.navigation__map')
  //
  //   navigationMaps?.forEach(map => {
  //     const frameEls = map.querySelectorAll('[data-state]:not(:first-child)')
  //     frameEls?.forEach(el => el.classList.add('_map-hidden'))
  //   })
  // })




  tabTriggers.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const tabWrapper = e.currentTarget.closest('.main-tab-wrapper')
      const currentTriggers = tabWrapper.querySelectorAll('[data-tab]')
      const currentStates = tabWrapper.querySelectorAll('[data-state]')

      currentTriggers.forEach(el => el.classList.remove('_active'))
      currentStates.forEach(el => el.classList.remove('_active'))

      e.currentTarget.classList.add('_active')
      const activeState = tabWrapper.querySelector(`[data-state="${e.currentTarget.dataset.tab}"]`)
      activeState.classList.add('_active')
    })
  })

}
