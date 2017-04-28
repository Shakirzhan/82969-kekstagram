'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content;
  var pictureList = document.querySelector('.pictures');
  var pictures;

  /**
  * Url сервера для загрузки данных
  * @constant {string}
   */
  var LOAD_URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';

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
  var generateFragmentPictures = function (photos) {
    var fragmentPictures = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragmentPictures.appendChild(createPictureItem(photos[i]));
    }

    return fragmentPictures;
  };

  /**
   * Нажать на изображение
   * @param {MouseEvent} evt - событие
   * @param {Object} img - изображение, которое необходимо отрисовать в галерее
   */
  var onPictureClick = function (evt, img) {
    evt.preventDefault();
    window.gallery.openGallery(img);
  };

  /**
   * Нажать ENTER на изображении
   * @param {KeyboardEvent} evt - событие
   * @param {Object} img - изображение, которое необходимо отрисовать в галерее
   */
  var onPictureEnterPress = function (evt, img) {
    if (window.utils.isEnterKeyPress(evt)) {
      evt.preventDefault();
      window.gallery.openGallery(img);
    }
  };

  /**
  * Навесить обработчики на все изображения галереи
  * @param {Array} array - массив изображений
  */
  var addPicturesListener = function (array) {
    var pictureElements = Array.prototype.slice.call(document.querySelectorAll('.picture'), 0);

    /**
     * @param {Element} picture - изображерие
     * @param {number} i - индекс изображения в массиве
     */
    pictureElements.forEach(function (picture, i) {
      picture.addEventListener('click', function (evt) {
        onPictureClick(evt, array[i]);
      });
      picture.addEventListener('keydown', function (evt) {
        onPictureEnterPress(evt, array[i]);
      });
    });
  };

  /**
   * Отрисовать данные, навесить обработчики событий
   * @param {Array} array - массив фотографий
   */
  var renderPictures = function (array) {
    pictureList.innerHTML = '';
    pictureList.appendChild(generateFragmentPictures(array));
    addPicturesListener(array);
  };

  /**
   * Получить данные
   * @param {Array} data - массив фотографий
   */
  var getPicuresData = function (data) {
    pictures = data;
    renderPictures(pictures);
    window.filterData.addFilterDataListener(pictures, renderPictures);
    window.filterData.filtersElement.classList.remove('hidden');
  };

  window.load(LOAD_URL, getPicuresData);
})();
