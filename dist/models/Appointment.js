"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
var database_1 = require("../database");
var sequelize_1 = require("sequelize");
var Client_1 = require("./Client");
var Professional_1 = require("./Professional");
var Service_1 = require("./Service");
exports.Appointment = database_1.sequelize.define('appointments', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    client_id: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'clients',
            key: 'id'
        }
    },
    professional_id: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'professionals',
            key: 'id'
        }
    },
    services: {
        allowNull: false,
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
    },
    schedule: {
        allowNull: false,
        type: sequelize_1.DataTypes.JSON
    },
    payment: {
        allowNull: false,
        type: sequelize_1.DataTypes.JSON
    },
    status: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    }
});
// Definir associações com os modelos de cliente e profissional
exports.Appointment.belongsTo(Client_1.Client, { foreignKey: 'client_id', as: 'clients' });
exports.Appointment.belongsTo(Professional_1.Professional, { foreignKey: 'professional_id', as: 'professional' });
exports.Appointment.belongsTo(Service_1.Service, { foreignKey: 'services', as: 'service' });
