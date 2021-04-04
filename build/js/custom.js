(function (factory) {
  typeof define === 'function' && define.amd ? define('custom', factory) :
  factory();
}((function () { 'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('to-top')) {
      document.getElementById('to-top').addEventListener('click', function (e) {
        e.preventDefault();
        var scroll = window.pageYOffset;
        var targetTop = 0;
        var scrollDiff = (scroll - targetTop) * -1;
        animate({
          duration: 500,
          timing: function (timeFraction) {
            return Math.pow(timeFraction, 4); // https://learn.javascript.ru/js-animation
          },
          draw: function (progress) {
            var scrollNow = scroll + progress * scrollDiff;
            window.scrollTo(0, scrollNow);
          }
        });
      }, false);
      window.addEventListener('scroll', visibilityToggle);
      visibilityToggle();

      function visibilityToggle() {
        if (window.pageYOffset >= 500) {
          document.getElementById('to-top').classList.add('to-top--visible');
        } else {
          document.getElementById('to-top').classList.remove('to-top--visible');
        }
      }

      function animate(_ref) {
        var timing = _ref.timing,
            draw = _ref.draw,
            duration = _ref.duration;
        var start = performance.now();
        requestAnimationFrame(function animate(time) {
          var timeFraction = (time - start) / duration;
          if (timeFraction > 1) timeFraction = 1;
          var progress = timing(timeFraction);
          draw(progress);

          if (timeFraction < 1) {
            requestAnimationFrame(animate);
          }
        });
      }
    }
  });

  /*
    Форма: работа стилизованного input[type="file"]
    Автор: Osvaldas Valutis, www.osvaldas.info (адаптировано под используемую разметку)
    Available for use under the MIT License
  */

  (function () {
    function closest(el, selector) {
      var matchesFn; // find vendor prefix

      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
        if (typeof document.body[fn] == 'function') {
          matchesFn = fn;
          return true;
        }

        return false;
      });
      var parent; // traverse parents

      while (el) {
        parent = el.parentElement;

        if (parent && parent[matchesFn](selector)) {
          return parent;
        }

        el = parent;
      }

      return null;
    }

    var inputs = document.querySelectorAll('.field-file__input');
    Array.prototype.forEach.call(inputs, function (input) {
      var label = closest(input, '.field-file').querySelector('.field-file__name-text'),
          labelVal = label.innerHTML;
      input.addEventListener('change', function (e) {
        var fileName = '';

        if (this.files && this.files.length > 1) {
          fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        } else {
          fileName = e.target.value.split('\\').pop();
        }

        if (fileName) {
          label.innerHTML = fileName;
        } else {
          label.innerHTML = labelVal;
        }
      });
    });
  })();

  const titleCollapse = document.querySelectorAll('.js-collapse-click');
  titleCollapse.forEach(elem => {
    elem.addEventListener('click', function () {
      this.parentNode.classList.toggle('active');
      const content = this.nextElementSibling;

      if (content.style.height) {
        content.style.height = null;
      } else {
        content.style.height = content.scrollHeight + 'px';
      }
    });
  });

  const fieldDoc = document.querySelectorAll('.js-field');
  const btnResetField = document.querySelectorAll('.field-text__btn-event');
  const btnPassword = document.querySelectorAll('.field-text__btn-password');

  function focus() {
    const input = this.querySelector('.field-text__input');

    if (input.value !== '') {
      this.classList.add('focus');
    } else {
      this.classList.remove('focus');
    }
  }

  function openEye() {
    const filed = this.closest('.field-text').querySelector('.field-text__input');
    this.classList.toggle('field-text__btn-password--open');

    if (this.classList.contains('field-text__btn-password--open')) {
      filed.type = 'text';
    } else {
      filed.type = 'password';
    }
  }

  function resetField() {
    this.closest('.field-text').querySelector('.field-text__input').value = '';
  }

  fieldDoc.forEach(item => {
    item.addEventListener('change', focus);
  });
  btnResetField.forEach(item => {
    item.addEventListener('click', resetField);
  });
  btnPassword.forEach(item => {
    item.addEventListener('click', openEye);
  });

  $('.js-form').each(function () {
    new ValidateForm($(this));
  });

  function ValidateForm(elem) {
    var _this = this;

    _this.elem = elem;
    this.f = true;
    this.reg = {
      Password: /^[\S]{8,}$/,
      Email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    };
    elem.on('change', '[data-required=1]', function () {
      $(this).removeClass('error');
    });
    elem.on('input', '[data-required=1]', function () {
      if (!_this.addInvalid()) {
        elem.find('.form__warning').removeClass('d-none');
      }
    });

    this.addInvalid = function (elem) {
      var parentElem = $(elem).closest('.field-text');
      parentElem.removeClass('valid');
      parentElem.addClass('error');
      _this.f = false;
    };

    this.addValid = function (elem) {
      var parentElem = $(elem).closest('.field-text');
      var parentCheckbox = $(elem).closest('.field-checkbox');
      parentElem.addClass('valid');
      parentElem.removeClass('error');
      parentCheckbox.removeClass('error');
    };

    this.isValid = function () {
      _this.f = true;

      _this.elem.find('[data-required=1]').each(function (i, elem) {
        if ($(this).val() == '') {
          _this.addInvalid(elem);
        } else if ($(this).attr('type') == 'checkbox' && !$(this).prop('checked')) {
          $(this).closest('.field-checkbox').addClass('error');
          _this.f = false;
        } else {
          _this.addValid(elem);
        }

        if (elem.classList.contains('js-calendar')) {
          const calendar = new Inputmask("99.99.9999", {
            alias: "datetime",
            placeholder: "",
            inputFormat: "dd.mm.yyyy",
            insertMode: false,
            showMaskOnHover: false,
            jitMasking: true
          }).mask(document.querySelectorAll(".js-calendar"));

          if (!calendar.isComplete()) {
            _this.addInvalid(elem);
          }
        }

        if (elem.type == 'tel') {
          const tel = new Inputmask({
            mask: "+7 (999) 999 99 99",
            showMaskOnHover: false
          }).mask(document.querySelectorAll("[type='tel']"));

          if (!tel.isComplete()) {
            _this.addInvalid(elem);
          }
        }

        if ($(this).data('type') == "password") {
          var value = $(this).val();

          if ($(this).hasClass('js-check')) {
            if (value !== $('.js-input-elem').val()) {
              _this.addInvalid(elem);
            }
          }

          if (_this.reg.Password.test(value) == false) {
            _this.addInvalid(elem);
          }
        }

        if ($(this).attr('type') == 'file') {
          _this.f = true;
        }

        if ($(this).data('type') == "email") {
          var value = $(this).val();

          if (_this.reg.Email.test(value) == false) {
            _this.addInvalid(elem);
          }
        }
      });

      return _this.f;
    };
  }

  $(".js-form").on("submit", function (e) {
    var validForm = new ValidateForm($(this));

    if (validForm.isValid()) {
      return true;
    }

    return false;
  });

  $('[data-fancybox]').fancybox({
    touch: false
  });
  new Inputmask({
    mask: "+7 (999) 999 99 99",
    showMaskOnHover: false
  }).mask(document.querySelectorAll("[type='tel']"));
  new Swiper('.js-product-slider', {
    loop: true,
    mousewheel: {
      forceToAxis: true
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true
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
      mousewheel: {
        forceToAxis: true
      },
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true
      },
      breakpoints: {
        1200: {
          slidesPerView: sliderAmount,
          spaceBetween: 1,
          loop: sliderLoop
        }
      }
    });
  }

  new Swiper('.js-company-slider', {
    loop: true,
    mousewheel: {
      forceToAxis: true
    },
    spaceBetween: 8,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true
    }
  });
  var autoSlider = new Swiper('.js-auto-slider', {
    slidesPerView: 'auto',
    mousewheel: {
      forceToAxis: true
    },
    spaceBetween: 8,
    breakpoints: {
      1200: {
        spaceBetween: 12
      }
    }
  });
  new Swiper('.js-personal-slider', {
    slidesPerView: 'auto',
    mousewheel: {
      forceToAxis: true
    },
    spaceBetween: 8,
    breakpoints: {
      1200: {
        spaceBetween: 38
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
    parents.find(".tab-filter__btn.active").each(function () {
      if ($(this).data("btn-filter") === 'all') {
        parents.find(blockFilter).removeAttr("hidden");
        autoSlider.update();
      } else {
        $('[data-filter="' + $(this).data("btn-filter") + '"]').removeAttr("hidden");
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
    });
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

})));
