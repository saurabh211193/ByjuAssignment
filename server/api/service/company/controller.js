import Async from 'async';
import Joi from 'joi';
import Boom from 'boom';
import _ from 'lodash';

import CompanyDao from '../../data/company';
import Response from '../../models/response';

import {
    encryptString,
    encryptPass,
    pagination,
    generateToken,
} from '../../../common/util';

export class UserController {

    getAllCompanies(request, response, next) {
        const validationSchema = {
            name: Joi.optional(),
            sortyby: Joi.string().optional(),
            sortybytype: Joi.string().optional(),
        };

        Async.waterfall([
            cb => {
                Joi.validate(request.query, validationSchema, (err, validationResult) => {
                    if (err) return next(Boom.badData(err));
                    cb(null);
                });
            },
            cb => {
                const wherQquery = Object.assign({}, {
                    name: request.query.name,
                });
                CompanyDao.getAllCompanies(wherQquery, (err, data) => {
                    if (err) return next(Boom.badImplementation);
                    cb(null, data);
                });
            },
        ], (err, result) => {
            if (err) return next(err);
            return response.json(new Response(result));
        });
    }

    insertUserCompanyFav(request, response, next) {
        const validationSchema = {
            userId: Joi.number().required(),
            companyId: Joi.number().required(),
            isFav: Joi.number().required(),
        };

        Async.waterfall([
            cb => {
                Joi.validate(request.body, validationSchema, (err, validationResult) => {
                    if (err) return next(Boom.badData(err));
                    cb(null);
                });
            },
            cb => {
                const whereQquery = Object.assign({}, {
                    userId: request.body.userId,
                    companyId: request.body.companyId,
                });
                const updateQquery = Object.assign({}, {
                    isFav: request.body.isFav,
                });

                CompanyDao.markFav(whereQquery, updateQquery, (err, data) => {
                    if (err) return next(Boom.badImplementation(err));
                    cb(null, data);
                });
            },
            (favData, cb) => {
                if (!favData) {
                    const query = Object.assign({}, {
                        userId: request.body.userId,
                        companyId: request.body.companyId,
                        isFav: request.body.isFav,
                    });

                    CompanyDao.createFav(query, (err, data) => {
                        if (err) return next(Boom.badImplementation(err));
                        cb(null, data);
                    });
                } else {
                    cb(null);
                }
            },
        ], (err, result) => {
            if (err) return next(err);
            return response.json(new Response(result));
        });
    }

    getUserFav(request, response, next) {
        const validationSchema = {
            userId: Joi.number().required(),
        };

        Async.waterfall([
            cb => {
                Joi.validate(request.params, validationSchema, (err, validationResult) => {
                    if (err) return next(Boom.badData(err));
                    cb(null);
                });
            },
            cb => {
                const whereQquery = Object.assign({}, {
                    userId: request.params.userId,
                    isFav: 1,
                });
                CompanyDao.getUserFav(whereQquery, (err, data) => {
                    if (err) return next(Boom.badImplementation(err));
                    cb(null, data);
                });
            },
        ], (err, result) => {
            if (err) return next(err);
            return response.json(new Response(result));
        });
    }
}

export default new UserController();
