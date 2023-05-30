import express from 'express'
import { clientController } from './controllers/clientController'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'
import { appointmentController } from './controllers/appointmentController'
import { professionalController } from './controllers/professionalController'

const router = express.Router()

// Routes for Clients
router.post('/client/register', clientController.register)
router.post('/client/login', clientController.login)

// Routes for Professionals

export { router }