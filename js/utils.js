'use strict';

window.utils = (function () {
  var uploadFormLabel = document.querySelector('.upload-file');
  var timeout;

  /**
   * Код клавиши ESC
   * @constant {number}
   */
  var ESC_KEY_CODE = 27;

  /**
  * Код клавиши ENTER
  * @constant {number}
   */
  var ENTER_KEY_CODE = 13;

  /**
  * Задержка вызова функции
  * @constant {number}
   */
  var DEBOUNCE_TIMER = 500;

  return {
    /**
     * Получить случайное число из диапазона [min, max]
     * @param {number} min
     * @param {number} max
     * @return {number}
     */
    getRandomNumber: function (min, max) {
      var random = min + Math.random() * (max + 1 - min);
      random = Math.floor(random);

      return random;
    },

    /**
     * Получить элемент массива по индексу, удалить элемент из массива по индексу (чтобы избежать дублирования данных)
     * @param {Array} array - массив
     * @param {boolean} deleteElement - удалить элемент из массива
     * @return {*} - элемент массива
     */
    getElementArray: function (array, deleteElement) {
      var index = window.utils.getRandomNumber(0, array.length - 1);
      var element = array[index];
      if (deleteElement) {
        array.splice(index, 1);
      }

      return element;
    },

    /**
     * Получить склонение слова по заданному числу
     * @param {number} number - число
     * @param {Array} words - массив слов
     * @return {string} - вариант слова
     */
    getWordByNumber: function (number, words) {
      var cases = [2, 0, 1, 1, 1, 2];
      return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    },

    /**
     * Показать элемент
     * @param {Element} el - элемент, который нужно показать
     */
    showElement: function (el) {
      el.classList.remove('invisible');
    },

    /**
     * Скрыть элемент
     * @param {Element} el - элемент, который нужно скрыть
     */
    hideElement: function (el) {
      el.classList.add('invisible');
    },

    /**
     * Проверка: нажата ли клавиша ESC
     * @param {KeyboardEvent} evt - событие
     * @return {boolean}
     */
    isEscKeyPress: function (evt) {
      return evt.keyCode === ESC_KEY_CODE;
    },

    /**
     * Проверка: нажата ли клавиша ENTER
     * @param {KeyboardEvent} evt - событие
     * @return {boolean}
     */
    isEnterKeyPress: function (evt) {
      return evt.keyCode === ENTER_KEY_CODE;
    },

    /**
     * Показать прелоадер
     */
    showPreloader: function () {
      uploadFormLabel.classList.add('load-file');
    },

    /**
     * Скрыть прелоадер
     */
    hidePreloader: function () {
      uploadFormLabel.classList.remove('load-file');
    },

    /**
     * Добавить класс ошибки к элементу
     * @param {Element} el
     */
    addError: function (el) {
      el.classList.add('m-error');
    },

    /**
     * Удалить класс ошибки с элемента
     * @param {Element} el
     */
    removeError: function (el) {
      el.classList.remove('m-error');
    },

    /**
    * Задержка вызова функции
    * @param {Function} cb
    * @param {*} param
     */
    debounce: function (cb, param) {
      if (timeout) {
        window.clearTimeout(timeout);
      }
      timeout = window.setTimeout(function () {
        cb(param);
      }, DEBOUNCE_TIMER);
    }
  };
})();
