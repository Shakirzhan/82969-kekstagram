'use strict';

window.filter = (function () {
  var filterControls = window.form.cropForm.querySelector('.upload-filter-controls');

  /**
   * Событие изменения фильтра
   * @param {null} _
   * @param {Function} callback
   */
  var addFilterListener = function (_, callback) {
    filterControls.addEventListener('change', function (evt) {
      callback(evt.target.value);
    });
  };

  /**
   * Валидация фильтров изображения
   * @return {boolean}
   */
  return {
    valid: function () {
      var filter = window.form.cropForm.querySelector('[name="upload-filter"]:checked');

      if (filter) {
        window.utils.removeError(filterControls);
        return true;
      } else {
        window.utils.addError(filterControls);
        return false;
      }
    },
    addFilterListener: addFilterListener,
  };
})();
