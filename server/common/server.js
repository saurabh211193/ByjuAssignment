import Express from 'express';
import * as bodyParser from 'body-parser';

import path from 'path';

import Mongoose from 'mongoose';

import morgan from 'morgan';
import winston from 'winston';

import Passport from 'passport';
import helmet from 'helmet';
import cors from 'cors';

import _ from 'lodash';
import url from 'url';
import sequelize from './SqlConfig';
import ErrorHandler from './errorHandler';
import logger from './logger';



import {
    jwtStrategy,
} from './passportStrategy';

import {
    checkEncryptionFlowEligibility,
} from './util';

const app = new Express();
const root = path.normalize(`${__dirname}/../..`);


export default class ExpressServer {
    constructor() {
        this.Sqldb = this.Sqldb.bind(this);
        this.Mongodb = this.Mongodb.bind(this);
        this.handleError = this.handleError.bind(this);
        this.listen = this.listen.bind(this);


        app.use(cors());

        app.use(bodyParser.text());
        app.use(bodyParser.json({
            limit: '50mb',
        }));
        app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true,
        }));


        app.use(Express.static(path.join(__dirname, '../../client/src/')));


        app.get('*', function (req, res, next) {

            res.sendFile(path.join(__dirname, '../../client/src/'));
        });


        Passport.use(jwtStrategy);
        app.use(Passport.initialize());

        app.use(morgan('combined', {
            // stream: logger.stream,
        }));

        app.set('view engine', 'ejs');
        app.use(helmet());
    }

    router(routes) {
        routes(app);
        return this;
    }

    handleError() {
        const errorHandler = new ErrorHandler({
            shouldLog: true,
        });
        app.use(errorHandler.build());
        app.use(errorHandler.unhandledRequest());
        return this;
    }


    listen(port) {
        app.listen(port, () => {
            console.log(`app is listening at port ${port}`);
        });
        return this;
    }

    Mongodb(dbUrl) {
        return new Promise((resolve, reject) => {
            Mongoose.connect(dbUrl, {
                useNewUrlParser: true,
            }, err => {
                if (err) {
                    console.log(`Error in mongodb connection ${err.message}`);
                    return reject(err);
                }
                console.log('Mongodb connection established');
                return resolve(this);
            });
        });
    }

    Sqldb() {
        return new Promise((resolve, reject) => {
            sequelize
                .authenticate()
                .then(() => {
                    console.log('Mysql connection has been established successfully.');
                    return resolve(this);
                })
                .catch(err => {
                    console.error('Unable to connect to the mysql:', err);
                    return reject(err);
                });
        });
    }
}
