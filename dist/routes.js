"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var clientController_1 = require("./controllers/clientController");
var auth_1 = require("./middlewares/auth");
var appointmentController_1 = require("./controllers/appointmentController");
var professionalController_1 = require("./controllers/professionalController");
var serviceController_1 = require("./controllers/serviceController");
var router = express_1.default.Router();
exports.router = router;
// Routes for Clients
router.post('/client/register', clientController_1.clientController.register);
router.post('/client/login', clientController_1.clientController.login);
router.get('/client/current', auth_1.ensureAuth, clientController_1.clientController.show);
// Routes for Professionals
router.post('/professional/register', professionalController_1.professionalController.register);
router.post('/professional/login', professionalController_1.professionalController.login);
router.get('/professional/getProfessionals', auth_1.ensureAuth, professionalController_1.professionalController.getProfessionals);
router.put('/professional/updatePassword', auth_1.ensureAuth, professionalController_1.professionalController.updatePassword);
router.get('/professional/appointmentSchedule', professionalController_1.professionalController.appointmentSchedule);
router.get('/professional/availableSchedules', professionalController_1.professionalController.availableTimes);
// Routes for Services
router.post('/service/create', auth_1.ensureAuth, serviceController_1.serviceController.create);
router.get('/professional/getServices/', serviceController_1.serviceController.getServicesByProfessional);
router.put('/service/update', auth_1.ensureAuth, serviceController_1.serviceController.update);
router.delete('/service/delete', auth_1.ensureAuth, serviceController_1.serviceController.delete);
// Routes for Appointments
router.post('/appointment/create', appointmentController_1.appointmentController.create);
router.get('/appointment/findByClient', auth_1.ensureAuth, appointmentController_1.appointmentController.findbyClientId);
router.get('/appointment/findByProfessional', appointmentController_1.appointmentController.findbyProfessionalId);
router.put('/appointment/update', auth_1.ensureAuth, appointmentController_1.appointmentController.update);
router.delete('/appointment/delete', auth_1.ensureAuth, appointmentController_1.appointmentController.delete);
router.get('/appointment/verifySchedule', appointmentController_1.appointmentController.verifySchedule);
router.get('/client/agendamentos', auth_1.ensureAuth, appointmentController_1.appointmentController.clientAppointments);
