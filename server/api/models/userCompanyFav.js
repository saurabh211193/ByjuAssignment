import {
    TINYINT,
    BIGINT,
    DATE,
} from 'sequelize';

import sequelize from '../../common/SqlConfig';

const UserCompanyFavSchema = {
    Id: {
        type: BIGINT(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: BIGINT(11),
        allowNull: false,

    },
    companyId: {
        type: BIGINT(11),
        allowNull: false,

    },
    isFav: {
        type: TINYINT(1),
        allowNull: true,
    },
    createdOn: {
        type: DATE,
        allowNull: true,
    },
};

const UserCompanyFav = sequelize.define('UserCompanyFav', UserCompanyFavSchema, {
    freezeTableName: true,
});

export default UserCompanyFav;
