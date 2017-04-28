'use strict';

window.filterData = (function () {
  var filtersElement = document.querySelector('.filters');
  var filterDataCallback;
  var saveData;

  /**
  * Задержка вызова функции
  * @constant {number}
   */
  var DEBOUNCE_TIMER = 500;

  /**
  * Количество данных для фильтра "Новые"
  * @constant {number}
  */
  var NEW_DATA_COUNT = 10;

  /**
  * Фильтрация данных по параметру "Популярные"
  * @return {Array}
  */
  var popularData = function () {
    return saveData;
  };

  /**
  * Фильтрация данных по параметру "Новые"
  * @return {Array}
  */
  var newData = function () {
    var copyArray = saveData.slice();
    var resultArray = [];

    for (var i = 0; i < NEW_DATA_COUNT; i++) {
      resultArray[i] = window.utils.getElementArray(copyArray, true);
    }

    return resultArray;
  };

  /**
  * Правило сортировки по параметру "Обсуждаемые"
  * @param {Object} left
  * @param {Object} right
  * @return {number}
  */
  var ruleSort = function (left, right) {
    return right.comments.length - left.comments.length || right.likes - left.likes;
  };

  /**
  * Сортировка данных по параметру "Обсуждаемые"
  * @return {Array}
  */
  var sortData = function () {
    return saveData.slice().sort(ruleSort);
  };

  /**
  * Изменение фильтра
  * @param {String} value - новое значение фильтра
  */
  var onFiltersElementChange = function (value) {
    var resultData = [];

    switch (value) {
      case 'popular':
        resultData = popularData();
        break;
      case 'new':
        resultData = newData();
        break;
      case 'discussed':
        resultData = sortData();
        break;
    }

    if (typeof filterDataCallback === 'function') {
      filterDataCallback(resultData);
    }
  };

  return {
    filtersElement: filtersElement,
    /**
     * Событие изменения фильтра
     * @param {Array} data - исходный массив данных, загруженных с сервера
     * @param {Function} callback
     */
    addFilterDataListener: function (data, callback) {
      saveData = data;
      filterDataCallback = callback;
      /**
       * Событие изменения фильтра
       * @param {Event} evt
       */
      filtersElement.addEventListener('change', function (evt) {
        window.debounce(function () {
          onFiltersElementChange(evt.target.value);
        }, DEBOUNCE_TIMER);
      });
    }
  };
})();
