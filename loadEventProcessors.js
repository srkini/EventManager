const myEM = require('./Utilities/myEmitter');
const myErr = require('./Utilities/ErrHandling');

const thisModule = 'loadEventProcessor.js';
let thisFunction = 'start';

async function reloadProcessors(startDIR){

    thisFunction = 'reloadProcessors';

    const {promisify} = require('util');
    const {resolve} = require('path');
    const fs = require('fs');
    const readdir = promisify(fs.readdir);
    const stat = promisify(fs.stat);

    let myProcessors = {};

    async function getFiles(dir){

        const subdirs = await readdir(dir);
        const files = await Promise.all(subdirs.map(async (subdir)=>{
            const res = resolve(dir, subdir);
            return (await stat(res)).isDirectory() ? getFiles(res) : res;
        }));
        return files.reduce((a,f)=> a.concat(f), []);
    }

    await getFiles(startDIR)
    .then(files =>{ 

        thisFunction = 'getFiles: first Then';
        myErr.raiseMessage('Log', thisModule, thisFunction, files);
    
        let anyErrors = false;
    
        files.forEach(function (item){
            myProcessors[item] = {};
            myProcessors[item].item = require(item);
            myProcessors[item].state = true;
        });

        return myProcessors;
    })
}

module.exports = reloadProcessors;