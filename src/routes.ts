import express from 'express'
import { authController } from './controllers/authController'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'
import { appointmentController } from './controllers/appointmentController'

const router = express.Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.post('/appointments/new', appointmentController.create)
router.put('/appointments/:id', appointmentController.update)
router.delete('/appointments/:id', appointmentController.delete)
router.get('/appointments/client/', ensureAuth, appointmentController.listClient)
router.get('/appointments/professional', appointmentController.listProfessional)

export { router }