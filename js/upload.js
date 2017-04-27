'use strict';

window.upload = (function () {
  var form = document.querySelector('#upload-select-image');
  var formFile = document.querySelector('#upload-file');
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
    uploadFile(evt.dataTransfer.files[0]);
  };

  /**
   * Проверить расширение файла
   * @param {File} file
   * @return {boolean}
   */
  var isCheckFileExtension = function (file) {
    var extension = file.name.split('.').pop();
    return extension in FILE_EXTENSION;
  };

  /**
   * Запуск процесса чтения файла
   */
  var onLoadStartFile = function () {
    window.preloader.show();
  };

  /**
   * Ошибка при чтении файла
   */
  var onErrorFile = function () {
    window.preloader.hide();
    window.info.openModalInfo('Возникла ошибка при загрузке файла.');
  };

  /**
   * Успешное заврешение чтения файла
   * @param {ProgressEvent} evt
   */
  var onLoadFile = function (evt) {
    window.preloader.hide();
    previewImage.src = evt.target.result;
    window.form.openCropForm();
  };

  /**
   * Чтение содержимого файла
   * @param {File} file
   */
  var uploadFile = function (file) {
    dropZone.classList.remove('m-hover');

    if (isCheckFileExtension(file)) {
      var reader = new FileReader();

      reader.addEventListener('loadstart', onLoadStartFile);
      reader.addEventListener('error', onErrorFile);
      reader.addEventListener('load', onLoadFile);

      reader.readAsDataURL(file);
    } else {
      window.openModalInfo('Файл имеет неподдерживаемый формат!');
    }
  };

  /**
   * Изменить поле загрузки файла
   * @param  {Event} evt - событие
   */
  var onFormFileChange = function (evt) {
    if (evt.target.value !== '') {
      uploadFile(evt.target.files[0]);
    }
  };

  dropZone.addEventListener('dragover', onDropZoneDragOver, false);
  dropZone.addEventListener('dragleave', onDropZoneDragLeave, false);
  dropZone.addEventListener('drop', onDropZoneDrop, false);
  formFile.addEventListener('change', onFormFileChange);

  return {
    form: form
  };
})();
