const rbcMailer = require('../rbcMailer');
const myErr = require('./ErrHandling');
const thisModule = 'formatEmail.js';
const replaceAll = (str, mapObj)=>{
    
    const regexp = new RegExp(Object.keys(mapObj).join('|'),'gi');

    return str.replace(regexp, (matched)=>{
        return mapObj[matched.toLowerCase()];
    });
};

class FormatEmail{

    constructor(config={}){
        this.config = config;
    }

    get mailerInstance(){
        return new rbcMailer({
            host: this.config.SMTPHost,
            port: this.config.SMTPPort,
        });
    }

    send(event={}, templateName='SMTPTemplate_EventFail'){
        const thisFunction = 'send';
        try {
            if(this.config.SMTPEnable === 'true'){
                const emailContext = {_event_: JSON.stringify(event)}
                if(templateName === 'SMTPTemplate_EventFail'){
                    emailContext._event_ = event.EventID;
                }
                this.mailerInstance.send({
                    from: this.config.SMTPFrom,
                    to: this.config.SMTPTo,
                    subject: this.config.SMTPSubject,
                    html: replaceAll(this.config[templateName], emailContext)
                }, (error, result)=>{
                    if(error){
                        myErr.raiseMessage('Error', thisModule, thisFunction, `Email Sending Failure`, error);
                    } else {
                        myErr.raiseMessage('Debug', thisModule, thisFunction, `Email Sent Successfully ${JSON.stringify(result)}`);
                    }
                })
            }           
        } catch (error) {
            myErr.raiseMessage('Error', thisModule, thisFunction, `Email Sending Failure`, error);
        }
    }
    
    sendError(errObj={}){
        const thisFunction = 'sendError';
        try {
            const emailContext = {
                "type": errObj.name || 'Error',
                "message": errObj.message,
                "stackTrace": errObj.stack
            }           
            this.send(emailContext, 'SMTPTemplate_Error');
        } catch (error) {
            myErr.raiseMessage('Error', thisModule, thisFunction, `Email Sending Failure`, error);
        }
    }
}

module.exports = FormatEmail;