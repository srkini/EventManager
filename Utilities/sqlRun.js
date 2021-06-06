const thisModule = 'sqlRun.js';
const thisFunction = 'Outer';

// Load Error Handler
const myErr = require('./ErrHandling');
myErr.raiseMessage('Log', thisModule, thisFunction, `Module ${thisModule} loaded`);

// Load Db Connection Module
const db = require('./SetDBPool');

module.exports = class SQLRun{

    constructor(){
    }

    static runQuery(qry,params){
       if(qry === null || qry === undefined){
                throw new error('Query is Invalid');
        }else{
                return runMyQuery(qry,params);
        }
    }

    static runSP(spname,params){
        if(spname === null || spname === undefined){
                throw new Error('Invalid Stored Procedure Name');
        }else{
                return runMySP(spname,params);
        }
    }

    static closeSQLConnections(){
        closeMyConn();
    }
}

async function closeMyConn(){
    let pool = await db.conPoolPromise;
    pool.close();
}

async function runMyQuery(query,param){
    try{

        let fetch = await db.conPoolPromise;
        myErr.raiseMessage('Log', thisModule, thisFunction, `SQL Pool Connected`);
        let req = fetch.request();
        if(param){
                    param.forEach(e => addparam(e,req));
        };
        
        return await req.query(query);
 
    }catch(err){
        myErr.raiseMessage('Debug', thisModule, thisFunction, `SQL Event Failure`, err);
        throw new Error(`Error Occurred while executing the query : ${err}`);
    } 
}

async function runMySP(spname,param){

    try {
        let fetch = await db.conPoolPromise;
        myErr.raiseMessage('Log', thisModule, thisFunction, `SQL Pool Connected`);
        let req = fetch.request();

        if(param){param.forEach(e => addparam(e,req));};
        
        return await req.execute(spname);       
        
    } catch (error) {
        myErr.raiseMessage('Debug', thisModule, thisFunction, `SQL Event Failure`, err);
        throw new Error(`Error Occurred while executing the SP : ${error}`);
    }
}

function addparam(e,req){
    if(e.size !== undefined && e.size >0){
        req.input(e.name,db.mssql[e.type](e.size),e.value)
    }else{
        req.input(e.name,db.mssql[e.type],e.value)
    }
}