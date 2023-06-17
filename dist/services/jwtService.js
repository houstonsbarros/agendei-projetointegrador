"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret = 'agendei-project';
exports.jwtService = {
    signPayload: function (payload, expiration) {
        return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiration });
    },
    verifyToken: function (token, callbackfn) {
        jsonwebtoken_1.default.verify(token, secret, callbackfn);
    }
};
