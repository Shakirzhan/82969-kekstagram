'use strict';

window.upload = (function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFormFile = document.querySelector('#upload-file');
  var dropZone = document.querySelector('#upload-select-image');
  var previewImage = document.querySelector('.filter-image-preview');

  /**
  * Разрешенные расширения файла
  * @constant {array}
   */
  var FILE_EXTENSION = {
    'jpg': '',
    'jpeg': '',
    'png': '',
    'svg': '',
    'gif': ''
  };

  /**
   * Навести на область загрузки
   * @param {DragEvent} evt
   */
  var onDropZoneDragOver = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    dropZone.classList.add('m-hover');
  };

  /**
   * Убрать наведение с области загрузки
   * @param {DragEvent} evt
   */
  var onDropZoneDragLeave = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    dropZone.classList.remove('m-hover');
  };

  /**
   * Отпустить перетаскиваемый элемент на области загрузки
   * @param {DragEvent} evt
   */
  var onDropZoneDrop = function (evt) {
    evt.preventDefault();
    uploadImage(evt.dataTransfer.files[0]);
  };

  dropZone.addEventListener('dragover', onDropZoneDragOver, false);
  dropZone.addEventListener('dragleave', onDropZoneDragLeave, false);
  dropZone.addEventListener('drop', onDropZoneDrop, false);

  /**
   * Проверить расширение файла
   * @param {File} file
   * @return {boolean}
   */
  var checkFileExtension = function (file) {
    var extension = file.name.split('.').pop();
    return extension in FILE_EXTENSION;
  };

  /**
   * Запуск процесса чтения файла
   */
  var onLoadStartFile = function () {
    window.utils.showPreloader();
  };

  /**
   * Ошибка при чтении файла
   */
  var onErrorFile = function () {
    window.utils.hidePreloader();
    window.info.openModalInfo('Возникла ошибка при загрузке файла.');
  };

  /**
   * Успешное заврешение чтения файла
   * @param {ProgressEvent} evt
   */
  var onLoadFile = function (evt) {
    window.utils.hidePreloader();
    previewImage.src = evt.target.result;
    window.form.openCropForm();
  };

  /**
   * Чтение содержимого файла
   * @param {File} file
   */
  var uploadImage = function (file) {
    dropZone.classList.remove('m-hover');

    if (file && checkFileExtension(file)) {
      var reader = new FileReader();

      reader.readAsDataURL(file);
      reader.addEventListener('loadstart', onLoadStartFile);
      reader.addEventListener('error', onErrorFile);
      reader.addEventListener('load', onLoadFile);
    } else {
      window.openModalInfo('Файл имеет неподдерживаемый формат!');
    }
  };

  /**
   * Изменить поле загрузки файла
   * @param  {Event} evt - событие
   */
  var onUploadFormFileChange = function (evt) {
    if (evt.target.value !== '') {
      uploadImage(evt.target.files[0]);
    }
  };

  /**
   * Сбросить форму загрузки файла
   */
  var resetUploadForm = function () {
    uploadForm.reset();
  };

  uploadFormFile.addEventListener('change', onUploadFormFileChange);
  window.form.cropForm.addEventListener('closecropform', resetUploadForm);

  return {
    uploadForm: uploadForm
  };
})();
