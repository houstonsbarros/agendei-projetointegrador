import { Op } from "sequelize";
import { Service } from "../models/Service";
import { ServiceCreationAttributes } from "../models/Service";

export const serviceService = {
    create: async (attributes: ServiceCreationAttributes) => {
        const service = await Service.create(attributes);

        return service;
    },

    update: async (id: number, attributes: {
        name?: string,
        description?: string,
        price?: number,
    }) => {
        const [affectedRows, updatedServices] = await Service.update(attributes, {
            where: {
                id: {
                    [Op.eq]: id
                }
            },
            returning: true
        });

        return updatedServices[0];
    },

    delete: async (id: number) => {
        const service = await Service.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });

        return service;
    },

    getServicesByProfessional: async (professional_id: number) => {
        const services = await Service.findAll({
            where: {
                professional_id: {
                    [Op.eq]: professional_id
                }
            }
        });

        return services;
    },

    getById: async (id: number, professional_id: number) => {
        const service = await Service.findOne({
            where: {
                id: {
                    [Op.eq]: id
                },
                professional_id: {
                    [Op.eq]: professional_id
                }
            }
        });

        return service;
    }
};
