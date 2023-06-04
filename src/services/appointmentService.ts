import { Appointment, AppointmentCreationAttributes } from "../models/Appointment";

export const appointmentService = {
  create: async (attributes: AppointmentCreationAttributes) => {
    const appointment = await Appointment.create(attributes);

    if(!appointment) {
      throw new Error("Horário indisponível");
    }

    return appointment;
  },

  update: async (id: number, attributes: {
    client_id?: number;
    professional_id?: number;
    service_id: [{
      id: number;
    }]
    schedule?: {
      date: Date;
      hour: string;
    };
    payment?: {
      method: string;
      status: string;
    };
    status?: string;
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

  findbyProfessionalId: async (professional_id: number) => {
    const appointments = await Appointment.findAll({
      where: { professional_id }
    });
    return appointments;
  },

  findbyClientId: async (client_id: number) => {
    const appointments = await Appointment.findAll({
      where: { client_id }
    });
    return appointments;
  },

  verifySchedule: async (professional_id: number) => {
    const appointments = await Appointment.findAll({
      where: { professional_id }
    });

    return appointments;
  },
};