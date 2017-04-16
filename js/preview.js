'use strict';

window.preview = (function () {
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
  return {
    renderGalleryItem: function (picture) {
      var imageGallery = window.gallery.galleryPopup.querySelector('.gallery-overlay-image');
      var likesCount = window.gallery.galleryPopup.querySelector('.likes-count');
      var commentsCount = window.gallery.galleryPopup.querySelector('.gallery-overlay-controls-comments');

      imageGallery.setAttribute('src', picture.url);
      likesCount.textContent = picture.likes;
      commentsCount.innerHTML = renderComment(picture.comments.length);
    }
  };
})();
