'use strict';

window.resize = (function () {
  var resizeButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var resizeButtonInc = document.querySelector('.upload-resize-controls-button-inc');
  var resizeInput = document.querySelector('.upload-resize-controls-value');

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
    },
    /**
     * Событие изменения масштаба
     * @param {Function} callback
     */
    addResizeListener: function (callback) {
      /**
       * Нажать на увеличение масштаба
       */
      resizeButtonDec.addEventListener('click', function () {
        var resizeValue = getResizeValue();
        if ((resizeValue - STEP_RESIZE) >= MIN_RESIZE) {
          resizeInput.value = +(resizeValue - STEP_RESIZE) + '%';
          callback(parseInt(resizeInput.value, 10));
        }
      });
      /**
       * Нажать на уменьшение масштаба
       */
      resizeButtonInc.addEventListener('click', function () {
        var resizeValue = getResizeValue();
        if ((resizeValue + STEP_RESIZE) <= MAX_RESIZE) {
          resizeInput.value = +(resizeValue + STEP_RESIZE) + '%';
          callback(parseInt(resizeInput.value, 10));
        }
      });
    }
  };
})();
