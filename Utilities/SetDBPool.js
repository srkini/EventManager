// Set error handling constants

const thisModule = 'SetDBPool.js';
const thisFunction = 'Outer';

// Load error Handler
const myErr = require('./ErrHandling');
myErr.raiseMessage('Log', thisModule, thisFunction, `Module ${thisModule} loaded`);

const sql = require('mssql');
const config = require('./config');

const conPoolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool => {
    myErr.raiseMessage('Log', thisModule, thisFunction, `SQL Pool Connected`);
    return pool;
})
.catch(err=>{
    myErr.raiseMessage('Log', thisModule, thisFunction, `Database connection failed! Bad Config`, err);
    return Promise.reject(err);
});

module.exports = {sql, conPoolPromise};