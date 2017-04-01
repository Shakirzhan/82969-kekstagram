'use strict';

var photoUrl = [];
for (var i = 0; i < 25; i++) {
  photoUrl[i] = i + 1;
}

var photoComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];

/**
 * Получение случайного числа из диапазона [min, max]
 *
 * @param  {number} min - минимальная граница числа
 * @param  {number} max - максимальная граница числа
 * @return {number} - случайное число из диапазона [min, max]
 */
var getRandomIndex = function (min, max) {
  var randomIndex = min - 0.5 + Math.random() * (max - min + 1);
  randomIndex = Math.round(randomIndex);

  return randomIndex;
};

/**
 * Получение элемента массива по индексу, удаление элемента (по требованию)
 *
 * @param  {array} array - массив
 * @param  {boolean} flagDeleteElement - удалять ли элемент из массива
 * @return {type} - элемент массива
 */
var getElement = function (array) {
  var index = getRandomIndex(0, array.length - 1);
  var element = array[index];
  deleteElement(array, index);

  return element;
};


/**
 * Получение массива комментариев
 *
 * @param  {type} array - массив
 * @return {array} - массив комментариев
 */
var getCommentArray = function (array) {
  var commentArray = [];
  var countComment = getRandomIndex(1, 2);

  for (var k = 0; k < countComment; k++) {
    var index = getRandomIndex(0, array.length - 1);
    commentArray[k] = array[index];
  }

  return commentArray;
};

/**
 * Удаление элемента из массива по индексу
 *
 * @param  {array} array - массив
 * @param  {number} index - индекс, удаляемого элемента
 */
var deleteElement = function (array, index) {
  array.splice(index, 1);
};

var generatePhoto = function (arrayUrl, arrayComments) {
  var photo = {
    url: 'photos/' + getElement(arrayUrl) + '.jpg',
    likes: getRandomIndex(15, 200),
    comments: getCommentArray(arrayComments)
  };

  return photo;
};


/**
 * Генерация массива изображений по заданному количеству и параметрам
 *
 * @param  {number} countPhoto - количество генерируемых изображений
 * @param  {array} arrayUrl - массив url фотографий
 * @param  {array} arrayComments - массив комментариев
 * @return {array} - массив изображений
 */
var generatePhotoArray = function (countPhoto, arrayUrl, arrayComments) {
  var photoArray = [];

  for (var j = 0; j < countPhoto; j++) {
    photoArray[j] = generatePhoto(arrayUrl, arrayComments);
  }

  return photoArray;
};

var pictureTemplate = document.querySelector('#picture-template').content;


/**
 * Создать HTML-блок с изображением
 *
 * @param  {object} picture - изображение
 * @return {type} - HTML-блок с изображением
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

var fragmentList = document.createDocumentFragment();
var pictureList = document.querySelector('.pictures');
var photoArray = generatePhotoArray(25, photoUrl, photoComments);

for (var l = 0; l < photoArray.length; l++) {
  fragmentList.appendChild(createPictureItem(photoArray[l]));
}

pictureList.appendChild(fragmentList);

var uploadOverlay = document.querySelector('.upload-overlay');
var galleryOverlay = document.querySelector('.gallery-overlay');


/**
 * Получить склонение слова по заданному числу
 *
 * @param  {number} number - число
 * @param  {array} titles - массив слов
 * @return {type} - вариант слова
 */
var formatEndings = function (number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};


/**
 * Отрисовка элемента галереи
 *
 * @param  {object} picture - изображение
 */
var renderGalleryOverlay = function (picture) {
  var imageGallery = galleryOverlay.querySelector('.gallery-overlay-image');
  var likesCount = galleryOverlay.querySelector('.likes-count');
  var commentsCount = galleryOverlay.querySelector('.comments-count');
  var commentsCountText = galleryOverlay.querySelector('.comments-count-text');

  imageGallery.setAttribute('src', picture.url);
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  commentsCountText.textContent = formatEndings(picture.comments.length, ['комментарий', 'комментария', 'комментариев']);
};

uploadOverlay.classList.add('invisible');
renderGalleryOverlay(photoArray[0]);
galleryOverlay.classList.remove('invisible');
