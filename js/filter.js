'use strict';

window.filter = (function () {
  var activeFilter = window.form.cropForm.querySelector('[name="upload-filter"]:checked');
  var filterControls = window.form.cropForm.querySelector('.upload-filter-controls');

  /**
  * Фильтр изображения по-умолчанию
  * @constant {string}
   */
  var DEFAULT_FILTER = 'none';

  /**
   * Изменить фильтр у изображения
   * @param {string} value - название фильтра
   */
  var changeFilterOnImage = function (value) {
    window.preview.image.classList.remove('filter-' + activeFilter.value);
    window.preview.image.classList.add('filter-' + value);
    activeFilter = window.form.cropForm.querySelector('#upload-filter-' + value);
    window.slider.showSlider(value);
  };

  /**
   * Изменить фильтр
   * @param  {Event} evt - событие
   */
  var onFilterControlsChange = function (evt) {
    changeFilterOnImage(evt.target.value);
  };

  /**
   * Установить в фильтре значение по умолчанию
   */
  var resetFilter = function () {
    changeFilterOnImage(DEFAULT_FILTER);
  };

  filterControls.addEventListener('change', onFilterControlsChange);
  window.form.cropForm.addEventListener('closeForm', resetFilter);

  return {
    /**
     * Валидация фильтров изображения
     * @return {boolean}
     */
    valid: function () {
      var filter = window.form.cropForm.querySelector('[name="upload-filter"]:checked');

      if (filter) {
        window.form.removeError(filterControls);
        return true;
      } else {
        window.form.addError(filterControls);
        return false;
      }
    }
  };
})();
