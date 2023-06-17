"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuth = void 0;
var jwtService_1 = require("../services/jwtService");
var clientService_1 = require("../services/clientService");
function ensureAuth(req, res, next) {
    var authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' });
    }
    var token = authorizationHeader.replace(/Bearer /, '');
    jwtService_1.jwtService.verifyToken(token, function (err, decoded) {
        if (err || typeof decoded === 'undefined') {
            return res.status(401).json({ message: 'Não autorizado: token inválido' });
        }
        clientService_1.clientService.findbyEmail(decoded.email).then(function (client) {
            req.client = client;
            next();
        });
    });
}
exports.ensureAuth = ensureAuth;
