'use strict';

// import './config/jqueryLoad';
// import '@fancyapps/fancybox/dist/jquery.fancybox.min';
// import '../blocks/components/dropdown/dropdown.js';
import '../blocks/components/to-top/to-top.js';
import '../blocks/components/field-file/field-file.js';
import '../blocks/components/collapse/collapse.js';

var swiper = new Swiper('.js-main-slider', {
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  }
});
