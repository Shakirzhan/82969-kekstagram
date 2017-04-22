'use strict';

window.openModalInfo = (function () {
  var modalInfo = document.querySelector('.modal-info');
  var infoText = modalInfo.querySelector('.modal-info__text');

  return function (text) {
    infoText.textContent = text;
    modalInfo.classList.add('m-show');
    setTimeout(function () {
      modalInfo.classList.remove('m-show');
    }, 5000);
  };
})();
