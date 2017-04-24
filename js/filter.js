'use strict';

window.filter = (function () {
  var filterControls = document.querySelector('.upload-filter-controls');

  return {
    /**
     * Валидация фильтров изображения
     * @return {boolean}
     */
    valid: function () {
      var filter = document.querySelector('[name="upload-filter"]:checked');

      if (filter) {
        window.utils.removeError(filterControls);
        return true;
      } else {
        window.utils.addError(filterControls);
        return false;
      }
    },
    /**
     * Событие изменения фильтра
     * @param {Function} callback
     */
    addFilterListener: function (callback) {
      filterControls.addEventListener('change', function (evt) {
        callback(evt.target.value);
      });
    }
  };
})();
