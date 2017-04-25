'use strict';

window.filterData = (function () {
  var filters = document.querySelector('.filters');
  var filterButtons = Array.prototype.slice.call(filters.querySelectorAll('.filters-radio'), 0);
  var filterDataCallback;
  var saveData;

  /**
  * Количество данных для фильтра "Новые"
  * @constant {number}
  */
  var NEW_DATA_COUNT = 10;

  /**
  * Фильтрация данных по параметру "Популярные"
  */
  var popularData = function () {
    if (typeof filterDataCallback === 'function') {
      filterDataCallback(saveData);
    }
  };

  /**
  * Фильтрация данных по параметру "Новые"
  */
  var newData = function () {
    var copyArray = saveData.slice();
    var resultArray = [];
    for (var i = 0; i < NEW_DATA_COUNT; i++) {
      resultArray[i] = window.utils.getElementArray(copyArray, true);
    }
    if (typeof filterDataCallback === 'function') {
      filterDataCallback(resultArray);
    }
  };

  /**
  * Правило сортировки по параметру "Обсуждаемые"
  * @param {Object} a
  * @param {Object} b
  * @return {number}
  */
  var ruleSort = function (a, b) {
    var res;

    /**
     * Сравнение по количеству комментариев
     */
    if (a.comments.length > b.comments.length) {
      res = 1;
    } else if (a.comments.length < b.comments.length) {
      res = -1;
    } else {
      /**
       * Сравнение по количеству лайков
       */
      if (a.likes > b.likes) {
        res = 1;
      } else if (a.likes < b.likes) {
        res = -1;
      } else {
        res = 0;
      }
    }

    return res;
  };

  /**
  * Сортировка данных по параметру "Обсуждаемые"
  */
  var sortData = function () {
    var copyArray = saveData.slice();
    if (typeof filterDataCallback === 'function') {
      filterDataCallback(copyArray.sort(ruleSort));
    }
  };

  /**
  * Изменение фильтра
  * @param {Event} evt
  */
  var onFilterButtonChange = function (evt) {
    var filterValue = evt.target.value;

    if (filterValue === 'popular') {
      window.utils.debounce(popularData);
    } else if (filterValue === 'new') {
      window.utils.debounce(newData);
    } else if (filterValue === 'discussed') {
      window.utils.debounce(sortData);
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
      /**
       * Изменение фильтра
       * @param {Element} button - радио-кнопка
       */
      filterButtons.forEach(function (button) {
        filterDataCallback = callback;
        button.addEventListener('change', onFilterButtonChange);
      });
    }
  };
})();
