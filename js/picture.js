'use strict';

window.picture = (function () {
  var pictureTemplate = document.querySelector('#picture-template').content;
  var pictureList = document.querySelector('.pictures');

  /**
   * Создать HTML-блок с изображением
   * @param {Object} picture - фотография
   * @return {DocumentFragment} - HTML-блок с фотографией
   */
  var createPictureItem = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    var pictureImg = pictureElement.querySelector('img');
    var pictureLikes = pictureElement.querySelector('.picture-likes');
    var pictureComments = pictureElement.querySelector('.picture-comments');

    pictureImg.setAttribute('src', picture.url);
    pictureLikes.textContent = picture.likes;
    pictureComments.textContent = picture.comments.length;

    return pictureElement;
  };

  /**
   * Сгенерировать фрагмент изображений
   * @param {Array} photos - массив фотографий
   * @return {DocumentFragment} - фрагмент фотографий
   */
  var generateFragmentPhotos = function (photos) {
    var fragmentPhotos = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragmentPhotos.appendChild(createPictureItem(photos[i]));
    }

    return fragmentPhotos;
  };

  window.photos = window.data.generatePhotos(window.data.countPhotos, window.data.comments);
  pictureList.appendChild(generateFragmentPhotos(window.photos));
})();
