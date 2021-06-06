const thisModule = 'loadQueryFromFile.js';
let thisFunction = 'Outer';

// Load error Handler
const myErr = require('./ErrHandling');
myErr.raiseMessage('Log', thisModule, thisFunction, `Module ${thisModule} loaded`);

const fs = require('fs');

module.exports = class loadQueryFromFile{
    constructor(){
    }

    static GetQuery(file){
        return loadFile(file);
    }
};

function loadFile(file){
    try {
        return fs.readFileSync(file, 'utf-8');
    } catch (error) {
        myErr.raiseMessage('Error', thisModule, thisFunction, `Error loading file: ${file}`, error);
        throw new Error(error)
    }
}