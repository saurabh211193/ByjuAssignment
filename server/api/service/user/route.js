import Express from 'express';
import controller from './controller';
import {
    authenticationMiddleware,
} from '../../../common/passportStrategy';

export default Express
    .Router()
    .post('/signup', controller.signup)
    .post('/login', controller.login)
    .post('/verify', controller.verifyUser);
