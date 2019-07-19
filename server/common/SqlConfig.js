import Config from 'config';
import Sequelize from 'sequelize';

const dbConfig = Config.get('MsSqlDbConfig');

const sequelize = new Sequelize(dbConfig.dbname, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectOptions: {
        multipleStatements: true,
    },
    operatorsAliases: false,
    define: {
        timestamps: false,
    },
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000,
    },
});

export default sequelize;
