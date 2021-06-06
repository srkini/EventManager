// Load error Handler

const myErr = require('./ErrHandling');

module.exports = class clsEvent {

    constructor(dbEvent){
        try {

            this.EventID = dbEvent.EventID;
            this.EventDtTm = dbEvent.EventDtTm;
            this.EventCommand = dbEvent.EventCommand;
            this.EventType = dbEvent.EventType;
            this.EventPriority = dbEvent.EventPriority;
            this.EventPayload = JSON.parse(dbEvent.EventPayload);
            this.IPID = dbEvent.IPID;
            this.SecondIPID = dbEvent.SecondIPID;
            this.ArngID = dbEvent.ArngID;
            this.RltnTypID = dbEvent.RltnTypID;
            this.Retry = dbEvent.Retry;
            this.RecNo = dbEvent.RecNo;
            this.numHandlersCompleted = null;
            this.numHandlers = null;
            this.StatusHandlers = null;
            
        } catch (err) {
            myErr.raiseMessage('Error', 'buildEvent.js', 'constructor', err);
            throw new Error('Error creating Event Object');
        }
    }
};