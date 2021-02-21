'use strict';

// import './config/jqueryLoad';
// import '@fancyapps/fancybox/dist/jquery.fancybox.min';
// import '../blocks/components/dropdown/dropdown.js';
import '../blocks/components/to-top/to-top.js';
import '../blocks/components/field-file/field-file.js';
import '../blocks/components/collapse/collapse.js';

var mainSlider = new Swiper('.js-main-slider', {
  // spaceBetween: 16,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  }
});

var autoSlider = new Swiper('.js-auto-slider', {
  slidesPerView: 'auto',
  spaceBetween: 8
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
