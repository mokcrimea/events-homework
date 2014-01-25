#Домашняя работа

##PubSub шаблон

Необходимо реализовать шаблон проектирования Publish/Subscribe.

Объект должен уметь:
  * подписывать функции на соответствующее событие
  * отписывать нужную функцию от события
  * отписывать группу функций от конкретного события
  * отписывать все функции от соответствующего события

Дополнительно:
  * у каждой функции должен появиться метод subscribe
  * у каждой функции должен появиться метод unsubscribe

В файле `pubsub/pubsub.js` описан базовый интерфейс, который нужно реализовать.