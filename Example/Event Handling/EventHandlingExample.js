// eventName
var eventRecv = "eventRecv";
var eventConnect = "eventConnect";

// evnet module
var events = require("events");

// event emitter
var eventEmitter = new events.EventEmitter();

// event handler
var connectEventHandler = function connected()
{
    console.log("Connection Successful");

    // data_recevied Event
    eventEmitter.emit(eventRecv);
}

// connection event와 connectEventHandler 연동
eventEmitter.on(eventConnect, connectEventHandler);

// eventRecv와 익명 함수 연동
eventEmitter.on(eventRecv, function() {
    console.log("Data Recv");
});

// connection Event 발생
eventEmitter.emit(eventConnect);

console.log("Program Ended");