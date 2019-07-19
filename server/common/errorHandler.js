import {
    inspect,
} from 'util';
import logger from './logger';


export default class ErrorHandler {
    constructor({
        logMethod,
        shouldLog = false,
    }) {
        this.shouldLog = shouldLog;
        this.logMethod = logMethod;
    }


    stringify(val) {
        const {
            stack,
        } = val;
        if (stack) {
            return String(stack);
        }

        const str = String(val);
        return str === toString.call(val) ? inspect(val) : str;
    }

    logError(err, req, res) {
        if ('output' in err && err.output.statusCode === 200) {
            logger.info(`${err.output.statusCode || 'status code not found'} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} - ` + JSON.stringify(req.body));
        } else if ('output' in err) {
            logger.error(`${err.output.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} - ` + JSON.stringify(req.body));
        } else {
            logger.error(`${500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} - ` + JSON.stringify(req.body));
        }

        if (this.shouldLog) {
            const errorString = this.stringify(err);
            if (typeof this.logMethod === 'function') {
                this.logMethod(errorString);
            } else {
                console.log(errorString);
            }
        }
    }


    build() {
        return (err, req, res, next) => {
            if (err && !res.headersSent) {
                this.logError(err, req, res);

                if (err.isBoom) {
                    return res.status(200).json(err.output.payload);
                }

                if (err.statusCode) {
                    return res.status(200).json({
                        message: err.message,
                        error: err.name,
                        statusCode: err.statusCode,
                    });
                }

                if (err.name === 'CastError') {
                    return res.status(200).json({
                        message: 'A cast error occured.',
                        error: 'Bad Request',
                        statusCode: 400,
                    });
                }

                if (err.name === 'AuthenticationError') {
                    return res.status(200).json({
                        message: err.message,
                        error: err.name,
                        statusCode: 401,
                    });
                }

                if (err.name === 'MongoError') {
                    return res.status(200).json({
                        message: 'Problem with database operation',
                        error: err.name,
                        statusCode: 500,
                    });
                }

                if (err.name === 'ValidationError') {
                    return res.status(200).json({
                        message: err.isJoi ? err.message : 'A validation error occured.',
                        error: 'Bad Request',
                        statusCode: 400,
                    });
                }

                return res.status(200).json({
                    message: 'An internal server error occurred',
                    error: 'Internal Server Error',
                    statusCode: 500,
                });
            }

            return next();
        };
    }


    unhandledRequest() {
        return (req, res, next) => {
            if (!res.headersSent) {
                return res.status(501).json({
                    message: 'Request is not handled',
                    error: 'Not Implemented',
                    statusCode: 501,
                });
            }
            return next();
        };
    }
}
