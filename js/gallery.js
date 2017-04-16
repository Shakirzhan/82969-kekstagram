'use strict';

window.gallery = (function () {
  var pictures = Array.prototype.slice.call(document.querySelectorAll('.picture'), 0);
  var galleryPopup = document.querySelector('.gallery-overlay');
  var buttonCloseGallery = galleryPopup.querySelector('.gallery-overlay-close');

  /**
   * Нажать на изображение
   * @param {MouseEvent} evt - событие
   * @param {number} i - индекс изображения, которое необходимо отрисовать в галерее
   */
  var onPictureClick = function (evt, i) {
    evt.preventDefault();
    openGallery(i);
  };

  /**
   * Нажать ENTER на изображении
   * @param {KeyboardEvent} evt - событие
   * @param {number} i - индекс изображения, которое необходимо отрисовать в галерее
   */
  var onPictureEnterPress = function (evt, i) {
    if (window.utils.isEnterKeyPress(evt)) {
      evt.preventDefault();
      openGallery(i);
    }
  };

  /**
   * Навесить обработчики на все изображения галереи
   * @param {Element} picture - изображерие
   * @param {number} i - индекс изображения в массиве
   */
  pictures.forEach(function (picture, i) {
    picture.addEventListener('click', function (evt) {
      onPictureClick(evt, i);
    });
    picture.addEventListener('keydown', function (evt) {
      onPictureEnterPress(evt, i);
    });
  });

  /**
   * Нажать ESC в открытой галерее
   * @param {KeyboardEvent} evt - событие
   */
  var onGalleryEscPress = function (evt) {
    if (window.utils.isEscKeyPress(evt)) {
      evt.preventDefault();
      closeGallery();
    }
  };

  /**
   * Нажать ENTER на кнопке закрытия гялереи
   * @param {KeyboardEvent} evt - событие
   */
  var onCloseGalleryEnterPress = function (evt) {
    if (window.utils.isEnterKeyPress(evt)) {
      evt.preventDefault();
      closeGallery();
    }
  };

  /**
   * Нажать на подложку галереи
   * @param {MouseEvent} evt - событие
   */
  var onGalleryOverlayClick = function (evt) {
    if (evt.target.classList.contains('gallery-overlay')) {
      evt.preventDefault();
      closeGallery();
    }
  };

  /**
   * Открыть галерею, отрисовать изображение, навесить обработчики событий
   * @param {number} i - индекс изображения, которое необходимо отрисовать в галерее
   */
  var openGallery = function (i) {
    window.preview.renderGalleryItem(window.data.photos[i]);
    window.utils.showElement(galleryPopup);
    buttonCloseGallery.focus();
    buttonCloseGallery.addEventListener('click', closeGallery);
    buttonCloseGallery.addEventListener('keydown', onCloseGalleryEnterPress);
    galleryPopup.addEventListener('click', onGalleryOverlayClick);
    document.addEventListener('keydown', onGalleryEscPress);
  };

  /**
   * Закрыть галерею, снять обработчики событий
   */
  var closeGallery = function () {
    window.utils.hideElement(galleryPopup);
    buttonCloseGallery.removeEventListener('click', closeGallery);
    buttonCloseGallery.removeEventListener('keydown', onCloseGalleryEnterPress);
    galleryPopup.removeEventListener('click', onGalleryOverlayClick);
    document.removeEventListener('keydown', onGalleryEscPress);
  };

  return {
    galleryPopup: galleryPopup
  };
})();
