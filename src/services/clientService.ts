import { Client } from "../models/Client"
import { ClientCreationAttributes } from "../models/Client"

export const clientService = {
    findbyEmail: async (email: string) => {
        const client = await Client.findOne({
            where: {
                email
            }
        })

        return client
    },

    create: async (attibutes: ClientCreationAttributes) => {
        const client = await Client.create(attibutes)

        return client
    },

    update: async (id: number, attibutes: {
        firstName?: string,
        lastName?: string,
        cpf?: string,
        phone?: string,
        email?: string,
    }) => {
        const [affectedRows, updatedUsers] = await Client.update(attibutes, { where: { id}, returning: true })
    
        return updatedUsers[0]
    },

    updatePassword: async (id: number, password: string) => {
        const [affectedRows, updatedUsers] = await Client.update({ password }, { 
            where: { id }, 
            returning: true,
            individualHooks: true 
        })
    
        return updatedUsers[0]
    }
}