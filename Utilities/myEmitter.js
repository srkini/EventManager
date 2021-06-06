const EventEmitter = require('events');

class MyEmitter extends EventEmitter{

    constructor(){
        super();
    }

    emitObject(eventName, paramObj){
        paramObj.numHandlers = this.listenerCount(eventName);
        this.emit(eventName, paramObj);
        return paramObj;
    }
}

const myEmitter = new MyEmitter();

module.exports = myEmitter;