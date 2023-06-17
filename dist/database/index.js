"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
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
