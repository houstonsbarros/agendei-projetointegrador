"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
// O sequelize é uma ORM
// Mapeamento de Objeto Relacional
// Facilita a comunicação entre o banco de dados e o código
var database_1 = require("../database");
var sequelize_1 = require("sequelize");
// Funciona pra hashear uma senha
// Hashear é basicamente criptografar um dado
var bcrypt_1 = __importDefault(require("bcrypt"));
// Crio table a tabela Client no Sequelize
exports.Client = database_1.sequelize.define('clients', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    first_name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    last_name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    cpf: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    }
}, {
    // Hooks são gatilhos que são executados antes ou depois de uma ação
    hooks: {
        beforeSave: function (client) { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(client.isNewRecord || client.changed('password'))) return [3 /*break*/, 2];
                        _a = client;
                        return [4 /*yield*/, bcrypt_1.default.hash(client.password.toString(), 11)];
                    case 1:
                        _a.password = _b.sent();
                        _b.label = 2;
                    case 2:
                        client.phone = client.phone.replace(/\D/g, '');
                        client.cpf = client.cpf.replace(/\D/g, '');
                        return [2 /*return*/];
                }
            });
        }); }
    }
});
// Verifica se a senha está correta
exports.Client.prototype.checkPassword = function (password, callbackfn) {
    bcrypt_1.default.compare(password, this.password, function (err, isSame) {
        if (err) {
            callbackfn(err);
        }
        callbackfn(err, isSame);
    });
};
