'use strict';

window.upload = (function () {
  var uploadFormFile = document.querySelector('#upload-file');
  var dropZone = document.querySelector('#upload-select-image');

  /**
  * Разрешенные расширения файла
  * @constant {array}
   */
  var FILE_EXTENSION = ['jpg', 'jpeg', 'png', 'svg'];

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
    var file = evt.dataTransfer.files[0];
    uploadImage(file);
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
    var arr = file.name.split('.');
    return FILE_EXTENSION.indexOf(arr[arr.length - 1].toLowerCase()) !== -1 ? true : false;
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
   */
  var onLoadFile = function () {
    window.utils.hidePreloader();
    window.form.openCropForm();
  };

  /**
   * Чтение содержимого файла
   * @param {File} file
   */
  var uploadImage = function (file) {
    if (file && checkFileExtension(file)) {
      var reader = new FileReader();

      reader.readAsDataURL(file);
      reader.addEventListener('loadstart', onLoadStartFile);
      reader.addEventListener('error', onErrorFile);
      reader.addEventListener('load', onLoadFile);
    } else {
      window.info.openModalInfo('Файл имеет неподдерживаемый формат!');
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
   * Изменить поле загрузки файла
   */
  uploadFormFile.addEventListener('change', onUploadFormFileChange);
})();
