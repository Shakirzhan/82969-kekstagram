'use strict';

window.form = (function () {
  var cropForm = document.querySelector('.upload-overlay');
  var buttonCloseCropForm = cropForm.querySelector('.upload-form-cancel');
  var submitCropForm = cropForm.querySelector('.upload-form-submit');
  var imageComment = cropForm.querySelector('.upload-form-description');
  var activeFilter = cropForm.querySelector('[name="upload-filter"]:checked');

  /**
  * Масштаб по умолчанию
  * @constant {string}
   */
  var DEFAULT_RESIZE = 100;

  /**
  * Фильтр изображения по умолчанию
  * @constant {string}
   */
  var DEFAULT_FILTER = 'none';

  /**
   * Нажать ESC в форме кадрирования
   * @param {KeyboardEvent} evt - событие
   */
  var onCropFormEscPress = function (evt) {
    if (!evt.target.classList.contains('upload-form-description') && window.utils.isEscKeyPress(evt)) {
      evt.preventDefault();
      closeCropForm();
    }
  };

  /**
   * Нажать ENTER на кнопке закрытия формы кадрирования
   * @param {KeyboardEvent} evt - событие
   */
  var onButtonCloseCropFormEnterPress = function (evt) {
    if (window.utils.isEnterKeyPress(evt)) {
      evt.preventDefault();
      closeCropForm();
    }
  };

  /**
   * Отправка формы кадрирования
   * @param {Event} evt - событие
   */
  var onSubmitCropForm = function (evt) {
    evt.preventDefault();
    if (validCropForm()) {
      closeCropForm();
    }
  };

  /**
   * Валидация поля комментария
   * @return {boolean}
   */
  var validResizeComment = function () {
    if (imageComment.validity.valid) {
      window.utils.removeError(imageComment);
      return true;
    } else {
      window.utils.addError(imageComment);
      return false;
    }
  };

  /**
   * Валидация формы кадрирования
   * @return {boolean}
   */
  var validCropForm = function () {
    return (window.resize.valid() && validResizeComment() && window.filter.valid());
  };

  /**
   * Изменить масштаб у изображения
   * @param  {number} value - масштаб
   */
  var applyResize = function (value) {
    window.preview.image.style.transform = 'scale(' + (value / 100).toFixed(2) + ')';
  };

  /**
   * Применить фильтр к изображению
   * @param {string} value - новое значение фильтра
   */
  var applyFilter = function (value) {
    window.preview.image.classList.remove('filter-' + activeFilter.value);
    window.preview.image.classList.add('filter-' + value);
    activeFilter = window.form.cropForm.querySelector('#upload-filter-' + value);
    window.slider(value);
  };

  /**
   * Установить в масштабе значение по умолчанию
   */
  var resetResize = function () {
    applyResize(DEFAULT_RESIZE);
  };

  /**
   * Установить в фильтре значение по умолчанию
   */
  var resetFilter = function () {
    applyFilter(DEFAULT_FILTER);
  };

  /**
   * Очистить поле комментария, снять сообщение об ошибке
   */
  var clearTextComment = function () {
    imageComment.value = '';
    window.utils.removeError(imageComment);
  };

  /**
   * Сбросить форму кадрирования
   */
  var resetCropForm = function () {
    resetFilter();
    resetResize();
    clearTextComment();
  };

  /**
   * Открыть форму кадрирования, навесить обработчики событий
   */
  var openCropForm = function () {
    window.utils.showElement(cropForm);
    window.utils.hideElement(window.upload.uploadForm);
    buttonCloseCropForm.focus();
    buttonCloseCropForm.addEventListener('click', closeCropForm);
    buttonCloseCropForm.addEventListener('keydown', onButtonCloseCropFormEnterPress);
    document.addEventListener('keydown', onCropFormEscPress);
    cropForm.addEventListener('submit', onSubmitCropForm);
    cropForm.addEventListener('closecropform', resetCropForm);
  };

  /**
   * Закрыть форму кадрирования, снять обработчики событий
   */
  var closeCropForm = function () {
    window.utils.hideElement(cropForm);
    window.utils.showElement(window.upload.uploadForm);
    resetCropForm();
    buttonCloseCropForm.removeEventListener('click', closeCropForm);
    buttonCloseCropForm.removeEventListener('keydown', onButtonCloseCropFormEnterPress);
    document.removeEventListener('keydown', onCropFormEscPress);
    submitCropForm.removeEventListener('submit', onSubmitCropForm);
    cropForm.removeEventListener('closecropform', resetCropForm);
  };

  window.utils.hideElement(cropForm);
  window.filter.addFilterListener(applyFilter);
  window.resize.addResizeListener(applyResize);

  return {
    cropForm: cropForm,
    openCropForm: openCropForm
  };
})();
