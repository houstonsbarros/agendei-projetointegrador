import express from 'express'
import { clientController } from './controllers/clientController'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'
import { appointmentController } from './controllers/appointmentController'
import { professionalController } from './controllers/professionalController'
import { serviceController } from './controllers/serviceController'

const router = express.Router()

// Routes for Clients
router.post('/client/register', clientController.register)
router.post('/client/login', clientController.login)
router.get('/client/current', ensureAuth, clientController.show)

// Routes for Professionals
router.post('/professional/register', professionalController.register)
router.post('/professional/login', professionalController.login)
router.get('/professional/getProfessionals', professionalController.getProfessionals)
router.put('/professional/updatePassword', ensureAuth, professionalController.updatePassword)
router.get('/professional/appointmentSchedule', professionalController.appointmentSchedule)
router.get('/professional/availableSchedules', professionalController.availableTimes)

// Routes for Services
router.post('/service/create', ensureAuthViaQuery, serviceController.create)
router.get('/professional/getServices/:id', serviceController.getServicesByProfessional)
router.put('/service/update', ensureAuth, serviceController.update)
router.delete('/service/delete', ensureAuth, serviceController.delete)

// Routes for Appointments
router.post('/appointment/create', appointmentController.create)
router.get('/appointment/findByClient', ensureAuth, appointmentController.findbyClientId)
router.get('/appointment/findByProfessional', ensureAuthViaQuery, appointmentController.findbyProfessionalId)
router.put('/appointment/update', ensureAuth, appointmentController.update)
router.delete('/appointment/delete', ensureAuth, appointmentController.delete)
router.get('/appointment/verifySchedule', appointmentController.verifySchedule)

export { router }