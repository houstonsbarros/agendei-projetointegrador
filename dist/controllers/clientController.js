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
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientController = void 0;
var jwtService_1 = require("../services/jwtService");
var clientService_1 = require("../services/clientService");
exports.clientController = {
    // POST /client/register
    register: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, first_name, last_name, cpf, phone, email, password, emailAlreadyExists, cpfAlreadyExists, phoneAlreadyExists, client, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, first_name = _a.first_name, last_name = _a.last_name, cpf = _a.cpf, phone = _a.phone, email = _a.email, password = _a.password;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, clientService_1.clientService.findbyEmail(email)];
                case 2:
                    emailAlreadyExists = _b.sent();
                    return [4 /*yield*/, clientService_1.clientService.checkCPF(cpf)];
                case 3:
                    cpfAlreadyExists = _b.sent();
                    return [4 /*yield*/, clientService_1.clientService.checkPhone(phone)];
                case 4:
                    phoneAlreadyExists = _b.sent();
                    if (emailAlreadyExists || cpfAlreadyExists || phoneAlreadyExists) {
                        throw new Error('Cliente já cadastrado');
                    }
                    return [4 /*yield*/, clientService_1.clientService.create({
                            first_name: first_name,
                            last_name: last_name,
                            cpf: cpf,
                            phone: phone,
                            email: email,
                            password: password
                        })];
                case 5:
                    client = _b.sent();
                    return [2 /*return*/, res.status(201).json(client)];
                case 6:
                    err_1 = _b.sent();
                    if (err_1 instanceof Error) {
                        return [2 /*return*/, res.status(400).json({ message: err_1.message })];
                    }
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); },
    // POST /client/login
    login: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, client_1, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, clientService_1.clientService.findbyEmail(email)];
                case 2:
                    client_1 = _b.sent();
                    if (!client_1) {
                        return [2 /*return*/, res.status(401).json({ message: 'E-mail não registrado' })];
                    }
                    client_1.checkPassword(password, function (err, isSame) {
                        if (err) {
                            return res.status(400).json({ message: err.message });
                        }
                        if (!isSame) {
                            return res.status(401).json({ message: 'Senha incorreta' });
                        }
                        var payload = {
                            id: client_1.id,
                            first_name: client_1.first_name,
                            email: client_1.email
                        };
                        var token = jwtService_1.jwtService.signPayload(payload, '1d');
                        return res.status(200).json({ authenticated: true, client: client_1, token: token });
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _b.sent();
                    if (err_2 instanceof Error) {
                        return [2 /*return*/, res.status(400).json({ message: err_2.message })];
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    // GET /client/current
    show: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var currentUser;
        return __generator(this, function (_a) {
            currentUser = req.client;
            try {
                return [2 /*return*/, res.status(200).json(currentUser)];
            }
            catch (err) {
                if (err instanceof Error) {
                    return [2 /*return*/, res.status(400).json({ message: err.message })];
                }
            }
            return [2 /*return*/];
        });
    }); }
};
