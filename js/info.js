'use strict';

window.info = (function () {
  var modalInfo = document.querySelector('.modal-info');
  var infoText = modalInfo.querySelector('.modal-info__text');

  return {
    openModalInfo: function (text) {
      infoText.textContent = text;
      modalInfo.classList.add('m-show');
      setTimeout(function () {
        modalInfo.classList.remove('m-show');
      }, 5000);
    }
  };
})();
