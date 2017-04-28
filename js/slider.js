'use strict';

window.slider = (function () {
  var slider = document.querySelector('.upload-filter-level');
  var sliderLine = document.querySelector('.upload-filter-level-line');
  var sliderHandle = document.querySelector('.upload-filter-level-pin');
  var sliderValue = document.querySelector('.upload-filter-level-val');
  var startCoordX;
  var sliderCb;

  /**
   * Рассчитать значение для фильтра
   * @param {number} value - значение ползунка слайдера
   * @return {number}
   */
  var calcSliderValue = function (value) {
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
    }
    if (value > sliderLine.clientWidth) {
      value = sliderLine.clientWidth;
    }

    sliderHandle.style.left = value + 'px';
    sliderValue.style.width = calcSliderValue(value) + '%';

    return calcSliderValue(value);
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
      if (typeof sliderCb === 'function') {
        sliderCb(setSliderValue(evt.offsetX));
      }
    }
  };

  return {
    /**
     * Показать/скрыть слайдер, на основе выбранного фильтра
     * @param {boolean} isVisible
     * @param {Function} callback
     */
    toggleSlider: function (isVisible, callback) {
      if (isVisible) {
        window.utils.hideElement(slider);
      } else {
        window.utils.showElement(slider);
      }
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
