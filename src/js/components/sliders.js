import { Swiper } from "swiper/bundle";

// Инициализация слайдеров
export const swiperHeader= new Swiper('.header__slider', {
  navigation: {
    nextEl: '.header__slider-button-next',
    prevEl: '.header__slider-button-prev'
  },

  slidesPerView: 1,
  spaceBetween: 5,
  breakpoints: {

    1025: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    1280: {
      spaceBetween: 10,
      slidesPerView: 2,
    },
    1400: {
      spaceBetween: 10,
      slidesPerView: 2,
    },
    1405: {
      spaceBetween: 15,
      slidesPerView: 3,
    },
  }
});

export const swiperCaption= new Swiper('.caption__slider', {
  navigation: {
    nextEl: '.caption__slider-button-next',
    prevEl: '.caption__slider-button-prev'
  },
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',
  slidesPerView: 1,
});

export const swiperOrganizers= new Swiper('.organizers__slider', {
  navigation: {
    nextEl: '.organizers__slider-button-next',
    prevEl: '.organizers__slider-button-prev'
  },

  slidesPerView: 1,
  spaceBetween: 14,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 14,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 14,
    },
    1280: {
      spaceBetween: 14,
      slidesPerView: 7,
    },
  }
});
export const swiperTimeline= new Swiper('.time-line__slider', {
  navigation: {
    nextEl: '.time-line__slider-button-next',
    prevEl: '.time-line__slider-button-prev'
  },

  slidesPerView: 1,
  spaceBetween: 20,

  breakpoints: {
    420: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1280: {
      spaceBetween: 25,
      slidesPerView: 7,
    },
  }
});

export const swiperNews= new Swiper('.news__slider', {
  navigation: {
    nextEl: '.news__slider-button-next',
    prevEl: '.news__slider-button-prev'
  },

  slidesPerView: 1,
  spaceBetween: 15,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1280: {
      spaceBetween: 36,
      slidesPerView: 4,
    },
  }
});

export const swiperEvents= new Swiper('.events__slider', {
  navigation: {
    nextEl: '.events__slider-button-next',
    prevEl: '.events__slider-button-prev'
  },

  slidesPerView: 1,
  spaceBetween: 15,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1280: {
      spaceBetween: 36,
      slidesPerView: 4,
    },
  }
});

export const swiperSponsors= new Swiper('.sponsors__slider', {
  navigation: {
    nextEl: '.sponsors__slider-button-next',
    prevEl: '.sponsors__slider-button-prev'
  },

  slidesPerView: 1,
  spaceBetween: 15,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 15
    },
    1280: {
      spaceBetween: 14,
      slidesPerView: 7,
    },
  }
});
















