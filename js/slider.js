'use strict';

window.slider = (function () {
  var slider = document.querySelector('.upload-filter-level');
  var sliderLine = document.querySelector('.upload-filter-level-line');
  var sliderHandle = document.querySelector('.upload-filter-level-pin');
  var sliderValue = document.querySelector('.upload-filter-level-val');
  var startCoordX;
  var sliderCb = null;

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
   * @return {number}
   */
  var setSliderValue = function (value) {
    if (value < 0) {
      value = 0;
    } else if (value > sliderLine.clientWidth) {
      value = sliderLine.clientWidth;
    }

    sliderHandle.style.left = value + 'px';
    sliderValue.style.width = calcValueSlider(value) + '%';

    return calcValueSlider(value);
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
    if (typeof sliderCb === 'function') {
      sliderCb(valueSlider);
    }
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

  /**
   * Нажать на полосу слайдера
   * @param {MouseEvent} evt
   */
  var onSliderClick = function (evt) {
    if (!evt.target.classList.contains('upload-filter-level-pin')) {
      evt.preventDefault();
      setSliderValue(evt.offsetX);
      if (typeof sliderCb === 'function') {
        sliderCb(setSliderValue(evt.offsetX));
      }
    }
  };

  window.utils.hideElement(slider);

  return {
    /**
     * Показать/скрыть слайдер, на основе выбранного фильтра
     * @param {string} value - выбранное значение фильтра
     * @param {Function} callback
     */
    toggleSlider: function (value, callback) {
      if (value === 'none') {
        window.utils.hideElement(slider);
      } else {
        window.utils.showElement(slider);
      }
      setSliderValue(sliderLine.clientWidth);
      if (typeof callback === 'function') {
        callback(setSliderValue(sliderLine.clientWidth));
      }
    },
    /**
     * События изменения слайдера
     * @param {Function} callback
     */
    addSliderListener: function (callback) {
      sliderCb = callback;
      sliderHandle.addEventListener('mousedown', onSliderHandleMouseDown);
      slider.addEventListener('click', onSliderClick);
    }
  };
})();
