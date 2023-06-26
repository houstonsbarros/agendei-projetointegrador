import { Op, QueryTypes } from "sequelize";
import { sequelize } from "../database";
import Professional from "../models/Professional";
import { ProfessionalCreationAttributes } from "../models/Professional";

export const professionalService = {
    findbyEmail: async (email: string) => {
        try {
            const professional = await Professional.findOne({
                where: {
                    email: {
                        [Op.eq]: email
                    }
                }
            });
            return professional;
        } catch (err) {
            throw new Error('Erro ao buscar o Profissional por email');
        }
    },

    create: async (attributes: ProfessionalCreationAttributes) => {
        const professional = await Professional.create(attributes);

        return professional;
    },

    update: async (id: number, attributes: {
        first_name?: string,
        last_name?: string,
        cpf?: string,
        phone?: string,
        email?: string
    }) => {
        const [affectedRows, updatedProfessionals] = await Professional.update(attributes, {
            where: {
                id: {
                    [Op.eq]: id
                }
            },
            returning: true
        });

        return updatedProfessionals[0];
    },

    updatePassword: async (id: number, password: string) => {
        const [affectedRows, updatedProfessionals] = await Professional.update({ password }, {
            where: {
                id: {
                    [Op.eq]: id
                }
            },
            returning: true,
            individualHooks: true
        });

        return updatedProfessionals[0];
    },

    updateSchedule: async (id: number, schedule: {
        holiday: number,
        hourStart: number,
        break: number,
        timeBreak: number,
        hourEnd: number,
    }) => {
        const [affectedRows, updatedProfessionals] = await Professional.update({ schedule }, {
            where: {
                id: {
                    [Op.eq]: id
                }
            },
            returning: true,
            individualHooks: true
        });

        return updatedProfessionals[0];
    },

    getProfessionals: async () => {
        const professionals = await Professional.findAll();

        return professionals;
    },

    appointmentSchedule: async (id: number, date: string) => {
        try {
            const result = await sequelize.query(
                `SELECT schedule FROM professionals WHERE id = ?`,
                {
                    replacements: [id],
                    type: QueryTypes.SELECT
                }
            );
            const appointments = await sequelize.query(
                `SELECT schedule FROM appointments WHERE professional_id = ? AND schedule->>'date' = ?`,
                {
                    replacements: [id, date],
                    type: QueryTypes.SELECT
                }
            );

            if (!result || result.length === 0) {
                throw new Error("Profissional não encontrado");
            }

            const professionalAs = JSON.parse(JSON.stringify(result[0]));
            const appointmentAs = appointments.map(appointment => JSON.parse(JSON.stringify(appointment)));

            const schedule = professionalAs.schedule;
            const { hourStart, hourEnd } = schedule;
            const breakHour = schedule.break;
            const breakTime = schedule.timeBreak;

            const unavailableTimes: string[] = appointmentAs.map(appointment => appointment.schedule.hour);

            const timeInterval = 15; // Intervalo de tempo em minutos

            const availableTimes: string[] = [];
            let currentTime = hourStart;
            let nextTime = timeInterval;

            while (currentTime <= hourEnd && currentTime % timeInterval === 0) {
                if (currentTime < breakHour || currentTime >= breakHour + breakTime) {
                    if (!unavailableTimes.includes(`0${currentTime}:${nextTime}`) && !unavailableTimes.includes(`${currentTime}:00}`)) {
                        if (!unavailableTimes.includes(`${currentTime}:${nextTime}`) && !unavailableTimes.includes(`${currentTime}:00}`)) {
                            const timeString = `${currentTime.toString().padStart(2, '0')}:${nextTime.toString().padStart(2, '0')}}`;
                            availableTimes.push(timeString);
                        }
                    }
                }
                currentTime += timeInterval;
            }

            return availableTimes;
        } catch (error) {
            throw new Error("Erro ao obter os horários disponíveis do profissional");
        }
    },

    availableTimes: async (id: number, date: string) => {
        try {
            const result = await sequelize.query(
                `SELECT schedule FROM professionals WHERE id = ?`,
                {
                    replacements: [id],
                    type: QueryTypes.SELECT
                }
            );

            const appointments = await sequelize.query(
                `SELECT schedule FROM appointments WHERE professional_id = ? AND schedule->>'date' = ?`,
                {
                    replacements: [id, date],
                    type: QueryTypes.SELECT
                }
            );

            if (!result || result.length === 0) {
                throw new Error("Profissional não encontrado");
            }

            const professionalAs = JSON.parse(JSON.stringify(result[0]));
            const appointmentAs = appointments.map(appointment => JSON.parse(JSON.stringify(appointment)));

            const schedule = professionalAs.schedule;
            const { hourStart, hourEnd } = schedule;
            const breakHour = schedule.break;
            const breakTime = schedule.timeBreak;

            const unavailableTimes: string[] = appointmentAs.map(appointment => appointment.schedule.hour);

            const availableTimes: string[] = [];
            let currentTime = hourStart;

            while (currentTime <= hourEnd) {
                if (currentTime < breakHour || currentTime >= breakHour + breakTime) {
                    if (!unavailableTimes.includes(`0${currentTime}:00`)) {
                        if (!unavailableTimes.includes(`${currentTime}:00`)) {
                            const timeString = currentTime < 10 ? `0${currentTime}:00` : `${currentTime}:00`;
                            availableTimes.push(timeString);
                        }
                    }
                }
                currentTime++;
            }

            return availableTimes;
        } catch (error) {
            throw new Error("Erro ao obter os horários disponíveis do profissional");
        }
    },
}