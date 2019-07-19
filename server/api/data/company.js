import Company from '../models/company';
import UserCompanyFav from '../models/userCompanyFav';

import sequelize from '../../common/SqlConfig';

export class UserDao {
    getAllCompanies(criteria, done) {
        const query = `SELECT * FROM Company WHERE name LIKE CONCAT(:name,'%')
                         ORDER BY name DESC`;


        sequelize.query(query, {
            replacements: {
                name: criteria.name,
            },
            type: sequelize.QueryTypes.SELECT,

        }).then(result => {
            done(null, result);
        }).catch(error => {
            done(error);
        });
    }

    markFav(criteria, dataToSet, done) {
        UserCompanyFav.find({ where: criteria }).then(result => {
            if (result) {
                result.update(dataToSet).then(updatedResult => {
                    done(null, updatedResult);
                });
            } else {
                done(null);
            }
        }).catch(err => {
            done(err);
        });
    }

    createFav(dataToSet, done) {
        UserCompanyFav.create(dataToSet).then(result => {
            done(null, result);
        }).catch(err => {
            done(err);
        });
    }

    getUserFav(criteria, done) {
        const query = `SELECT * FROM UserCompanyFav T1
        INNER JOIN Company T2 ON T1.companyId = T2.companyId
        WHERE T1.userId = :userId AND T1.isFav = :isFav`;

        sequelize.query(query, {
            replacements: criteria,
            type: sequelize.QueryTypes.SELECT,

        }).then(result => {
            done(null, result);
        }).catch(error => {
            done(error);
        });
    }
}
export default new UserDao();
