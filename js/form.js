'use strict';

window.form = (function () {
  /**
   * Форма загрузки изображения
   */
  var uploadForm = document.querySelector('.upload-form');

  /**
   * Форма кадрирования изображения
   */
  var cropForm = document.querySelector('.upload-overlay');
  var buttonCloseCropForm = cropForm.querySelector('.upload-form-cancel');
  var submitCropForm = cropForm.querySelector('.upload-form-submit');
  var imageComment = cropForm.querySelector('.upload-form-description');

  /**
   * Добавить класс ошибки к элементу
   * @param {Element} el
   */
  var addError = function (el) {
    el.classList.add('m-error');
  };

  /**
   * Удалить класс ошибки с элемента
   * @param {Element} el
   */
  var removeError = function (el) {
    el.classList.remove('m-error');
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
   * Валидация поля комментария
   * @return {boolean}
   */
  var validResizeComment = function () {
    if (imageComment.validity.valid) {
      removeError(imageComment);
      return true;
    } else {
      addError(imageComment);
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
   * Очистить поле комментария, снять сообщение об ошибке
   */
  var clearTextComment = function () {
    imageComment.value = '';
    removeError(imageComment);
  };

  /**
   * Сбросить форму кадрирования
   */
  var resetCropForm = function () {
    clearTextComment();
  };

  /**
   * Событие закрытия формы кадрирования
   * @param  {type} e description
   */
  var closeForm = new Event('closeForm');

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
    cropForm.addEventListener('closeForm', resetCropForm);
  };

  /**
   * Закрыть форму кадрирования, снять обработчики событий
   */
  var closeCropForm = function () {
    window.utils.hideElement(cropForm);
    window.utils.showElement(uploadForm);
    cropForm.dispatchEvent(closeForm);
    buttonCloseCropForm.removeEventListener('click', closeCropForm);
    buttonCloseCropForm.removeEventListener('keydown', onButtonCloseCropFormEnterPress);
    document.removeEventListener('keydown', onCropFormEscPress);
    submitCropForm.removeEventListener('click', onSubmitCropFormClick);
    submitCropForm.removeEventListener('keydown', onSubmitCropFormEnterPress);
    cropForm.removeEventListener('closeForm', resetCropForm);
  };

  window.utils.hideElement(cropForm);

  return {
    cropForm: cropForm,
    openCropForm: openCropForm
  };
})();
