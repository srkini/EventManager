const myEM = require('./myEmitter');

const colourError = `\x1b[31m`;
const colourLog = '';
const colourDebug = `\x1b[34m`;
const colourStatus = `\x1b[43m \x1b[36m`;

module.exports = class ErrHandler{

    constructor(){        
    }

    static raiseMessage(level, module, fn, options, error){
        if(error === undefined || error === null){
            myEM.emit(level, { module: module, function: fn, options: options });
        } else {
            myEM.emit(level, { module: module, function: fn, options: options, error: JSON.stringify(error, Object.getOwnPropertyNames(error))});
        }
    }
}

myEM.on('Error', (o)=>{
    console.log(colourError, `${new Date().toISOString()}: Error recieved: ${JSON.stringify(o)}`);
    console.log('');
});

myEM.on('Log', (o)=>{
    console.log(colourLog, `${new Date().toISOString()}: Log recieved: ${JSON.stringify(o)}`);
    console.log('');
});

myEM.on('Debug', (o)=>{
    console.log(colourDebug, `${new Date().toISOString()}: Log recieved: ${JSON.stringify(o)}`);
    console.log('');
});

myEM.on('Status', (o)=>{
    console.log(colourStatus, `${new Date().toISOString()}: Log recieved: ${JSON.stringify(o)}`);
    console.log('');
});

console.log('Error Handler Loaded Successfully');