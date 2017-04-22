'use strict';

window.imageFilter = (function () {
  var activeFilter = window.form.cropForm.querySelector('[name="upload-filter"]:checked');

  /**
  * Фильтр изображения по-умолчанию
  * @constant {string}
   */
  var DEFAULT_FILTER = 'none';

  /**
   * Установить в фильтре значение по умолчанию
   */
  var resetFilter = function () {
    applyFilter(DEFAULT_FILTER);
  };

  var applyFilter = function (value) {
    window.preview.image.classList.remove('filter-' + activeFilter.value);
    window.preview.image.classList.add('filter-' + value);
    activeFilter = window.form.cropForm.querySelector('#upload-filter-' + value);
    window.slider(value);
  };

  window.form.cropForm.addEventListener('closecropform', resetFilter);
  window.filter.addFilterListener(null, applyFilter);
})();
