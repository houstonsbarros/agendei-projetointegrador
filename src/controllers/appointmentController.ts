import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { Appointment } from "../models/Appointment";
import { appointmentService } from "../services/appointmentService";
import { AuthenticatedRequestProfessional } from "../middlewares/authProfessional";

export const appointmentController = {
    create: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const { client_id, professional_id, services, schedule, payment, status } = req.body

            const appointment = await appointmentService.create({
                client_id,
                professional_id,
                services,
                schedule,
                payment,
                status
            })

            return res.status(201).json(appointment)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    },

    update: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params
        const { service_id, schedule, payment, status } = req.body

        const appointment = await appointmentService.update(Number(id), {
            service_id,
            schedule,
            payment,
            status
        })

        return res.status(200).json(appointment)
    },

    delete: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params

        const appointment = await appointmentService.delete(Number(id))

        return res.status(200).json(appointment)
    },

    findbyClientId: async (req: AuthenticatedRequest, res: Response) => {
        const clientId = req.client!.id;

        if (typeof clientId !== 'number') {
            return res.status(400).json({ error: 'Invalid client ID' });
        }

        const appointments = await appointmentService.findbyClientId(clientId);

        return res.status(200).json(appointments);
    },

    findbyProfessionalId: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.professional!

        const appointments = await appointmentService.findbyClientId(Number(id))

        return res.status(200).json(appointments)
    },

    verifySchedule: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.body;

        if (typeof id !== 'number') {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        try {
            const appointments = await appointmentService.verifySchedule(Number(id));

            return res.status(200).json(appointments);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    clientAppointments: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.client!

        const appointments = await appointmentService.clientAppointments(Number(id))

        return res.status(200).json(appointments)
    },

    clientAppointmentByID: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.client!
        const { appointmentId } = req.query
        
        const parsedId = Number(id)
        const parsedAppointmentId = Number(appointmentId)

        const appointment = await appointmentService.clientAppointmentsByID(parsedId, parsedAppointmentId)

        return res.status(200).json(appointment)
    },

    reports: async (req: AuthenticatedRequestProfessional, res: Response) => {
        const { id } = req.professional!

        const appointments = await appointmentService.clientAppointments(Number(id))

        return res.status(200).json(appointments)
    }
}