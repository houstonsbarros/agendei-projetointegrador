import { QueryTypes } from "sequelize";
import { sequelize } from "../database";
import { Appointment, AppointmentCreationAttributes } from "../models/Appointment";

export const appointmentService = {
  create: async (attributes: AppointmentCreationAttributes) => {
    const [appointment, created] = await Appointment.findOrCreate({
      where: {
        schedule: attributes.schedule,
      },
      defaults: attributes
    });

    if (!created) {
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

  clientAppointments: async (client_id: number) => {
    const appointments = await sequelize.query(
      `SELECT
      a.schedule,
      a.payment,
      a.status,
      SUM(s.price) AS total_price,
      STRING_AGG(s.name, ', ') AS service_names,
      CONCAT(c.first_name, ' ', c.last_name) AS client_name,
      CONCAT(p.first_name, ' ', p.last_name) AS professional_name,
      p.adress AS professional_adress
    FROM
      appointments a
    JOIN
      services s ON s.id = ANY(a.services)
    JOIN
      clients c ON c.id = a.client_id
    JOIN
      professionals p ON p.id = a.professional_id
    WHERE
      a.client_id = ${client_id}
    GROUP BY a.id, c.id, p.id
    ORDER BY (a.schedule->>'date')::date ASC, (a.schedule->>'time')::time ASC;
      `,
      { type: QueryTypes.SELECT }
    );

    return appointments;
  },

  clientAppointmentsByID: async (client_id: number, id: number) => {
    const appointments = await sequelize.query(
      `SELECT a.schedule, a.payment, a.status, sum(s.price) AS total_price, 
      string_agg(s.name, ', ') AS service_names, 
      CONCAT(c.first_name, ' ', c.last_name) AS client_name, 
      CONCAT(p.first_name, ' ', p.last_name) AS professional_name
      FROM appointments a
      JOIN services s ON s.id = ANY(a.services)
      JOIN clients c ON c.id = a.client_id
      JOIN professionals p ON p.id = a.professional_id
      WHERE a.client_id = ${client_id}
      AND a.id = ${id}
      GROUP BY a.id, c.id, p.id
      `,
      { type: QueryTypes.SELECT }
    );

    return appointments;
  }
};