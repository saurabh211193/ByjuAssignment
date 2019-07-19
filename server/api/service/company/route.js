import Express from 'express';
import controller from './controller';
import {
    authenticationMiddleware,
} from '../../../common/passportStrategy';

export default Express
    .Router()
    .post('/allcompanies', controller.getAllCompanies)
    .post('/userfavourite', controller.insertUserCompanyFav)
    .post('/favourite/:userId', controller.getUserFav)
