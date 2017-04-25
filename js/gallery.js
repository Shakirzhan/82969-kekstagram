'use strict';

window.gallery = (function () {
  var galleryPopup = document.querySelector('.gallery-overlay');
  var buttonCloseGallery = galleryPopup.querySelector('.gallery-overlay-close');

  /**
   * Отрисовать шаблон комментария
   * @param {number} countComments
   * @return {string} - шаблон
   */
  var renderComment = function (countComments) {
    return '<span class="comments-count">' + countComments + '</span> ' + window.utils.getWordByNumber(countComments, ['комментарий', 'комментария', 'комментариев']);
  };

  /**
   * Отрисовать элемент галереи
   * @param {Object} picture - изображение
   */
  var renderGalleryItem = function (picture) {
    var imageGallery = galleryPopup.querySelector('.gallery-overlay-image');
    var likesCount = galleryPopup.querySelector('.likes-count');
    var commentsCount = galleryPopup.querySelector('.gallery-overlay-controls-comments');

    imageGallery.setAttribute('src', picture.url);
    likesCount.textContent = picture.likes;
    commentsCount.innerHTML = renderComment(picture.comments.length);
  };

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
    /**
     * Открыть галерею, отрисовать изображение, навесить обработчики событий
     * @param {number} image - изображение
     */
    openGallery: function (image) {
      renderGalleryItem(image);
      window.utils.showElement(galleryPopup);
      buttonCloseGallery.focus();
      buttonCloseGallery.addEventListener('click', closeGallery);
      buttonCloseGallery.addEventListener('keydown', onCloseGalleryEnterPress);
      galleryPopup.addEventListener('click', onGalleryOverlayClick);
      document.addEventListener('keydown', onGalleryEscPress);
    }
  };
})();
