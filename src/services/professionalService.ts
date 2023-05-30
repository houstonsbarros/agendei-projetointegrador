import { Professional } from "../models/Professional"
import { ProfessionalCreationAttributes } from "../models/Professional"

export const professionalService = {
    findbyEmail: async (email: string) => {
        const professional = await Professional.findOne({
            where: {
                email
            }
        })

        return professional
    },

    create: async (attributes: ProfessionalCreationAttributes) => {
        const client = await Professional.create(attributes)

        return client
    },

    update: async (id: number, attibutes: {
        first_name?: string,
        last_name?: string,
        cpf?: string,
        phone?: string,
        email?: string,
    }) => {
        const [affectedRows, updatedUsers] = await Professional.update(attibutes, { where: { id }, returning: true })

        return updatedUsers[0]
    },

    updatePassword: async (id: number, password: string) => {
        const [affectedRows, updatedUsers] = await Professional.update({ password }, {
            where: { id },
            returning: true,
            individualHooks: true
        })

        return updatedUsers[0]
    },

    addService: async (id: number, serviceId: number) => {
        const professional = await Professional.findByPk(id)

        if (!professional) {
            throw new Error("Professional not found")
        }

        await professional.addService(serviceId)

        return professional
    }
}

