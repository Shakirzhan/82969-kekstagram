'use strict';

window.load = (function () {
  /**
  * Код успешного ответа от сервера
  * @constant {number}
   */
  var SUCCESS_STATUS = 200;

  /**
  * Время ожидания ответа от сервера
  * @constant {number}
   */
  var TIMEOUT = 3000;

  /**
  * Код ошибки времени ожидания ответа от сервера
  * @constant {number}
   */
  var TIMEOUT_STATUS = 504;

  /**
  * Сообщения об ошибках
  * @constant {Object}
   */
  var ERROR_MESSAGE = {
    '400': 'Cервер обнаружил в запросе клиента синтаксическую ошибку.',
    '404': 'Сервер не нашел соответствующего ресурса по указанному адресу.',
    '500': 'Внутренняя ошибка сервера.',
    '503': 'По техническим причинам сервер временно не имеет возможности обрабатывать запросы.',
    '504': 'Сервер не дождался ответа для завершения текущего запроса.'
  };

  /**
   * Показать сообщение об ошибке
   * @param {number} status - код ошибки
   */
  var showLoadErrorMessage = function (status) {
    window.openModalInfo('Ошибка! ' + ERROR_MESSAGE[status.toString()]);
  };

  /**
   * Запуск загрузки данных с сервера
   */
  var onLoadStart = function () {
    window.preloader.show();
  };

  /**
   * Ошибка при загрузке данных с сервера
   * @param {number} xhr - ответ сервера
   */
  var onLoadError = function (xhr) {
    window.preloader.hide();
    showLoadErrorMessage(xhr.status);
  };

  /**
   * Ошибка при превышении времени ожидания ответа от сервера
   */
  var onLoadTimeout = function () {
    window.preloader.hide();
    showLoadErrorMessage(TIMEOUT_STATUS);
  };

  /**
   * Загрузить данные с сервера
   * @param {string} url - url для запроса данных
   * @param {Function} onLoad - callback
   */
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('GET', url, true);
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('loadstart', onLoadStart);
    xhr.addEventListener('error', onLoadError);
    xhr.addEventListener('timeout', onLoadTimeout);
    xhr.addEventListener('load', function () {
      window.preloader.hide();
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        showLoadErrorMessage(xhr.status);
      }
    });

    xhr.send();
  };
})();
