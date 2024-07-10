import {numberTmplInputs} from '../_functions'
import {initCustomMasks} from './inputMask'

export const initGenerateTmpl = (generateWrapper) => {

  const generateInput = generateWrapper?.querySelector('.generate-tmpl__input')
  if (!generateInput) return

  const generateContent = generateWrapper.querySelector('.generate-tmpl__content')

  const tmplId = generateInput.dataset.generateTmpl
  const searchedTmpl = document.querySelector(`#${tmplId}`)?.content


  generateInput.addEventListener('input', (e) => {
    generateContent.innerHTML = ''
    for (let i = 0; i < Number(e.currentTarget.value); i++) {
      const tmplClone = searchedTmpl.querySelector('.generate-tmpl__element')?.cloneNode(true)
      const tmplInputs = tmplClone.querySelectorAll('input, select')
      numberTmplInputs(tmplInputs, i)
      generateContent.append(tmplClone)
    }
    initCustomMasks()
  })
}
