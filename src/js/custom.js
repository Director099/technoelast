'use strict';

import '../blocks/components/to-top/to-top.js';
import '../blocks/components/field-file/field-file.js';
import '../blocks/components/collapse/collapse.js';
import '../blocks/components/field-text/field-text.js';
import '../blocks/components/form/form.js';
import {FormStep} from "../blocks/components/form-step/form-step";

$('[data-fancybox]').fancybox({
  touch: false
});

function MainPaginationSlider(slider) {
  const elemSliders = slider.querySelectorAll('.swiper-slide');
  const option = {
    el: '.swiper-pagination',
    dynamicBullets: true,
  };

  if (elemSliders.length === 1) {
    return false
  }

  if (window.matchMedia("(min-width: 1200px)").matches && elemSliders.length <= 3) {
    return false
  }

  return option;
}

function paginationSlides(slider) {
  const elemSliders = slider.querySelectorAll('.swiper-slide');
  const option = {
    el: slider.parentNode.querySelector('.swiper-pagination'),
    dynamicBullets: true,
  };

  if (elemSliders.length === 1) {
    const link = slider.querySelector('.main-content__slide[href]');
    link ? slider.classList.add('hover-slide') : '';
    return false
  }

  return option;
}

new Inputmask({
  mask: "+7 (X99) 999-9999",
  definitions: {
    'X': {
      validator: "[1, 2, 3, 4, 5, 6, 9, 0]",
    },
  },
  showMaskOnHover: false
}).mask(document.querySelectorAll("[type='tel']"));


const productSlider = document.querySelector('.js-product-slider');
if (productSlider) {
  new Swiper(productSlider, {
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: productSlider.parentNode.querySelector('.swiper-button-next'),
      prevEl: productSlider.parentNode.querySelector('.swiper-button-prev'),
    },
    pagination: paginationSlides(productSlider)
  });
}
const mainSlider = document.querySelector('.js-main-slider');

if (mainSlider) {
  const allMainSlides = mainSlider.querySelectorAll('.js-main-slider .swiper-slide');

  const MAX_LENGTH_SLIDER = 3;

  function countSlider(elem, numberCount) {
    if (elem.length < numberCount) {
      return allMainSlides.length;
    } else {
      return 3;
    }
  }

  if (allMainSlides.length > 1) {
    new Swiper(mainSlider, {
      mousewheel: {
        forceToAxis: true,
      },
      pagination: MainPaginationSlider(mainSlider),
      navigation: {
        nextEl: mainSlider.parentNode.querySelector('.swiper-button-next'),
        prevEl: mainSlider.parentNode.querySelector('.swiper-button-prev'),
      },
      breakpoints: {
        1200: {
          slidesPerView: countSlider(allMainSlides, MAX_LENGTH_SLIDER),
          spaceBetween: 1,
        }
      }
    });
  } else {
    mainSlider.parentNode.querySelector('.swiper-button-next').classList.add('d-none');
    mainSlider.parentNode.querySelector('.swiper-button-prev').classList.add('d-none');
  }
}

const jsCompanySlider = document.querySelectorAll('.js-company-slider');

if(jsCompanySlider) {
  jsCompanySlider.forEach(item => {
    new Swiper(item, {
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        nextEl: item.parentNode.querySelector('.swiper-button-next'),
        prevEl: item.parentNode.querySelector('.swiper-button-prev'),
      },
      spaceBetween: 8,
      pagination: paginationSlides(item),
    });
  })
}

const initialAutoSlider = document.querySelectorAll('.js-auto-slider');
var autoSlider;

initialAutoSlider.forEach(function (item) {
  autoSlider = new Swiper(item, {
    slidesPerView: 'auto',
    mousewheel: {
      forceToAxis: true,
    },
    spaceBetween: 8,
    navigation: {
      nextEl: item.parentNode.querySelector('.swiper-button-next'),
      prevEl: item.parentNode.querySelector('.swiper-button-prev'),
    },
    breakpoints: {
      1200: {
        spaceBetween: 12,
      }
    }
  });
});


const personalSlider = document.querySelector('.js-personal-slider');

if(personalSlider) {
  new Swiper(personalSlider, {
    slidesPerView: 'auto',
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: personalSlider.parentNode.querySelector('.swiper-button-next'),
      prevEl: personalSlider.parentNode.querySelector('.swiper-button-prev'),
    },
    spaceBetween: 8,
    breakpoints: {
      1200: {
        spaceBetween: 38,
      }
    }
  });
}

// TODO: лучше добавить класс js-hover-menu
const hoverMenu = document.querySelector('.nav-list__item--hover');
if (hoverMenu) {
  const hoverNav = hoverMenu.closest('.nav-list');

  hoverMenu.addEventListener('mouseover', function () {
    const _this = this;
    const listMenu = _this.querySelector('.nav-list__sub-item');
    listMenu.style.display = 'block';
    listMenu.style.height = listMenu.scrollHeight + 'px';
    _this.classList.add('active');
    _this.style.height = 'auto' // Решение бага удвоенный бордер(на ss все перепробовал)
  });

  hoverNav.addEventListener('mouseleave', function (e) {
    const _this = this;
    const listMenu = _this.querySelector('.nav-list__sub-item');
    listMenu.style.height = 0;
    // _this.querySelector('.nav-list__item--hover').classList.remove('active');
  });
}

const btnFilter = $('[data-btn-filter]');
const blockFilter = $("[data-filter]");
const fancyBoxSliders = $("[data-fancybox]");

btnFilter.on("click", function () {
  const parents = $(this).parents('.section-content__wrap');
  parents.find(btnFilter).removeClass("active");
  $(this).addClass("active");
  parents.find(blockFilter).attr("hidden", "");

  parents.find(".tab-filter__btn.active").each(function(){
    if ($(this).data("btn-filter") === 'all') {
      parents.find(blockFilter).removeAttr("hidden");
      parents.find(fancyBoxSliders).attr('data-fancybox', 'all');
      autoSlider.update;
    } else {
      let elemHiddens = $('[data-filter="'+$(this).data("btn-filter")+'"]');
      elemHiddens.removeAttr("hidden");
      elemHiddens.find(fancyBoxSliders).attr('data-fancybox', $(this).data("btn-filter"));
      autoSlider.update;
    }
  });
});

const btnToggleText = document.querySelectorAll('.js-desc-toggle');

btnToggleText.forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    const prevElemnt = item.previousElementSibling;
    prevElemnt.classList.toggle('active');
    if (prevElemnt.classList.contains('active')) {
      item.textContent = 'Свернуть';
    } else {
      item.textContent = 'Подробнее ›';
    }
  })
});

const charBlock = document.querySelectorAll('.js-char-clamp');
charBlock.forEach((item) => {
  const btnToggle = item.parentNode.querySelector('.js-desc-toggle');
  const lengthItemChar = item.querySelectorAll('.table-char__item').length;
  const CharHidden = {
    Mob: 8,
    Desc: 3
  };

  if (window.matchMedia("(max-width: 1199px)").matches && lengthItemChar <= CharHidden.Mob) {
    btnToggle.classList.add('d-none');
  }

  if (window.matchMedia("(min-width: 1200px)").matches && lengthItemChar <= CharHidden.Desc) {
    btnToggle.classList.add('d-none');
  }
});

window.addEventListener('load', function () {
  var blockText = document.querySelectorAll('.js-line-clamp');
  if (blockText.length === 0) return;
  for (var i = 0; i < blockText.length; i++) {
    var lc = blockText[i].parentNode.querySelector('.js-desc-toggle');
    if (blockText[i].offsetHeight < blockText[i].scrollHeight) {
        lc.classList.display = 'block';
      } else {
        lc.style.display = 'none';
      }
    }
});

const elemsFormStep = document.querySelectorAll(".js-form-step");

elemsFormStep.forEach((elem) => {
  const fieldCheckInput = elem.querySelectorAll('[type="checkbox"], [type="radio"]');
  const formStep = new FormStep(elem, {
    parentGroup: '.form__fieldset',
    btnNext: '.js-form-next',
    btnPrev: '.js-form-prev',
    onNextHandler: ($currentElementStep, cb) => {
      const allCheckInputGroup = $currentElementStep.querySelectorAll('input:checked');
      cb(allCheckInputGroup.length !== 0)
    }
  });

  let timeout;

  function startTimeout(btnElem) {
    timeout = setTimeout(() => {
      btnElem.classList.remove('animated');
      formStep.stepNext()
    }, 1500); // ХЗ сколько поставить, написано 0,7 но это пздц
  }

  function stopTimeout(btnElem) {
    btnElem.classList.add('animated');
    clearTimeout(timeout);
  }

  fieldCheckInput.forEach((input) => {
    input.addEventListener('click', (evt) => {
      const btnNext = evt.target.closest('.form__fieldset').querySelector('.js-form-next');
      stopTimeout(btnNext);
      startTimeout(btnNext);
    })
  })
});


const fieldTextarea = $('.js-tx-auto-height');

fieldTextarea.on('keyup paste', function() {
  var $el = $(this),
    offset = $el.innerHeight() - $el.height();

  if ($el.innerHeight() < this.scrollHeight) {
    $el.height(this.scrollHeight - offset);
  } else {
    $el.height(1);
    $el.height(this.scrollHeight - offset);
  }
});

const btnShare = document.querySelectorAll('.js-share');
if(btnShare.length > 0) {
  btnShare.forEach((elem) => {
    elem.addEventListener("click", () => elem.classList.toggle("active"));
  });

  window.addEventListener('click', (e) => {
    if (!e.target.matches('.js-share')) {
      btnShare.forEach((item) => {
        if (!e.target.matches('.js-buffer-copy')) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      })
    }
  })
}

const fieldShareCopy = document.querySelectorAll('.js-buffer-copy');
fieldShareCopy.forEach((elem) => {
  elem.addEventListener('click', (e) => {
    const input = e.currentTarget.querySelector('input');
    const inputText = e.currentTarget.querySelector('.btn-icon__share-text');
    input.select();
    inputText.textContent = 'Copied';
    document.execCommand('copy');
  });
});

const btnIcon = document.querySelectorAll('.js-btn-icon');
btnIcon.forEach(elem => {
  const dislike = elem.dataset.icon === 'dislike';
  const like = elem.dataset.icon === 'like';
  const parent = elem.closest('.main-content__footer-user-evt');
  const btnDislike = parent.querySelector('[data-icon="dislike"]');
  const btnLike = parent.querySelector('[data-icon="like"]');
  let currentCount = Number(btnLike.dataset.count);

  const MAX_NUMBER_FORMATTING = 1000;
  like ? elem.insertAdjacentHTML('beforeend', `<span class="btn-icon__text"></span>`) : '';
  const textCount = btnLike.querySelector('.btn-icon__text');
  const isNumberFormatting = MAX_NUMBER_FORMATTING > currentCount;
  const stringCurrentCount = String(currentCount).slice(0, -2);
  const lastStringCurrentCount = stringCurrentCount.length;
  const isTotalCount = isNumberFormatting ? currentCount : String(currentCount).slice(0, -3) + `,${stringCurrentCount[lastStringCurrentCount - 1]} k`;
  const isZero = currentCount > 0 ? isTotalCount : '';

  textCount.textContent = isZero;

  elem.addEventListener('click', e => {
    elem.classList.toggle('active');

    if (like) btnDislike.classList.remove('active');

    if (dislike && btnLike.classList.contains('active')) {
      btnLike.classList.remove('active');
      textCount.textContent = isZero;
    }

    if (like) {
      if (btnLike.classList.contains('active')) {
        textCount.textContent = isNumberFormatting ? currentCount + 1 : isZero;
      } else {
        textCount.textContent = isZero;
      }
    }
  });
});

