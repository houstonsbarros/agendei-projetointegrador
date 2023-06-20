import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { Service } from "../models/Service";
import { serviceService } from "../services/serviceService";
import { AuthenticatedRequestProfessional } from "../middlewares/authProfessional";

export const serviceController = {
    create: async (req: AuthenticatedRequestProfessional, res: Response) => {
        const { professional_id, name, description, price } = req.body;
      
        const service = await serviceService.create({
          professional_id,
          name,
          description,
          price,
          created_at: new Date(),
          updated_at: new Date()
        });
      
        return res.status(201).json(service);
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

    delete: async (req: AuthenticatedRequestProfessional, res: Response) => {
        const serviceId = parseInt(req.params.id);
      
        const service = await serviceService.delete(serviceId);
      
        return res.status(200).json({ service, serviceId });
    },

    getServicesByProfessional: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.query;

        const parsedId = Number(id);

        try {
            const services = await serviceService.getServicesByProfessional(parsedId)

            return res.status(200).json(services)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    getById: async (req: AuthenticatedRequestProfessional, res: Response) => {
        const professionalId = req.professional!.id;
        const serviceId = parseInt(req.params.id);
      
        const service = await serviceService.getById(serviceId, professionalId);
      
        return res.status(200).json(service);
    }
}