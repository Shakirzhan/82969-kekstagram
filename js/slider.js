'use strict';

window.slider = (function () {
  var slider = window.form.cropForm.querySelector('.upload-filter-level');
  var sliderLine = window.form.cropForm.querySelector('.upload-filter-level-line');
  var sliderHandle = window.form.cropForm.querySelector('.upload-filter-level-pin');
  var sliderValue = window.form.cropForm.querySelector('.upload-filter-level-val');
  var previewImage = document.querySelector('.filter-image-preview');
  var activeFilterValue;
  var startCoordX;

  /**
   * Рассчитать значение для фильтра
   * @param {number} value - значение ползунка слайдера
   * @return {number}
   */
  var calcValueSlider = function (value) {
    return (value / sliderLine.clientWidth * 100).toFixed();
  };

  /**
   * Настроить слайдер в выбранное положение
   * @param {number} value - значение ползунка слайдера
   */
  var setSliderValue = function (value) {
    if (value < 0) {
      value = 0;
    } else if (value > sliderLine.clientWidth) {
      value = sliderLine.clientWidth;
    }

    sliderHandle.style.left = value + 'px';
    sliderValue.style.width = calcValueSlider(value) + '%';
    setFilterImage(calcValueSlider(value));
  };

  /**
   * Установить фильтр на изображении
   * @param {number} value - вычисленное значение слайдера
   */
  var setFilterImage = function (value) {
    var filter = {
      'chrome': 'grayscale(' + (value / 100).toFixed(2) + ')',
      'sepia': 'sepia(' + (value / 100).toFixed(2) + ')',
      'marvin': 'invert(' + value + '%)',
      'phobos': 'blur(' + (3 * value / 100).toFixed(2) + 'px)',
      'heat': 'brightness(' + (3 * value / 100).toFixed(2) + ')',
      'none': ''
    };

    previewImage.style.filter = filter[activeFilterValue];
  };

  /**
   * Нажать на полосу слайдера
   * @param {MouseEvent} evt
   */
  var onSliderClick = function (evt) {
    if (!evt.target.classList.contains('upload-filter-level-pin')) {
      evt.preventDefault();
      setSliderValue(evt.offsetX);
    }
  };

  /**
   * Тащить "ручку" слайдера
   * @param {MouseEvent} mouseMoveEvt
   */
  var onMouseMove = function (mouseMoveEvt) {
    mouseMoveEvt.preventDefault();

    var offsetX = startCoordX - mouseMoveEvt.clientX;
    var valueSlider = (sliderHandle.offsetLeft - offsetX);
    startCoordX = mouseMoveEvt.clientX;

    setSliderValue(valueSlider);
  };

  /**
   * Отпустить "ручку" слайдера
   * @param {MouseEvent} mouseUpEvt
   */
  var onMouseUp = function (mouseUpEvt) {
    mouseUpEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  /**
   * Нажать на "ручку" слайдера
   * @param {MouseEvent} evt
   */
  var onSliderHandleMouseDown = function (evt) {
    evt.preventDefault();
    startCoordX = evt.clientX;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  sliderHandle.addEventListener('mousedown', onSliderHandleMouseDown);
  slider.addEventListener('click', onSliderClick);
  window.utils.hideElement(slider);

  /**
   * Показать/скрыть слайдер, на основе выбранного фильтра
   * @param {string} value - выбранное значение фильтра
   */
  return function (value) {
    activeFilterValue = value;

    if (activeFilterValue === 'none') {
      window.utils.hideElement(slider);
    } else {
      window.utils.showElement(slider);
    }
    setSliderValue(sliderLine.clientWidth);
  };
})();
