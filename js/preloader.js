'use strict';

window.preloader = (function () {
  var uploadFormLabel = document.querySelector('.upload-file');

  return {
    /**
     * Показать прелоадер
     */
    show: function () {
      uploadFormLabel.classList.add('load-file');
    },

    /**
     * Скрыть прелоадер
     */
    hide: function () {
      uploadFormLabel.classList.remove('load-file');
    },
  };
})();
