import express from 'express'
import { clientController } from './controllers/clientController'
import { ensureAuth } from './middlewares/auth'
import { appointmentController } from './controllers/appointmentController'
import { professionalController } from './controllers/professionalController'
import { serviceController } from './controllers/serviceController'
import { ensureAuthProfessional } from './middlewares/authProfessional'

const router = express.Router()

// Routes for Clients
router.post('/client/register', clientController.register)
router.post('/client/login', clientController.login)
router.get('/client/current', ensureAuth, clientController.show)

// Routes for Professionals
router.post('/professional/register', professionalController.register)
router.post('/professional/login', professionalController.login)
router.get('/professional/current', ensureAuthProfessional, professionalController.show)
router.get('/professional/getProfessionals', ensureAuth, professionalController.getProfessionals)
router.put('/professional/updatePassword', ensureAuthProfessional, professionalController.updatePassword)
router.get('/professional/appointmentSchedule', ensureAuthProfessional, professionalController.appointmentSchedule)
router.get('/professional/availableSchedules', professionalController.availableTimes)

// Routes for Services
router.post('/service/create', ensureAuthProfessional, serviceController.create)
router.get('/professional/getServices/', serviceController.getServicesByProfessional)
router.get('/service/getById/:id', ensureAuthProfessional, serviceController.getById)
router.put('/service/update/:id', ensureAuthProfessional, serviceController.update)
router.delete('/service/delete/:id', ensureAuthProfessional, serviceController.delete);

// Routes for Appointments
router.post('/appointment/create', appointmentController.create)
router.get('/appointment/findByClient', ensureAuth, appointmentController.findbyClientId)
router.get('/appointment/findByProfessional', ensureAuthProfessional, appointmentController.findbyProfessionalId)
router.put('/appointment/update', ensureAuth, appointmentController.update)
router.delete('/appointment/delete', ensureAuth, appointmentController.delete)
router.get('/appointment/verifySchedule', appointmentController.verifySchedule)
router.get('/client/agendamentos', ensureAuth, appointmentController.clientAppointments)
router.get('/professional/agendamentos', ensureAuthProfessional, appointmentController.professionalAppointments)
router.get('/client/finalizado', ensureAuth, appointmentController.clientAppointmentByID)
router.get('/professional/reports', ensureAuthProfessional, appointmentController.reports)
router.put('/appointment/confirm/:id', ensureAuthProfessional, appointmentController.appointmentConfirmation)

export { router }