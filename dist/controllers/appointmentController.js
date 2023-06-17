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
exports.appointmentController = void 0;
var appointmentService_1 = require("../services/appointmentService");
exports.appointmentController = {
    create: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, client_id, professional_id, services, schedule, payment, status_1, appointment, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, client_id = _a.client_id, professional_id = _a.professional_id, services = _a.services, schedule = _a.schedule, payment = _a.payment, status_1 = _a.status;
                    return [4 /*yield*/, appointmentService_1.appointmentService.create({
                            client_id: client_id,
                            professional_id: professional_id,
                            services: services,
                            schedule: schedule,
                            payment: payment,
                            status: status_1
                        })];
                case 1:
                    appointment = _b.sent();
                    return [2 /*return*/, res.status(201).json(appointment)];
                case 2:
                    error_1 = _b.sent();
                    return [2 /*return*/, res.status(400).json({ error: error_1.message })];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    update: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, _a, service_id, schedule, payment, status, appointment;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, service_id = _a.service_id, schedule = _a.schedule, payment = _a.payment, status = _a.status;
                    return [4 /*yield*/, appointmentService_1.appointmentService.update(Number(id), {
                            service_id: service_id,
                            schedule: schedule,
                            payment: payment,
                            status: status
                        })];
                case 1:
                    appointment = _b.sent();
                    return [2 /*return*/, res.status(200).json(appointment)];
            }
        });
    }); },
    delete: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, appointment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, appointmentService_1.appointmentService.delete(Number(id))];
                case 1:
                    appointment = _a.sent();
                    return [2 /*return*/, res.status(200).json(appointment)];
            }
        });
    }); },
    findbyClientId: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var clientId, appointments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientId = req.client.id;
                    if (typeof clientId !== 'number') {
                        return [2 /*return*/, res.status(400).json({ error: 'Invalid client ID' })];
                    }
                    return [4 /*yield*/, appointmentService_1.appointmentService.findbyClientId(clientId)];
                case 1:
                    appointments = _a.sent();
                    return [2 /*return*/, res.status(200).json(appointments)];
            }
        });
    }); },
    findbyProfessionalId: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, appointments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.professional.id;
                    return [4 /*yield*/, appointmentService_1.appointmentService.findbyClientId(Number(id))];
                case 1:
                    appointments = _a.sent();
                    return [2 /*return*/, res.status(200).json(appointments)];
            }
        });
    }); },
    verifySchedule: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, appointments, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.body.id;
                    if (typeof id !== 'number') {
                        return [2 /*return*/, res.status(400).json({ error: 'Invalid ID' })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, appointmentService_1.appointmentService.verifySchedule(Number(id))];
                case 2:
                    appointments = _a.sent();
                    return [2 /*return*/, res.status(200).json(appointments)];
                case 3:
                    error_2 = _a.sent();
                    return [2 /*return*/, res.status(400).json({ error: error_2.message })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    clientAppointments: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, appointments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.client.id;
                    return [4 /*yield*/, appointmentService_1.appointmentService.clientAppointments(Number(id))];
                case 1:
                    appointments = _a.sent();
                    return [2 /*return*/, res.status(200).json(appointments)];
            }
        });
    }); }
};
