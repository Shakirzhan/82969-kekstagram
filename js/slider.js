'use strict';

window.slider = (function () {
  var slider = window.form.cropForm.querySelector('.upload-filter-level');
  var sliderLine = window.form.cropForm.querySelector('.upload-filter-level-line');
  var sliderHandle = window.form.cropForm.querySelector('.upload-filter-level-pin');
  var sliderValue = window.form.cropForm.querySelector('.upload-filter-level-val');
  var imagePreview = window.form.cropForm.querySelector('.filter-image-preview');
  var activeFilterValue;

  /**
   * Рассчитать значение для фильтра
   * @param {number} value - значение ползунка слайдера
   * @return {number}
   */
  var calcValueSlider = function (value) {
    return (value / sliderLine.clientWidth * 100).toFixed();
  };

  /**
   * Настроить слайдер в выбранное положение
   * @param {number} value - значение ползунка слайдера
   */
  var setSliderValue = function (value) {
    if (value < 0) {
      value = 0;
    } else if (value > sliderLine.clientWidth) {
      value = sliderLine.clientWidth;
    }

    sliderHandle.style.left = value + 'px';
    sliderValue.style.width = calcValueSlider(value) + '%';
    setFilterImage(calcValueSlider(value));
  };

  /**
   * Установить фильтр на изображении
   * @param {number} value - вычисленное значение слайдера
   */
  var setFilterImage = function (value) {
    var filterChrome = (value / 100).toFixed(2);
    var filterSepia = (value / 100).toFixed(2);
    var filterMarvin = value;
    var filterPhobos = (3 * value / 100).toFixed(2);
    var filterHeat = (3 * value / 100).toFixed(2);
    var filterValue;

    switch (activeFilterValue) {
      case 'chrome':
        filterValue = 'grayscale(' + filterChrome + ')';
        break;
      case 'sepia':
        filterValue = 'sepia(' + filterSepia + ')';
        break;
      case 'marvin':
        filterValue = 'invert(' + filterMarvin + '%)';
        break;
      case 'phobos':
        filterValue = 'blur(' + filterPhobos + 'px)';
        break;
      case 'heat':
        filterValue = 'brightness(' + filterHeat + ')';
        break;
    }

    imagePreview.style.filter = filterValue;
  };

  var onSliderLineClick = function (evt) {
    if (!evt.target.classList.contains('upload-filter-level-pin')) {
      evt.preventDefault();
      setSliderValue(evt.offsetX);
    }
  };

  var onSliderHandleMouseDown = function (evt) {
    evt.preventDefault();

    var startCoordX = evt.clientX;

    var onMouseMove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();

      var offsetX = startCoordX - mouseMoveEvt.clientX;
      var valueSlider = (sliderHandle.offsetLeft - offsetX);
      startCoordX = mouseMoveEvt.clientX;

      setSliderValue(valueSlider);
    };

    var onMouseUp = function (mouseUpEvt) {
      mouseUpEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  sliderHandle.addEventListener('mousedown', onSliderHandleMouseDown);
  sliderLine.addEventListener('click', onSliderLineClick);
  window.utils.hideElement(slider);

  return {
    showSlider: function (value) {
      activeFilterValue = value;

      if (activeFilterValue === 'none') {
        window.utils.hideElement(slider);
        imagePreview.style.filter = '';
      } else {
        window.utils.showElement(slider);
        setSliderValue(sliderLine.clientWidth);
      }
    }
  };
})();
