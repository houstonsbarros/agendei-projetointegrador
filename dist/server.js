"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var database_1 = require("./database");
var routes_1 = require("./routes");
var app = (0, express_1.default)();
var cors = require('cors');
app.use(cors());
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(routes_1.router);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    database_1.sequelize.authenticate().then(function () {
        console.log('Conectado ao Banco de Dados');
    });
    console.log("Servidor iniciado");
});