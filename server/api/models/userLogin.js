import {
    STRING,
    TINYINT,
    BIGINT,
    DATE,
    NOW,
} from 'sequelize';

import sequelize from '../../common/SqlConfig';

const UserLoginSchema = {
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
    authToken: {
        type: STRING(200),
        allowNull: false,
    },
    isLoggedIn: {
        type: TINYINT(1),
        allowNull: false,
    },
    loggedOn: {
        type: DATE,
        default: NOW,
        allowNull: true,
    },
};

const UserLoginDetails = sequelize.define('UserLogin', UserLoginSchema, {
    freezeTableName: true,
});

export default UserLoginDetails;
