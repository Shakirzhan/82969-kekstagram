'use strict';

window.imageResize = (function () {
  /**
  * Масштаб по умолчанию
  * @constant {string}
   */
  var DEFAULT_RESIZE = 100;

  /**
   * Установить в масштабе значение по умолчанию
   */
  var resetResize = function () {
    applyResize(DEFAULT_RESIZE);
  };

  /**
   * Изменить масштаб у изображения
   * @param  {number} value - масштаб
   */
  var applyResize = function (value) {
    window.preview.image.style.transform = 'scale(' + (value / 100).toFixed(2) + ')';
  };

  window.form.cropForm.addEventListener('closecropform', resetResize);
  window.resize.addResizeListener(null, applyResize);
})();
