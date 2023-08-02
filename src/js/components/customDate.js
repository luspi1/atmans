// Кастомный datepicker

import AirDatepicker from "air-datepicker";

const dateInput = document.querySelector('.reg-form__date-input');
let startDate = new Date('1905-09-08');
new AirDatepicker(dateInput, {
  startDate,
});
