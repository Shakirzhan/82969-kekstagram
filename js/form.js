'use strict';

window.form = (function () {
  var cropForm = document.querySelector('.upload-overlay');
  var buttonCloseCropForm = cropForm.querySelector('.upload-form-cancel');
  var commentImage = cropForm.querySelector('.upload-form-description');
  var activeEffect = cropForm.querySelector('[name="upload-filter"]:checked');
  var previewImage = document.querySelector('.filter-image-preview');

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
    if (isValidityCropForm()) {
      closeCropForm();
    }
  };

  /**
   * Валидация поля комментария
   * @return {boolean}
   */
  var isValidityCommentImage = function () {
    if (commentImage.validity.valid) {
      window.utils.removeError(commentImage);
      return true;
    } else {
      window.utils.addError(commentImage);
      return false;
    }
  };

  /**
   * Валидация формы кадрирования
   * @return {boolean}
   */
  var isValidityCropForm = function () {
    return window.resize.isValidity() && window.filter.isValidity() && isValidityCommentImage();
  };

  /**
   * Изменить масштаб у изображения
   * @param  {number} value - масштаб
   */
  var applyResize = function (value) {
    previewImage.style.transform = 'scale(' + (value / 100).toFixed(2) + ')';
  };

  /**
   * Применить эффект к изображению
   * @param {string} value - новое значение фильтра
   */
  var applyEffect = function (value) {
    var isVisibleSlider = value === 'none' ? true : false;

    previewImage.classList.remove('filter-' + activeEffect.value);
    previewImage.classList.add('filter-' + value);
    activeEffect = cropForm.querySelector('#upload-filter-' + value);
    window.slider.toggleSlider(isVisibleSlider, applyDepthEffect);
  };

  /**
   * Установить глубину эффекта
   * @param {number} value - вычисленное значение слайдера
   */
  var applyDepthEffect = function (value) {
    var filter = {
      'chrome': 'grayscale(' + (value / 100).toFixed(2) + ')',
      'sepia': 'sepia(' + (value / 100).toFixed(2) + ')',
      'marvin': 'invert(' + value + '%)',
      'phobos': 'blur(' + (3 * value / 100).toFixed(2) + 'px)',
      'heat': 'brightness(' + (3 * value / 100).toFixed(2) + ')',
      'none': ''
    };

    previewImage.style.filter = filter[activeEffect.value];
  };

  /**
   * Сбросить масштаб изображения
   */
  var resetResize = function () {
    applyResize(DEFAULT_RESIZE);
  };

  /**
   * Сбросить эффект изображения
   */
  var resetEffect = function () {
    applyEffect(DEFAULT_FILTER);
  };

  /**
   * Очистить поле комментария, снять сообщение об ошибке
   */
  var clearCommentImage = function () {
    commentImage.value = '';
    window.utils.removeError(commentImage);
  };

  /**
   * Сбросить форму кадрирования
   */
  var resetCropForm = function () {
    resetEffect();
    resetResize();
    clearCommentImage();
    window.upload.form.reset();
  };

  /**
   * Открыть форму кадрирования, навесить обработчики событий
   */
  var openCropForm = function () {
    window.slider.toggleSlider(true);
    window.utils.showElement(cropForm);
    window.utils.hideElement(window.upload.form);
    buttonCloseCropForm.focus();
    buttonCloseCropForm.addEventListener('click', closeCropForm);
    buttonCloseCropForm.addEventListener('keydown', onButtonCloseCropFormEnterPress);
    document.addEventListener('keydown', onCropFormEscPress);
    cropForm.addEventListener('submit', onSubmitCropForm);
  };

  /**
   * Закрыть форму кадрирования, снять обработчики событий
   */
  var closeCropForm = function () {
    window.utils.hideElement(cropForm);
    window.utils.showElement(window.upload.form);
    resetCropForm();
    buttonCloseCropForm.removeEventListener('click', closeCropForm);
    buttonCloseCropForm.removeEventListener('keydown', onButtonCloseCropFormEnterPress);
    document.removeEventListener('keydown', onCropFormEscPress);
    cropForm.removeEventListener('submit', onSubmitCropForm);
  };

  window.utils.hideElement(cropForm);
  window.filter.addFilterListener(applyEffect);
  window.slider.addSliderListener(applyDepthEffect);
  window.resize.addResizeListener(applyResize);

  return {
    cropForm: cropForm,
    openCropForm: openCropForm
  };
})();
