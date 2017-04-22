'use strict';

window.resize = (function () {
  var resizeButtonDec = window.form.cropForm.querySelector('.upload-resize-controls-button-dec');
  var resizeButtonInc = window.form.cropForm.querySelector('.upload-resize-controls-button-inc');
  var resizeInput = window.form.cropForm.querySelector('.upload-resize-controls-value');

  /**
  * Минимальное значение масштаба изображения
  * @constant {number}
   */
  var MIN_RESIZE = 25;

  /**
  * Максимальное значение масштаба изображения
  * @constant {number}
   */
  var MAX_RESIZE = 100;

  /**
  * Шаг масштабирования изображения
  * @constant {number}
   */
  var STEP_RESIZE = 25;

  /**
   * Получить масштаб изображения
   * @return {number} - масштаб
   */
  var getResizeValue = function () {
    return parseInt(resizeInput.value, 10);
  };

  /**
   * Нажать на уменьшение масштаба
   */
  var onResizeButtonDecClick = function () {
    var resizeValue = getResizeValue();
    if ((resizeValue - STEP_RESIZE) >= MIN_RESIZE) {
      resizeInput.value = +(resizeValue - STEP_RESIZE) + '%';
      changeScaleOnImage(resizeValue - STEP_RESIZE);
    }
  };

  /**
   * Нажать на увеличение масштаба
   */
  var onResizeButtonIncClick = function () {
    var resizeValue = getResizeValue();
    if ((resizeValue + STEP_RESIZE) <= MAX_RESIZE) {
      resizeInput.value = +(resizeValue + STEP_RESIZE) + '%';
      changeScaleOnImage(resizeValue + STEP_RESIZE);
    }
  };

  /**
   * Изменить масштаб у изображения
   * @param  {number} value - масштаб
   */
  var changeScaleOnImage = function (value) {
    window.preview.image.style.transform = 'scale(' + (value / 100).toFixed(2) + ')';
  };

  /**
   * Установить в масштабе значение по умолчанию
   */
  var resetResize = function () {
    changeScaleOnImage(MAX_RESIZE);
  };

  resizeButtonDec.addEventListener('click', onResizeButtonDecClick);
  resizeButtonInc.addEventListener('click', onResizeButtonIncClick);
  window.form.cropForm.addEventListener('closecropform', resetResize);

  return {
    /**
     * Валидация масштаба
     * @return {boolean}
     */
    valid: function () {
      var resizeValue = getResizeValue();

      if (resizeValue >= MIN_RESIZE && resizeValue <= MAX_RESIZE) {
        window.utils.removeError(resizeInput);
        return true;
      } else {
        window.utils.addError(resizeInput);
        return false;
      }
    }
  };
})();
