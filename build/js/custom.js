(function (factory) {
  typeof define === 'function' && define.amd ? define('custom', factory) :
  factory();
})((function () { 'use strict';

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
          new Inputmask({
            mask: "+7 (999) 999 99 99",
            showMaskOnHover: false
          }).mask(document.querySelectorAll("[type='tel']")); // if (!tel.isComplete()) {
          //   _this.addInvalid(elem);
          // }
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

  function MainPaginationSlider(slider) {
    const elemSliders = slider.querySelectorAll('.swiper-slide');
    const option = {
      el: '.swiper-pagination',
      dynamicBullets: true
    };

    if (elemSliders.length === 1) {
      return false;
    }

    if (window.matchMedia("(min-width: 1200px)").matches && elemSliders.length <= 3) {
      return false;
    }

    return option;
  }

  function paginationSlides(slider) {
    const elemSliders = slider.querySelectorAll('.swiper-slide');
    const option = {
      el: slider.parentNode.querySelector('.swiper-pagination'),
      dynamicBullets: true
    };

    if (elemSliders.length === 1) {
      const link = slider.querySelector('.main-content__slide[href]');
      link ? slider.classList.add('hover-slide') : '';
      return false;
    }

    return option;
  }

  new Inputmask({
    mask: "+7 (X99) 999-9999",
    definitions: {
      'X': {
        validator: "[1, 2, 3, 4, 5, 6, 9, 0]"
      }
    },
    showMaskOnHover: false
  }).mask(document.querySelectorAll("[type='tel']"));
  const productSlider = document.querySelector('.js-product-slider');

  if (productSlider) {
    new Swiper(productSlider, {
      mousewheel: {
        forceToAxis: true
      },
      navigation: {
        nextEl: productSlider.parentNode.querySelector('.swiper-button-next'),
        prevEl: productSlider.parentNode.querySelector('.swiper-button-prev')
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
          forceToAxis: true
        },
        pagination: MainPaginationSlider(mainSlider),
        navigation: {
          nextEl: mainSlider.parentNode.querySelector('.swiper-button-next'),
          prevEl: mainSlider.parentNode.querySelector('.swiper-button-prev')
        },
        breakpoints: {
          1200: {
            slidesPerView: countSlider(allMainSlides, MAX_LENGTH_SLIDER),
            spaceBetween: 1
          }
        }
      });
    } else {
      mainSlider.parentNode.querySelector('.swiper-button-next').classList.add('d-none');
      mainSlider.parentNode.querySelector('.swiper-button-prev').classList.add('d-none');
    }
  }

  const jsCompanySlider = document.querySelectorAll('.js-company-slider');

  if (jsCompanySlider) {
    jsCompanySlider.forEach(item => {
      new Swiper(item, {
        mousewheel: {
          forceToAxis: true
        },
        navigation: {
          nextEl: item.parentNode.querySelector('.swiper-button-next'),
          prevEl: item.parentNode.querySelector('.swiper-button-prev')
        },
        spaceBetween: 8,
        pagination: paginationSlides(item)
      });
    });
  }

  const initialAutoSlider = document.querySelectorAll('.js-auto-slider');
  var autoSlider;
  initialAutoSlider.forEach(function (item) {
    autoSlider = new Swiper(item, {
      slidesPerView: 'auto',
      mousewheel: {
        forceToAxis: true
      },
      spaceBetween: 8,
      navigation: {
        nextEl: item.parentNode.querySelector('.swiper-button-next'),
        prevEl: item.parentNode.querySelector('.swiper-button-prev')
      },
      breakpoints: {
        1200: {
          spaceBetween: 12
        }
      }
    });
  });
  const personalSlider = document.querySelector('.js-personal-slider');

  if (personalSlider) {
    new Swiper(personalSlider, {
      slidesPerView: 'auto',
      mousewheel: {
        forceToAxis: true
      },
      navigation: {
        nextEl: personalSlider.parentNode.querySelector('.swiper-button-next'),
        prevEl: personalSlider.parentNode.querySelector('.swiper-button-prev')
      },
      spaceBetween: 8,
      breakpoints: {
        1200: {
          spaceBetween: 38
        }
      }
    });
  } // TODO: лучше добавить класс js-hover-menu


  const hoverMenu = document.querySelector('.nav-list__item--hover');

  if (hoverMenu) {
    const hoverNav = hoverMenu.closest('.nav-list');
    hoverMenu.addEventListener('mouseover', function () {
      const _this = this;

      const listMenu = _this.querySelector('.nav-list__sub-item');

      listMenu.style.display = 'block';
      listMenu.style.height = listMenu.scrollHeight + 'px';

      _this.classList.add('active');

      _this.style.height = 'auto'; // Решение бага удвоенный бордер(на ss все перепробовал)
    });
    hoverNav.addEventListener('mouseleave', function (e) {
      const _this = this;

      const listMenu = _this.querySelector('.nav-list__sub-item');

      listMenu.style.height = 0; // _this.querySelector('.nav-list__item--hover').classList.remove('active');
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
    parents.find(".tab-filter__btn.active").each(function () {
      if ($(this).data("btn-filter") === 'all') {
        parents.find(blockFilter).removeAttr("hidden");
        parents.find(fancyBoxSliders).attr('data-fancybox', 'all');
        autoSlider.update;
      } else {
        let elemHiddens = $('[data-filter="' + $(this).data("btn-filter") + '"]');
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
    });
  });
  const charBlock = document.querySelectorAll('.js-char-clamp');
  charBlock.forEach(item => {
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

  if (wrapCheckForm) {
    wrapCheckForm.forEach(elem => {
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

  const fieldTextarea = $('.js-tx-auto-height');
  fieldTextarea.on('keyup paste', function () {
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

  if (btnShare.length > 0) {
    btnShare.forEach(elem => {
      elem.addEventListener("click", () => elem.classList.toggle("active"));
    });
    window.addEventListener('click', e => {
      if (!e.target.matches('.js-share')) {
        btnShare.forEach(item => {
          if (!e.target.matches('.js-buffer-copy')) {
            item.classList.remove('active');
          } else {
            item.classList.add('active');
          }
        });
      }
    });
  }

  const fieldShareCopy = document.querySelectorAll('.js-buffer-copy');
  fieldShareCopy.forEach(elem => {
    elem.addEventListener('click', e => {
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

}));
