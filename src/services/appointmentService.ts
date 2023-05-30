import { Appointment, AppointmentCreationAttributes } from "../models/Appointment";

export const appointmentService = {
  create: async (attributes: AppointmentCreationAttributes) => {
    const appointment = await Appointment.create(attributes);

    return appointment;
  },

  update: async (id: number, attributes: {
    date?: Date,
    hour?: string,
    client_id?: number,
    professional_id?: number,
    services?: {
      id: number;
      name: string;
      price: number;
      description: string;
    }
  }) => {
    const [affectedRows, updatedAppointments] = await Appointment.update(attributes, {
      where: { id },
      returning: true
    });
    return updatedAppointments[0];
  },

  delete: async (id: number) => {
    const appointment = await Appointment.destroy({
      where: { id }
    });
    return appointment;
  },

  listClient: async (client_id: number) => {
    const appointments = await Appointment.findAll({
      where: { client_id }
    });
    return appointments;
  },

  listProfessional: async (professional_id: number) => {
    const appointments = await Appointment.findAll({
      where: { professional_id }
    });
    return appointments;
  }
};