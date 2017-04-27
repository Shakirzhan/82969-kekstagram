'use strict';

window.openModalInfo = (function () {
  var modalInfo = document.querySelector('.modal-info');
  var infoText = modalInfo.querySelector('.modal-info__text');

  /**
   * Показать информационное сообщение
   * @param {string} text - текст сообщения
   */
  return function (text) {
    infoText.textContent = text;
    modalInfo.classList.add('m-show');
    /**
     * Скрыть информационное сообщение через 5000 мс
     */
    setTimeout(function () {
      modalInfo.classList.remove('m-show');
    }, 5000);
  };
})();
