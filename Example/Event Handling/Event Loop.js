/**
 * Nodejs 에는 events 모듈과 EventEmitter 클래스가 내장되어 있다.
 * 이를 사용하여 event와 event handler를 연동(bind) 할 수 있다.
 */

// evnet module
var events = require("events");

// Event Emitter Object
var eventEmitter = new events.EventEmitter();

// event와 event emitter를 bind
// eventName은 임의 설정 가능
var eventName = "TestEmitter";
var eventHandler = function connected() {
    console.log("Connection Successful");
}
eventEmitter.on(eventName, eventHandler);

// 프로그램안에서 이벤트를 발생시킬 때는 다음 코드를 사용한다.
eventEmitter.emit(eventName);