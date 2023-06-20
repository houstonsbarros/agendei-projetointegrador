import { Service } from "../models/Service"
import { ServiceCreationAttributes } from "../models/Service"

export const serviceService = {
    create: async (attributes: ServiceCreationAttributes) => {
        const service = await Service.create(attributes)

        return service
    },

    update: async (id: number, attibutes: {
        name?: string,
        description?: string,
        price?: number,
    }) => {
        const [affectedRows, updatedServices] = await Service.update(attibutes, { where: { id }, returning: true })

        return updatedServices[0]
    },

    delete: async (id: number) => {
        const service = await Service.destroy({
            where: {
                id
            }
        })

        return service
    },

    getServicesByProfessional: async (professional_id: number) => {
        const services = await Service.findAll({
            where: {
                professional_id
            }
        })

        return services
    },

    getById: async (id: number, professional_id: number) => {
        const service = await Service.findOne({
            where: {
                id,
                professional_id
            }
        })

        return service
    }
}