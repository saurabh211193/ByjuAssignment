import Config from 'config';
import crypto from 'crypto';
import * as Path from 'path';
import _ from 'lodash';
import fs from 'fs';

import mailNotifier from './mailnotifier';


const encryption = Config.get('encryption');
const saltLength = 9;


const getRootDir = () => Path.normalize(`${__dirname}/../..`);

const generateSalt = len => {
    const set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    let salt = '';
    let p = 2;
    for (let i = 0; i < len; i += 1) {
        salt += set[p];
        p += 3;
    }
    return salt;
};

const encodeBase64OfFile = file => {
    // var fs = require('fs');
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

const generateToken = len => {
    let token = '';
    const possible = 'abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    for (var i = 0; i < 7; i++) {
        token += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return token + Date.now()
}


const md5 = string => crypto.createHash('md5').update(string).digest('hex');


const encryptString = text => {
    const cipher = crypto.createCipher(encryption.algorithm, encryption.password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};


const decryptString = function decrypt(text) {
    const decipher = crypto.createDecipher(encryption.algorithm, encryption.password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};


const encryptPass = text => {
    const salt = generateSalt(saltLength);
    const hash = md5(text + salt);
    return salt + hash;
};


const generateOtp = () => Math.floor(Math.random() * ((9999 - 1000) + 1)) + 1000;




const pagination = (count, page, totalCount) => {
    const rowsPerPage = count || 20;
    const currentPage = parseInt(page, 10) || 1;

    const offset = (currentPage - 1) * rowsPerPage;
    const totalPages = Math.ceil(totalCount / rowsPerPage);
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    const paging = {
        prevPage,
        currentPage,
        nextPage,
        totalPages,
    };
    return {
        paging,
        offset,
        rowsPerPage,
    };
};


const emailVerification = data => {
    const hostAddress = Config.get('hostAddress');
    const encryptId = encryptString(`${data._id}&${new Date().getTime() + (60 * 60 * 1000)}`);
    const verificationLink = `${hostAddress}user/verifyuser?data=${encryptId}`;

    const options = {
        userEmail: data.email,
        userName: data.fN,
        verificationLink,
    };

    mailNotifier.verifyTemplate({
        to: data.email,
    }, options);
};


export {
    encryptString,
    decryptString,
    encryptPass,
    generateOtp,
    getRootDir,
    emailVerification,
    pagination,
    generateSalt,
    encodeBase64OfFile,
    generateToken,
};
