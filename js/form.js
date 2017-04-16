'use strict';

window.form = (function () {
  /**
   * Форма загрузки изображения
   */
  var uploadForm = document.querySelector('.upload-form');
  var uploadFormFile = uploadForm.querySelector('#upload-file');

  /**
   * Форма кадрирования изображения
   */
  var cropForm = document.querySelector('.upload-overlay');
  var buttonCloseCropForm = cropForm.querySelector('.upload-form-cancel');
  var submitCropForm = cropForm.querySelector('.upload-form-submit');
  var resizeButtonDec = cropForm.querySelector('.upload-resize-controls-button-dec');
  var resizeButtonInc = cropForm.querySelector('.upload-resize-controls-button-inc');
  var resizeInput = cropForm.querySelector('.upload-resize-controls-value');
  var imagePreview = cropForm.querySelector('.filter-image-preview');
  var imageComment = cropForm.querySelector('.upload-form-description');
  var activeFilter = cropForm.querySelector('[name="upload-filter"]:checked');
  var filterControls = cropForm.querySelector('.upload-filter-controls');

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
  * Фильтр изображения по-умолчанию
  * @constant {string}
   */
  var DEFAULT_FILTER = 'none';

  /**
   * Изменить поле загрузки файла
   * @param  {Event} evt - событие
   */
  var onUploadFormFileChange = function (evt) {
    window.utils.showPreloader();
    if (evt.target.value !== '') {
      window.utils.hidePreloader();
      openCropForm();
    } else {
      window.utils.hidePreloader();
    }
  };

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
   * Нажать на кнопку оправки формы кадрирования
   * @param {MouseEvent} evt - событие
   */
  var onSubmitCropFormClick = function (evt) {
    evt.preventDefault();
    if (validCropForm()) {
      closeCropForm();
    }
  };

  /**
   * Нажать ENTER на кнопкe оправки формы кадрирования
   * @param {KeyboardEvent} evt - событие
   */
  var onSubmitCropFormEnterPress = function (evt) {
    if (window.utils.isEnterKeyPress(evt)) {
      evt.preventDefault();
      if (validCropForm()) {
        closeCropForm();
      }
    }
  };

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
   * Валидация масштаба
   * @return {boolean}
   */
  var validResizeValue = function () {
    var resizeValue = getResizeValue();

    if (resizeValue >= MIN_RESIZE && resizeValue <= MAX_RESIZE) {
      window.utils.removeError(resizeInput);
      return true;
    } else {
      window.utils.addError(resizeInput);
      return false;
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
   * Валидация фильтров изображения
   * @return {boolean}
   */
  var validFilterImage = function () {
    var filter = cropForm.querySelector('[name="upload-filter"]:checked');

    if (filter) {
      window.utils.removeError(filterControls);
      return true;
    } else {
      window.utils.addError(filterControls);
      return false;
    }
  };

  /**
   * Валидация формы кадрирования
   * @return {boolean}
   */
  var validCropForm = function () {
    return (validResizeValue() && validResizeComment() && validFilterImage());
  };

  /**
   * Изменить масштаб у изображения
   * @param  {number} value - масштаб
   */
  var changeScaleOnImage = function (value) {
    imagePreview.style.transform = 'scale(' + (value / 100).toFixed(2) + ')';
  };

  /**
   * Изменить фильтр у изображения
   * @param {string} value - название фильтра
   */
  var changeFilterOnImage = function (value) {
    imagePreview.classList.remove('filter-' + activeFilter.value);
    imagePreview.classList.add('filter-' + value);
  };

  /**
   * Изменить фильтр
   * @param  {Event} evt - событие
   */
  var onFilterControlsChange = function (evt) {
    changeFilterOnImage(evt.target.value);
    activeFilter = evt.target;
  };

  /**
   * Сбросить фильтр изображения
   * @param {string} value - название фильтра
   */
  var setDefaultFilter = function (value) {
    activeFilter.checked = false;
    cropForm.querySelector('#upload-filter-' + value).checked = true;
  };

  /**
   * Очистить поле комментария
   */
  var clearTextComment = function () {
    imageComment.value = '';
  };

  /**
   * Сбросить форму кадрирования
   */
  var resetCropForm = function () {
    changeScaleOnImage(MAX_RESIZE);
    changeFilterOnImage(DEFAULT_FILTER);
    setDefaultFilter(DEFAULT_FILTER);
    clearTextComment();
    window.utils.removeError(imageComment);
  };

  /**
   * Открыть форму кадрирования, навесить обработчики событий
   */
  var openCropForm = function () {
    window.utils.showElement(cropForm);
    window.utils.hideElement(uploadForm);
    buttonCloseCropForm.focus();
    buttonCloseCropForm.addEventListener('click', closeCropForm);
    buttonCloseCropForm.addEventListener('keydown', onButtonCloseCropFormEnterPress);
    document.addEventListener('keydown', onCropFormEscPress);
    submitCropForm.addEventListener('click', onSubmitCropFormClick);
    submitCropForm.addEventListener('keydown', onSubmitCropFormEnterPress);
    resizeButtonDec.addEventListener('click', onResizeButtonDecClick);
    resizeButtonInc.addEventListener('click', onResizeButtonIncClick);
    filterControls.addEventListener('change', onFilterControlsChange);
  };

  /**
   * Закрыть форму кадрирования, снять обработчики событий
   */
  var closeCropForm = function () {
    window.utils.hideElement(cropForm);
    window.utils.showElement(uploadForm);
    resetCropForm();
    buttonCloseCropForm.removeEventListener('click', closeCropForm);
    buttonCloseCropForm.removeEventListener('keydown', onButtonCloseCropFormEnterPress);
    document.removeEventListener('keydown', onCropFormEscPress);
    submitCropForm.removeEventListener('click', onSubmitCropFormClick);
    submitCropForm.removeEventListener('keydown', onSubmitCropFormEnterPress);
    resizeButtonDec.removeEventListener('click', onResizeButtonDecClick);
    resizeButtonInc.removeEventListener('click', onResizeButtonIncClick);
    filterControls.removeEventListener('change', onFilterControlsChange);
  };

  /**
   * Изменить поле загрузки файла
   */
  uploadFormFile.addEventListener('change', onUploadFormFileChange);

  window.utils.hideElement(cropForm);
})();
