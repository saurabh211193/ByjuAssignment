import User from '../models/user';
import UserLogin from '../models/userLogin';
import sequelize from '../../common/SqlConfig';

export class UserDao {
    findUser(criteria, done) {

        User.findOne({
            where: criteria,
        }).then(userDetail => {
            if (userDetail) {
                done(null, true, userDetail);
            } else {
                done(null, false);
            }

        }).catch(err => {
            done(err);
        });
    }

    insertUser(dataToSet, done) {
        User.create(dataToSet).then(userDetail => {
            done(null, userDetail);
        }).catch(err => {
            done(err);
        });
    }

    verifyUser(criteria, projection, done) {
        User.update(projection, {
            where: criteria,
        }).then(userDetail => {
            done(null, userDetail);
        }).catch(err => {
            done(err);
        });
    }

    inserUserLogin(dataToSet, done) {
        UserLogin.create(dataToSet).then(userDetail => {
            done(null, userDetail);
        }).catch(err => {
            done(err);
        });
    }


}

export default new UserDao();
