/**
 * Конструктор класса обмена сообщениями
 * @constructor
 */

function PubSub() {
    this.events = {};
}

/**
 * Функция подписки на событие
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет вызвана при возникновении события
 * @return {function}         ссылка на handler
 */
PubSub.prototype.subscribe = function(eventName, handler) {
    if (!this.events[eventName]) {
        this.events[eventName] = [];
    }
    if (handler !== undefined) {
        this.events[eventName].push({
            handler: handler
        });
        return handler;
    }
};

/**
 * Функция отписки от события
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет отписана
 * @return {function}         ссылка на handler
 */
PubSub.prototype.unsubscribe = function(eventName, handler) {
    for (var i = 0; i < this.events[eventName].length; i++) {
        var obj = this.events[eventName][i];
        if (obj['handler'] == handler) {
            this.events[eventName].splice(i, 1);
            break;
        }
    }
    return handler;
};

/**
 * Функция генерирующая событие
 * @param  {string} eventName имя события
 * @param  {object} data      данные для обработки соответствующими функциями
 * @return {bool}             удачен ли результат операции
 */
PubSub.prototype.publish = function(eventName, data) {
    if (this.events[eventName] === (undefined || this.events[eventName].length === 0)) {
        return false;
    } else {
        for (var i = 0; i < this.events[eventName].length; i++) {
          var obj = this.events[eventName][i];
          setTimeout(obj.handler(data), 10);
        }
    }
    return true;
};

/**
 * Функция отписывающая все функции от определённого события
 * @param  {string} eventName имя события
 * @return {bool}             удачен ли результат операции
 */
PubSub.prototype.off = function(eventName) {
    if (this.events[eventName]) {
        this.events[eventName] = undefined;
        return true;
    } else {
        return false;
    }
};

/**
 * @example
 *
 * PubSub.subscribe('click', function(event, data) { console.log(data) });
 * var second = PubSub.subscribe('click', function(event, data) { console.log(data) });
 *
 * //Отписать одну функцию от события 'click':
 * PubSub.unsubscribe('click', second);
 *
 * //Отписать группу функций от события 'click'
 * PubSub.off('click');
 */

/*
    Дополнительный вариант — без явного использования глобального объекта
    нужно заставить работать методы верно у любой функции
 */

var PubSub = new PubSub();

Function.prototype.subscribe = function(eventName) {
    PubSub.subscribe(eventName, this);
    return this;
};
Function.prototype.unsubscribe = function(eventName) {
    PubSub.unsubscribe(eventName, this);
    return this;
};

function foo(event, data) {
    //body…
}


foo.subscribe('click');

foo.unsubscribe('click');