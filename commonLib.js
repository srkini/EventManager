'use strict';

const CryptoJS = require('crypto-js');

function decrypt(text, key){
    return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8).toString();
}

module.exports = {
    decrypt,
};