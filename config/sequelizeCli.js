const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    development: {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
};
