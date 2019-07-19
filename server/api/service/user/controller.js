import Async from 'async';
import Joi from 'joi';
import Boom from 'boom';
import _ from 'lodash';

import Config from 'config';

import UserDao from '../../data/user';
import Response from '../../models/response';

import {
    encryptString,
    encryptPass,
    generateToken,
} from '../../../common/util';

const sgMail = require('@sendgrid/mail');

export class UserController {

    signup(request, response, next) {
        const signUpSchema = {
            name: Joi.string().required().trim(),
            password: Joi.string().required().trim(),
            email: Joi.string().email().required().trim(),
        };

        Async.waterfall([
            cb => {
                Joi.validate(request.body, signUpSchema, (err, validationResult) => {
                    if (err) return next(Boom.badData(err));
                    cb(null);
                });
            },
            cb => {
                const query = Object.assign({}, { email: request.body.email });
                UserDao.findUser(query, (err, exists, data) => {
                    if (err) return next(Boom.badImplementation(err));
                    if (exists) {
                        return next(Boom.conflict('user already exists'));
                    } else {
                        return cb(null);
                    }

                });
            },
            cb => {
                const userData = {
                    email: request.body.email,
                    name: request.body.name,
                };

                const insertObject = Object.assign({}, userData, {
                    password: encryptPass(request.body.password),
                    verifyToken: encryptString(`${userData.userId}&${new Date().getTime() + (60 * 60 * 1000)}`),
                    isActive: 0,
                });

                UserDao.insertUser(insertObject, (err, data) => {
                    if (err) return next(Boom.badImplementation(err));
                    cb(null, data);
                });
            },
            (userDetail, cb) => {

                sgMail.setApiKey(Config.get('emailApiKey'));

                const html = `Hi there,
                <br/>
                Thank you for registering!
                <br/><br/>
                Please verify your email by typing the following token:
                <br/>
                Token: <b>${userDetail.verifyToken}</b>
                <br/>
                On the following page:
                <a href="http://localhost:5000/users/verify">http://localhost:3003/user/verify</a>
                <br/><br/>
                Have a pleasant day.`;

                const msg = {
                    to: 'saurabh93dtu@gmail.com',
                    from: 'saurabh93dtu@gmail.com',
                    subject: 'Sending with Twilio SendGrid is Fun',
                    text: 'and easy to do anywhere, even with Node.js',
                    html,
                };

                sgMail.send(msg).then((err, msg) => {
                    console.log(err, msg)
                    // if (err) return next(Boom.badImplementation(err));
                    cb(null, userDetail);
                });
            },

        ], (err, result) => {
            if (err) return next(err);
            return response.json(new Response(result));
        });
    }


    verifyUser(request, response, next) {
        const signUpSchema = {
            verifyToken: Joi.string().required(),
        };

        Async.waterfall([
            cb => {
                Joi.validate(request.body, signUpSchema, (err, validationResult) => {
                    if (err) return next(Boom.badData(err));
                    cb(null);
                });
            },
            cb => {
                const query = Object.assign({}, { verifyToken: request.body.verifyToken });
                UserDao.findUser(query, (err, exists, data) => {
                    if (err) return next(Boom.badImplementation(err));
                    if (!exists) {
                        return next(Boom.badRequest('token not valid'));
                    } else {
                        return cb(null, data);
                    }

                });
            },
            (userData, cb) => {
                const wherQquery = Object.assign({}, { verifyToken: request.body.verifyToken });
                const updateQquery = Object.assign({}, { isActive: 1 });

                UserDao.verifyUser(wherQquery, updateQquery, (err, data) => {
                    if (err) return next(Boom.badImplementation(err));
                    cb(null, data);
                });
            },

        ], (err, result) => {
            if (err) return next(err);
            return response.json(new Response(result));
        });

    }

    login(request, response, next) {

        const validationSchema = {
            email: Joi.string().required(),
            password: Joi.string().required().trim(),

        };

        Async.waterfall([
            cb => {
                Joi.validate(request.body, validationSchema, (err, validationResult) => {
                    if (err) return next(Boom.badData(err));
                    cb(null);
                });
            },
            cb => {
                const wherQquery = Object.assign({}, {
                    email: request.body.email,
                    password: encryptPass(request.body.password),
                });

                UserDao.findUser(wherQquery, (err, exists, data) => {
                    if (err) return next(Boom.badImplementation(err));
                    if (!exists) return next(Boom.notFound('user not found'));
                    if (exists && !data.isActive) {
                        return next(Boom.unauthorized('user not authorized'));
                    }
                    cb(null, data);
                });
            },
            (userData, cb) => {
                const query = Object.assign({}, {
                    userId: userData.userId,
                    authToken: generateToken(10),
                    isLoggedIn: 1,
                });

                UserDao.inserUserLogin(query, (err, data) => {
                    if (err) return next(Boom.badImplementation(err));
                    cb(null, data);
                });
            },
        ], (err, result) => {
            if (err) return next(err);
            return response.json(new Response(result, 'User successfully Logged in'));
        });
    }

}

export default new UserController();
