import {
    Strategy,
    ExtractJwt,
} from 'passport-jwt';
import Config from 'config';
import Jwt from 'jsonwebtoken';
import Passport from 'passport';
import Boom from 'boom';
import sequelize from './SqlConfig';
import Response from '../api/models/response';

// import LoginDao from '../api/data/login';


const jwtStrategy = new Strategy({
    secretOrKey: Config.get('jwtSecret'),
    jwtFromRequest: ExtractJwt.fromHeader('token'),
}, (jwtPayload, done) => {
    const {
        // id,
        isSocial,
    } = jwtPayload;

    if (!isSocial) {

    } else {
        return done(null, jwtPayload);
    }
});

Passport.serializeUser(function (user, done) {
    done(null, user);
});

Passport.deserializeUser(function (user, done) {
    done(null, user);
});


const generateJwt = (payload, done) => {
    Jwt.sign(payload, Config.get('jwtSecret'),
        Config.get('jwtOptions'),
        (tokenError, token) => {
            if (tokenError) {
                return done(Boom.badImplementation(tokenError.message, tokenError));
            }
            return done(null, token);
        });
};


const authenticate = () => Passport.authenticate('jwt', {
    failWithError: true,
});

const authenticationMiddleware = (req, res, next) => {

};

export {
    jwtStrategy,
    generateJwt,
    authenticate,
    authenticationMiddleware,
};
