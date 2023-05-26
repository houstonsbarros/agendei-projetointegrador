import { Appointment } from "../models/Appointment";
import { AppointmentCreationAttributes } from "../models/Appointment";

export const appointmentService = {
    create: async (attributes: AppointmentCreationAttributes) => {
        const appointment = await Appointment.create(attributes)

        return appointment
    },

    // Crie um módulo que permita o cliente atualizar o seu agendamento.
    update: async (id: number, attibutes: {
        date?: Date,
        hour?: string,
        clientId?: number,
        professionalId?: number,
        services?: [{
            id: number;
            name: string;
            price: number;
            description: string;
        }]
    }) => {
        const [affectedRows, updatedUsers] = await Appointment.update(attibutes, { where: { id }, returning: true })

        return updatedUsers[0]
    },

    // Crie um módulo que permita o cliente cancelar o seu agendamento.
    delete: async (id: number) => {
        const appointment = await Appointment.destroy({
            where: {
                id
            }
        })

        return appointment
    },

    // Crie um módulo que permita o cliente listar os seus agendamentos.
    listClient: async (clientId: number) => {
        const appointments = await Appointment.findAll({
            where: {
                clientId
            }
        })

        return appointments
    },
    // Crie um módulo que permita o profissional listar os seus agendamentos.
    listProfessional: async (professionalId: number) => {
        const appointments = await Appointment.findAll({
            where: {
                professionalId
            }
        })

        return appointments
    }
}