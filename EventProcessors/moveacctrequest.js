'use strict';

const thisModule = 'moveacctrequest.js';
let thisFunction = 'Outer';

// Load error Handler
const myErr = require('../Utilities/ErrHandling');
myErr.raiseMessage('Log', thisModule, thisFunction, `Module ${thisModule} loaded`);

// Get event emitter
const myEm = require('../Utilities/myEmitter');

module.exports = class MoveAcctRequest{
    constructor(){
    }
};

myEm.on('moveacctrequest', (iEvent)=>{
    myErr.raiseMessage('Log', thisModule, 'Move Account Request event handler', `event caught`);
    ProcessEvent(iEvent);
});

// Get DB Module
const RunQ = require('../Utilities/sqlRun');

const SQLParam = require('../clsSqlParams');

async function ProcessEvent(event){

    let thisFunction = 'ProcessEvent';

    myErr.raiseMessage('Log', thisModule, thisFunction, `processing Event ${event.EventID}`);
    try {
        
        let sParams = [];

        sParams.push(new SQLParam('OldIPID', 'Int', 0, event.EventPayload.IPID));
        sParams.push(new SQLParam('ArngID' , 'Int', 0, event.EventPayload.ArngID));
        sParams.push(new SQLParam('NewIPID', 'Int', 0, event.EventPayload.RelatedIPID));
        sParams.push(new SQLParam('JgbrsNxtAccHolder', 'TINYINT', 0, event.EventPayload.JgbrsNxtAccHolder));
        sParams.push(new SQLParam('RltnTypId', 'Int', 0, event.EventPayload.RltnTypId));

        let SPName = 'pcdcs_ProcessAcctMoveRqst';
        let result = await RunQ.runSP(SPName,sParams);

        if(result.returnValue === 0){

            myErr.raiseMessage('Log', thisModule, thisFunction, `SP (${SPName}) processing has been completed. Event ${event.EventID}`);
            event.numHandlersCompleted += 1;
            event.StatusHandlers = (event.StatusHandlers === 'F') ? 'F' : 'C';
            myEM.emit('EventComplete', event, eventStatusHandlers);

        } else {
            throw new Error('Error: SP returned fail');
        }

    } catch (err) {
        myErr.raiseMessage('Error', thisModule, thisFunction, `Error from catch block. Event ${event.EventID}`,err);
        event.numHandlersCompleted += 1;
        event.StatusHandlers = 'F';
        myEM.emit('EventComplete', event, 'F');       
    }
};









