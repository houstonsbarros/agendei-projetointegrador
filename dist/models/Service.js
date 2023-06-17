"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
var database_1 = require("../database");
var sequelize_1 = require("sequelize");
exports.Service = database_1.sequelize.define('services', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    professional_id: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'professionals',
            key: 'id'
        }
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT
    },
    created_at: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    updated_at: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    }
}, {
    timestamps: false
});
