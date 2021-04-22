'use strict';

// import './config/jqueryLoad';
// import '@fancyapps/fancybox/dist/jquery.fancybox.min';
// import '../blocks/components/dropdown/dropdown.js';
import '../blocks/components/to-top/to-top.js';
import '../blocks/components/field-file/field-file.js';
import '../blocks/components/collapse/collapse.js';
import '../blocks/components/field-text/field-text.js';
import '../blocks/components/form/form.js';

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
    el: '.swiper-pagination',
    dynamicBullets: true,
  };

  if (elemSliders.length === 1) {
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
      breakpoints: {
        1200: {
          slidesPerView: countSlider(allMainSlides, MAX_LENGTH_SLIDER),
          spaceBetween: 1,
        }
      }
    });
  }
}

const companySlider = document.querySelector('.js-company-slider');
if(companySlider) {
  new Swiper(companySlider, {
    mousewheel: {
      forceToAxis: true,
    },
    spaceBetween: 8,
    pagination: paginationSlides(companySlider),
  });
}

var autoSlider = new Swiper('.js-auto-slider', {
  slidesPerView: 'auto',
  mousewheel: {
    forceToAxis: true,
  },
  spaceBetween: 8,
  breakpoints: {
    1200: {
      spaceBetween: 12,
    }
  }
});

var personalSlider = new Swiper('.js-personal-slider', {
  slidesPerView: 'auto',
  mousewheel: {
    forceToAxis: true,
  },
  spaceBetween: 8,
  breakpoints: {
    1200: {
      spaceBetween: 38,
    }
  }
});

const btnFilter = $('[data-btn-filter]');
const blockFilter = $("[data-filter]");

btnFilter.on("click", function () {
  const parents = $(this).parents('.section-content__wrap');
  parents.find(btnFilter).removeClass("active");
  $(this).addClass("active");
  parents.find('[data-filter]').attr("hidden", "");

  parents.find(".tab-filter__btn.active").each(function(){
    if ($(this).data("btn-filter") === 'all') {
      parents.find(blockFilter).removeAttr("hidden");
      autoSlider.update();
    } else {
      $('[data-filter="'+$(this).data("btn-filter")+'"]').removeAttr("hidden");
      autoSlider.update();
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

const wrapCheckForm = document.querySelectorAll('.js-check-group');

if(wrapCheckForm) {
  wrapCheckForm.forEach((elem) => {
    const btnElemNext = elem.querySelector('.js-form-next');
    const btnElemPrev = elem.querySelector('.js-form-prev');

    if (btnElemPrev) {
      btnElemPrev.addEventListener('click', () => {
        let parent = elem.closest('.form__fieldset');
        parent.classList.add('d-none');
        parent.previousElementSibling.classList.remove('d-none');
      });
    }

    if (btnElemNext) {
      btnElemNext.addEventListener('click', () => {
        if (elem.querySelectorAll('input:checked').length === 0) return false;
        let parent = elem.closest('.form__fieldset');
        parent.classList.add('d-none');
        parent.nextElementSibling.classList.remove('d-none');
      });
    }
  });
}
