'use strict';

window.data = (function () {
  /**
  * Минимальное количество лайков
  * @constant {number}
   */
  var MIN_LIKES = 15;

  /**
  * Максимальное количество лайков
  * @constant {number}
   */
  var MAX_LIKES = 200;

  /**
   * Сгенерировать массив url-изображений
   * @param {number} countUrls - количество изображений
   * @return {Array} - массив url
   */
  var generateUrls = function (countUrls) {
    var urls = [];

    for (var i = 0; i < countUrls; i++) {
      urls[i] = i + 1;
    }

    return urls;
  };

  /**
   * Сгенерировать массив комментариев
   * @param {Array} array - массив
   * @return {Array} - массив комментариев
   */
  var generateComments = function (array) {
    var comments = [];
    var countComments = window.utils.getRandomNumber(1, 2);

    for (var i = 0; i < countComments; i++) {
      var index = window.utils.getRandomNumber(0, array.length - 1);
      comments[i] = array[index];
    }

    return comments;
  };

  /**
   * Сгенерировать объект фотографии
   * @param {number} countPhotos - количество изображений
   * @param {Array} urls - массив url-изображений
   * @param {Array} comments - массив комментариев
   * @return {Object} - фотография
   */
  var generatePhoto = function (countPhotos, urls, comments) {
    var photo = {
      url: 'photos/' + window.utils.getElementArray(urls, true) + '.jpg',
      likes: window.utils.getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: generateComments(comments)
    };

    return photo;
  };

  /**
   * Сгенерировать массив фотографий по заданному количеству и параметрам
   * @param {number} countPhotos - количество изображений
   * @param {Array} comments - массив комментариев
   * @return {Array} - массив фотографий
   */
  var generatePhotos = function (countPhotos, comments) {
    var urls = generateUrls(countPhotos);
    var photoArray = [];

    for (var i = 0; i < countPhotos; i++) {
      photoArray[i] = generatePhoto(countPhotos, urls, comments);
    }

    return photoArray;
  };

  return {
    photos: generatePhotos(window.dataDefault.countPhotos, window.dataDefault.comments)
  };
})();
