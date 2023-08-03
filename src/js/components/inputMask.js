// Маска поля "телефон"
import Inputmask from "inputmask";

const regPhoneInput = document.querySelector('.reg-form__phone-input');
const contactPhoneInput = document.querySelector('.contact-form__phone-input');

if (regPhoneInput && contactPhoneInput) {
  Inputmask({
    "mask": "+7 (999) 999-99-99",
    showMaskOnHover: false
  }).mask(contactPhoneInput);
  Inputmask({
    "mask": "+7 (999) 999-99-99",
    showMaskOnHover: false
  }).mask(regPhoneInput);
}


export const initCustomMasks = () => {
  const dateCustomMasks = document.querySelectorAll("input[data-custom-mask]")
  if (dateCustomMasks) {
    dateCustomMasks.forEach(el => {
      Inputmask({
        "mask": el.dataset.customMask,
        showMaskOnHover: false,
        showMaskOnFocus: false,
      }).mask(el)
    })
  }

  const numberMasks = document.querySelectorAll('.number-mask')
  if (numberMasks) {
    numberMasks.forEach(itemMask => {
      Inputmask({
        alias: 'numeric',
        allowMinus: false,
        showMaskOnHover: false,
        showMaskOnFocus: false,
        shortcuts: null
      }).mask(itemMask)
    })
  }
  const personsMasks = document.querySelectorAll('.persons-mask')
  if (personsMasks) {
    personsMasks.forEach(itemMask => {
      Inputmask({
        alias: 'numeric',
        allowMinus: false,
        showMaskOnHover: false,
        showMaskOnFocus: false,
        shortcuts: null,
        max: 99,
        min: 2,
      }).mask(itemMask)
    })
  }


}

initCustomMasks()
