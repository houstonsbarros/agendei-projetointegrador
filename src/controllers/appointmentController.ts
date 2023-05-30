import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { Appointment } from "../models/Appointment";
import { appointmentService } from "../services/appointmentService";

export const appointmentController = {
    create: async (req: AuthenticatedRequest, res: Response) => {
        const { date, hour, client_id, professional_id, services } = req.body

        const appointment = await appointmentService.create({ 
            date, 
            hour, 
            client_id, 
            professional_id, 
            services })

        return res.status(201).json(appointment)
    },

    // Crie um módulo que permita o cliente atualizar o seu agendamento.
    update: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params
        const { date, hour, client_id, professional_id, services } = req.body

        const appointment = await appointmentService.update(Number(id), { date, hour, client_id, professional_id, services })

        return res.status(200).json(appointment)
    },

    // Crie um módulo que permita o cliente cancelar o seu agendamento.
    delete: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params

        const appointment = await appointmentService.delete(Number(id))

        return res.status(200).json(appointment)
    },

    // Crie um módulo que permita o cliente listar os seus agendamentos.
    listClient: async (req: AuthenticatedRequest, res: Response) => {
        const clientId = req.client!.id;

        if (typeof clientId !== 'number') {
            return res.status(400).json({ error: 'Invalid client ID' });
        }
    
        const appointments = await appointmentService.listClient(clientId);
    
        return res.status(200).json(appointments);
    },
    

    // Crie um módulo que permita o profissional listar os seus agendamentos.
    listProfessional: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.professional!

        const appointments = await appointmentService.listProfessional(Number(id))

        return res.status(200).json(appointments)
    }
}