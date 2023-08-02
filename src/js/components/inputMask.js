// Маска поля "телефон"
import Inputmask from "inputmask";

export const initInputMask = () => {
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

}

