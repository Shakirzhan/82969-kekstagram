'use strict';

/**
 * Получить случайное число из диапазона [min, max]
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
var getRandomNumber = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);

  return random;
};

/**
 * Получить элемент массива по индексу, удалить элемент из массива по индексу (чтобы избежать дублирования данных)
 * @param {Array} array - массив
 * @param {boolean} deleteElement - удалить элемент из массива
 * @return {*} - элемент массива
 */
var getElement = function (array, deleteElement) {
  var index = getRandomNumber(0, array.length - 1);
  var element = array[index];
  if (deleteElement) {
    array.splice(index, 1);
  }

  return element;
};

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
  var countComments = getRandomNumber(1, 2);

  for (var i = 0; i < countComments; i++) {
    var index = getRandomNumber(0, array.length - 1);
    comments[i] = array[index];
  }

  return comments;
};

/**
 * Сгенерировать объект фотографии
 * @param {Array} urls - массив url изображений
 * @param {Array} comments - массив комментариев
 * @return {Object} - фотография
 */
var generatePhoto = function (urls, comments) {
  var photo = {
    url: 'photos/' + getElement(urls, true) + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: generateComments(comments)
  };

  return photo;
};

/**
 * Сгенерировать массив фотографий по заданному количеству и параметрам
 * @param {number} countPhotos - количество генерируемых изображений
 * @param {Array} urls - массив url фотографий
 * @param {Array} comments - массив комментариев
 * @return {Array} - массив фотографий
 */
var generatePhotos = function (countPhotos, urls, comments) {
  var photoArray = [];

  for (var i = 0; i < countPhotos; i++) {
    photoArray[i] = generatePhoto(urls, comments);
  }

  return photoArray;
};

/**
 * Создать HTML-блок с фотографией
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
 * Сгенерировать фрагмент фотографий
 * @param {Array} photos - массив фотографий
 * @return {DocumentFragment} - фрагмент фотографий
 */
var generateFragmentPhotos = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPictureItem(photos[i]));
  }

  return fragment;
};

/**
 * Получить склонение слова по заданному числу
 * @param {number} number - число
 * @param {Array} words - массив слов
 * @return {string} - вариант слова
 */
var getWordByNumber = function (number, words) {
  var cases = [2, 0, 1, 1, 1, 2];
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

/**
 * Отрисовать шаблон комментария
 * @param {number} countComments
 * @return {string} - шаблон
 */
var renderComment = function (countComments) {
  return '<span class="comments-count">' + countComments + '</span> ' + getWordByNumber(countComments, ['комментарий', 'комментария', 'комментариев']);
};

/**
 * Отрисовать элемент галереи
 * @param {Object} picture - изображение
 */
var renderGalleryOverlay = function (picture) {
  var imageGallery = galleryOverlay.querySelector('.gallery-overlay-image');
  var likesCount = galleryOverlay.querySelector('.likes-count');
  var commentsCount = galleryOverlay.querySelector('.gallery-overlay-controls-comments');

  imageGallery.setAttribute('src', picture.url);
  likesCount.textContent = picture.likes;
  commentsCount.innerHTML = renderComment(picture.comments.length);
};

/**
 * Показать элемент
 * @param {Element} el - элемент, который нужно показать
 */
var showElement = function (el) {
  el.classList.remove('invisible');
};

/**
 * Скрыть элемент
 * @param {Element} el - элемент, который нужно скрыть
 */
var hideElement = function (el) {
  el.classList.add('invisible');
};

/**
* Количество изображений
* @constant {number}
 */
var PHOTOS_COUNT = 25;

var photoComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];
var photos = generatePhotos(PHOTOS_COUNT, generateUrls(PHOTOS_COUNT), photoComments);
var pictureTemplate = document.querySelector('#picture-template').content;
var pictureList = document.querySelector('.pictures');
var cropForm = document.querySelector('.upload-overlay');
var uploadForm = document.querySelector('.upload-form');
var galleryOverlay = document.querySelector('.gallery-overlay');

// Сгенерировать изображения и отрисовать их в DOM
pictureList.appendChild(generateFragmentPhotos(photos));
// Скрыть форму кадрирования изображения
hideElement(cropForm);

var pictures = Array.prototype.slice.call(document.querySelectorAll('.picture'), 0);
var closeGalleryOverlay = galleryOverlay.querySelector('.gallery-overlay-close');

var uploadFormFile = uploadForm.querySelector('#upload-file');
var uploadFormLabel = uploadForm.querySelector('.upload-file');
var buttonCloseCropForm = cropForm.querySelector('.upload-form-cancel');
var submitCropForm = cropForm.querySelector('.upload-form-submit');

/**
 * Код клавиши ESC
 * @constant {number}
 */
var ESC = 27;

/**
* Код клавиши ENTER
* @constant {number}
 */
var ENTER = 13;

/**
 * Нажать ESC в открытой галерее
 * @param {KeyboardEvent} evt - событие
 */
var onGalleryEscPress = function (evt) {
  if (evt.keyCode === ESC) {
    evt.preventDefault();
    closeGallery();
  }
};

/**
 * Нажать ENTER на кнопке закрытия гялереи
 * @param {KeyboardEvent} evt - событие
 */
var onCloseGalleryEnterPress = function (evt) {
  if (evt.keyCode === ENTER) {
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
  if (evt.keyCode === ENTER) {
    evt.preventDefault();
    openGallery(i);
  }
};

/**
 * Открыть галерею, отрисовать изображение, навесить обработчики событий
 * @param {number} i - индекс изображения, которое необходимо отрисовать в галерее
 */
var openGallery = function (i) {
  renderGalleryOverlay(photos[i]);
  showElement(galleryOverlay);
  closeGalleryOverlay.focus();
  closeGalleryOverlay.addEventListener('click', closeGallery);
  closeGalleryOverlay.addEventListener('keydown', onCloseGalleryEnterPress);
  galleryOverlay.addEventListener('click', onGalleryOverlayClick);
  document.addEventListener('keydown', onGalleryEscPress);
};

/**
 * Закрыть галерею, снять обработчики событий
 */
var closeGallery = function () {
  hideElement(galleryOverlay);
  closeGalleryOverlay.removeEventListener('click', closeGallery);
  closeGalleryOverlay.removeEventListener('keydown', onCloseGalleryEnterPress);
  galleryOverlay.removeEventListener('click', onGalleryOverlayClick);
  document.removeEventListener('keydown', onGalleryEscPress);
};

/**
 * Навесить обработчики на все изображения
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
 * Открыть форму загрузки изображения
 */
var openUploadForm = function () {
  showElement(uploadForm);
};

/**
 * Закрыть форму загрузки изображения
 */
var closeUploadForm = function () {
  hideElement(uploadForm);
};

/**
 * Нажать ESC в форме кадрирования
 * @param {KeyboardEvent} evt - событие
 */
var onCropFormEscPress = function (evt) {
  if (!evt.target.classList.contains('upload-form-description') && evt.keyCode === ESC) {
    evt.preventDefault();
    closeCropForm();
  }
};

/**
 * Нажать ENTER на кнопке закрытия формы кадрирования
 * @param {KeyboardEvent} evt - событие
 */
var onButtonCloseCropFormEnterPress = function (evt) {
  if (evt.keyCode === ENTER) {
    evt.preventDefault();
    closeCropForm();
  }
};

/**
 * Нажать на кнопку оправки формы кадрирования
 * @param {MouseEvent} evt - событие
 */
var onSubmitCropFormClick = function (evt) {
  if (isCropFormValidity()) {
    evt.preventDefault();
    closeCropForm();
  }
};

/**
 * Нажать ENTER на кнопкe оправки формы кадрирования
 * @param {KeyboardEvent} evt - событие
 */
var onSubmitCropFormEnterPress = function (evt) {
  if (isCropFormValidity() && evt.keyCode === ENTER) {
    evt.preventDefault();
    closeCropForm();
  }
};

/**
 * Показать прелоадер
 */
var showPreloader = function () {
  uploadFormLabel.classList.add('load-file');
};

/**
 * Скрыть прелоадер
 */
var hidePreloader = function () {
  uploadFormLabel.classList.remove('load-file');
};

/**
 * Изменить поле загрузки файла
 * @param  {Event} evt - событие
 */
var onUploadFormFileChange = function (evt) {
  showPreloader();
  if (evt.target.value !== '') {
    hidePreloader();
    openCropForm();
  } else {
    hidePreloader();
  }
};

var resizeButtonDec = cropForm.querySelector('.upload-resize-controls-button-dec');
var resizeButtonInc = cropForm.querySelector('.upload-resize-controls-button-inc');
var resizeInput = cropForm.querySelector('.upload-resize-controls-value');
var resizeComment = cropForm.querySelector('.upload-form-description');
var imagePreview = cropForm.querySelector('.filter-image-preview');
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
* Шаг масштабирования изображения
* @constant {string}
 */
var DEFAULT_FILTER = 'none';

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
 * Валидация масштаба
 * @return {boolean}
 */
var validResizeValue = function () {
  var resizeValue = getResizeValue();

  if (resizeValue >= 25 && resizeValue <= 100) {
    removeError(resizeInput);
    return true;
  } else {
    addError(resizeInput);
    return false;
  }
};

/**
 * Валидация поля комментария
 * @return {boolean}
 */
var validResizeComment = function () {
  var comment = resizeComment.value.toString();

  if (comment.length >= 30 && comment.length <= 100) {
    removeError(resizeComment);
    return true;
  } else {
    addError(resizeComment);
    return false;
  }
};

/**
 * Валидация фильтров изображения
 * @return {boolean}
 */
var validFilterImage = function () {
  var activeFilter = cropForm.querySelector('[name="upload-filter"]:checked');

  if (activeFilter) {
    removeError(filterControls);
    return true;
  } else {
    addError(filterControls);
    return false;
  }
};

/**
 * Валидация формы кадрирования
 * @return {boolean}
 */
var isCropFormValidity = function () {
  return (validResizeValue() && validFilterImage() && validResizeComment());
};

/**
 * Изменить масштаб у изображения
 * @param  {type} value - масштаб
 */
var changeScaleOnImage = function (value) {
  imagePreview.style.transform = 'scale(' + (value / 100).toFixed(2) + ')';
};

/**
 * Изменить фильтр у изображения
 * @param {string} value - название фильтра
 */
var changeFilterOnImage = function (value) {
  for (var i = 0; i < imagePreview.classList.length; i++) {
    if (imagePreview.classList[i].indexOf('filter-') !== -1) {
      imagePreview.classList.remove(imagePreview.classList[i]);
    }
  }

  imagePreview.classList.add('filter-' + value);
};

/**
 * Изменить фильтр
 * @param  {Event} evt - событие
 */
var onFilterControlsChange = function (evt) {
  changeFilterOnImage(evt.target.value);
};

/**
 * Сбросить фильтр изображения
 * @param {string} value - название фильтра
 */
var setDefaultFilter = function (value) {
  var activeFilter = cropForm.querySelector('[name="upload-filter"]:checked');

  activeFilter.checked = false;
  cropForm.querySelector('#upload-filter-' + value).checked = true;
};

/**
 * Сбросить поле комментария
 */
var clearTextComment = function () {
  resizeComment.value = '';
};

/**
 * Сбросить форму кадрирования
 */
var resetCropForm = function () {
  changeScaleOnImage(MAX_RESIZE);
  changeFilterOnImage(DEFAULT_FILTER);
  setDefaultFilter(DEFAULT_FILTER);
  clearTextComment();
};

/**
 * Открыть форму кадрирования, навесить обработчики событий
 */
var openCropForm = function () {
  showElement(cropForm);
  closeUploadForm();
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
  hideElement(cropForm);
  openUploadForm();
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
