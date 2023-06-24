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

  appointmentConfirmation: async (id: number) => {
    const [affectedRows, updatedAppointments] = await Appointment.update({
      status: "Finalizado"
    }, {
      where: { id },
      returning: true
    });
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
    ORDER BY
      CASE
        WHEN a.status = 'Pendente' THEN 1
        WHEN a.status = 'Finalizado' THEN 2
        WHEN a.status = 'Cancelado' THEN 3
        ELSE 4
      END,
      (a.schedule->>'date')::date ASC,
      (a.schedule->>'time')::time ASC;
      `,
      { type: QueryTypes.SELECT }
    );

    return appointments;
  },

  professionalAppointments: async (professional_id: number) => {
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
      a.professional_id = ${professional_id}
    AND
      a.status = 'Pendente'
    AND
      (a.schedule->>'date')::date >= CURRENT_DATE
    GROUP BY a.id, c.id, p.id
    ORDER BY
      (a.schedule->>'date')::date ASC,
      (a.schedule->>'time')::time ASC;`,
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
  },

  reports: async (professional_id: number) => {
    const reports = await sequelize.query(
      `SELECT
      COUNT(DISTINCT a.client_id) AS total_clientes,
      COUNT(*) AS total_agendamentos,
      COUNT(CASE WHEN (a.schedule->>'data')::date = CURRENT_DATE THEN 1 END) AS total_agendamentos_dia_atual,
      COUNT(CASE WHEN a.status = 'Finalizado' THEN 1 END) AS total_agendamentos_finalizados,
      COUNT(CASE WHEN a.status = 'Pendente' THEN 1 END) AS total_agendamentos_pendentes,
      COUNT(CASE WHEN a.status = 'Cancelado' THEN 1 END) AS total_agendamentos_cancelados,
      SUM(CASE WHEN a.status = 'Finalizado' THEN s.price ELSE 0 END) AS total_valor_servicos_finalizados
  FROM
      appointments a
      JOIN services s ON s.id = ANY(a.services)
  WHERE
      a.professional_id = ${professional_id};
      `,
      { type: QueryTypes.SELECT }
    );

    return reports;
  },
};