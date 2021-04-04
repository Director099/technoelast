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

new Inputmask({
  mask: "+7 (999) 999 99 99",
  showMaskOnHover: false
}).mask(document.querySelectorAll("[type='tel']"));

var productSlider = new Swiper('.js-product-slider', {
  loop: true,
  mousewheel: true,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  }
});

const mainSlider = document.querySelector('.js-main-slider');

if (mainSlider) {
  const allMainSlides = mainSlider.querySelectorAll('.js-main-slider .swiper-slide');
  const sliderPagination = mainSlider.parentNode.querySelector('.swiper-pagination');

  const MAX_LENGTH_SLIDER = 3;
  let sliderAmount = null;
  let sliderLoop = null;

  if (allMainSlides.length === 1) {
    sliderPagination.classList.add('d-none');
  }

  if (allMainSlides.length < MAX_LENGTH_SLIDER) {
    sliderAmount = allMainSlides.length;
    sliderLoop = false;
  } else {
    sliderAmount = 3;
    sliderLoop = true;
  }

  new Swiper(mainSlider, {
    loop: true,
    mousewheel: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    breakpoints: {
      1200: {
        slidesPerView: sliderAmount,
        spaceBetween: 1,
        loop: sliderLoop,
      }
    }
  });
}







var companySlider = new Swiper('.js-company-slider', {
  loop: true,
  mousewheel: true,
  spaceBetween: 8,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
});

var autoSlider = new Swiper('.js-auto-slider', {
  slidesPerView: 'auto',
  mousewheel: true,
  spaceBetween: 8,
  breakpoints: {
    1200: {
      spaceBetween: 12,
    }
  }
});

var personalSlider = new Swiper('.js-personal-slider', {
  slidesPerView: 'auto',
  mousewheel: true,
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





