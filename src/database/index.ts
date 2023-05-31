import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    storage: 'localhost',
    port: 5432,
    database: 'agendei',
    username: 'houstonb',
    password: 'houstonb',
    define: {
        underscored: true,
    }
});