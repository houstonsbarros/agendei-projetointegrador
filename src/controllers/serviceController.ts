import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { Service } from "../models/Service";
import { serviceService } from "../services/serviceService";

export const serviceController = {
    create: async (req: AuthenticatedRequest, res: Response) => {
        const { professional_id, name, description, price, created_at, updated_at } = req.body

        const service = await serviceService.create({ 
            professional_id,
            name,
            description,
            price,
            created_at: new Date(), // Definir o valor atual de data/hora
            updated_at: new Date() // Definir o valor atual de data/hora
        });

        return res.status(201).json(service)
    },

    update: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params
        const { name, description, price } = req.body

        const service = await serviceService.update(Number(id), {
            name,
            description,
            price
        })

        return res.status(200).json(service)
    },

    delete: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params

        const service = await serviceService.delete(Number(id))

        return res.status(200).json(service)
    },

    getServicesByProfessional: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.body;
        
        if (typeof id !== 'number') {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        const services = await serviceService.getServicesByProfessional(Number(id))

        return res.status(200).json(services)
    }
}