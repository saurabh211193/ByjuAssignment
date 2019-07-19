import {
    STRING,
    TINYINT,
    SMALLINT,
    BIGINT,
    DATE,
    NOW,
} from 'sequelize';

import sequelize from '../../common/SqlConfig';

const UserSchema = {
    userId: {
        type: SMALLINT(6),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: STRING(255),
        allowNull: false,
    },
    password: {
        type: STRING(150),
        allowNull: false,
    },
    name: {
        type: STRING(100),
        allowNull: false,
    },
    isActive: {
        type: TINYINT(1),
        allowNull: false,
    },
    verifyToken: {
        type: STRING(150),
        allowNull: false,
    },
    createdOn: {
        type: DATE,
        default: NOW,
        allowNull: true,
    },
    updatedOn: {
        type: DATE,
        allowNull: true,
    },
};

const UserDetails = sequelize.define('User', UserSchema, {
    freezeTableName: true,
});

export default UserDetails;
