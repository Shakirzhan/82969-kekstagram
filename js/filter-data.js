'use strict';

window.filterData = (function () {
  var filters = document.querySelector('.filters');
  var filterDataCallback;
  var saveData;

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
  * @param {Object} a
  * @param {Object} b
  * @return {number}
  */
  var ruleSort = function (a, b) {
    return a.comments.length - b.comments.length || a.likes - b.likes;
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
  var onFilterButtonChange = function (value) {
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
    filters: filters,
    /**
     * Событие изменения фильтра
     * @param {Array} data - исходный массив данных, загруженных с сервера
     * @param {Function} callback
     */
    filterDataListener: function (data, callback) {
      saveData = data;
      filterDataCallback = callback;
      /**
       * Событие изменения фильтра
       * @param {Event} evt
       */
      filters.addEventListener('change', function (evt) {
        window.utils.debounce(function () {
          onFilterButtonChange(evt.target.value);
        });
      });
    }
  };
})();
