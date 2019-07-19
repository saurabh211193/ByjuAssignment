import appRoot from 'app-root-path';
import Config from 'config';
import {
    createLogger,
    transports,
    format,
} from 'winston';

import * as winston from 'winston';


require('winston-mongodb');

const getDate = function () {

    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = mm + '-' + dd + '-' + yyyy;
    return today;
}
const options = {
    fileInfo: {
        level: 'info',
        filename: `${appRoot}/logs/info-${getDate()}.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 30,
        colorize: false,
        timestamp: true,
    },
    fileError: {
        level: 'error',
        filename: `${appRoot}/logs/error-${getDate()}.log`,
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 15,
        colorize: false,
        timestamp: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
        timestamp: true,
    }
};


const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.json(),
    ),
    transports: [
        // new transports.Console(),
        new transports.File(options.fileInfo),
        new transports.File(options.fileError),
    ],
});

logger.stream = {
    write: (message, encoding) => {
        logger.info(message);
        logger.error(message);
        logger.info(message, {
            metaKey: 'metaValue',
        });
    },
};

export default logger;
