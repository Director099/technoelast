export class FormStep {
  constructor(selector, {
    btnNext,
    btnPrev,
    parentGroup,
    ...cbFunc
  }) {
    this.$el = selector;
    this._this = this;
    this._parentGroup = this.$el.querySelectorAll(parentGroup);
    this._elemNext = this.$el.querySelectorAll(btnNext);
    this._elemPrev = this.$el.querySelectorAll(btnPrev);
    this._STEP = 0;
    this.options = cbFunc;

    this._init();
  }

  step(step = this._STEP) {
    this._STEP = step;
    this._parentGroup.forEach((e, index) => step === index ? e.style = null : e.style.display = 'none')
  }

  stepNext() {
    if (this.options.onNextHandler) {
      this.options.onNextHandler(this._parentGroup[this._STEP], (result) => {
        if (result) this.step(++this._STEP);
      });
    } else {
      this.step(++this._STEP);
    }
  }

  stepPrev() {
    if (this.options.onPrevHandler) {
      this.options.onPrevHandler(this._parentGroup[this._STEP], (result) => {
        if (result) this.step(--this._STEP);
      });
    } else {
      this.step(--this._STEP);
    }
  }

  handleNext() {
    this._elemNext.forEach((elemNext) => elemNext.addEventListener('click', () => this.stepNext()));
  }

  handlePrev() {
    this._elemPrev.forEach((elemPrev) => elemPrev.addEventListener('click', () => this.stepPrev()));
  }

  _events () {
    this.handleNext();
    this.handlePrev();
  }

  _init() {
    this.step();
    this._events();
  }
}
