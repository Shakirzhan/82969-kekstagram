'use strict';

window.debounce = (function () {
  var timeout = null;

  /**
   * @param {Function} callback
   * @param {number} wait - время ожидания вызова функции
   */
  return function (callback, wait) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(callback, wait);
  };
})();
