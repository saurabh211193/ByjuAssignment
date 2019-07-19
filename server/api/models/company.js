import {
    STRING,
    TINYINT,
    SMALLINT,
    BIGINT,
    DATE,
} from 'sequelize';

import sequelize from '../../common/SqlConfig';

const CompanySchema = {
    companyId: {
        type: SMALLINT(6),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: STRING(100),
        allowNull: true,
    },
    address: {
        type: STRING(100),
        allowNull: true,
    },
    phoneNo: {
        type: BIGINT(10),
        allowNull: true,
    },

    isActive: {
        type: TINYINT(1),
        allowNull: true,
    },
    createdOn: {
        type: DATE,
        allowNull: true,
    },

    updatedOn: {
        type: DATE,
        allowNull: true,
    },

};

const CompanyDetails = sequelize.define('User', CompanySchema, {
    freezeTableName: true,
});

export default CompanyDetails;
