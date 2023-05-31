import { QueryTypes } from "sequelize"
import { sequelize } from "../database"
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
        const professional = await Professional.create(attributes)

        return professional
    },

    update: async (id: number, attributes: {
        first_name?: string,
        last_name?: string,
        cpf?: string,
        phone?: string,
        email?: string
    }) => {
        const [affectedRows, updatedProfessionals] = await Professional.update(attributes,
            {
                where:
                {
                    id
                },
                returning: true
            })

        return updatedProfessionals[0]
    },

    updatePassword: async (id: number, password: string) => {
        const [affectedRows, updatedProfessionals] = await Professional.update({ password }, {
            where: { id },
            returning: true,
            individualHooks: true
        })

        return updatedProfessionals[0]
    },

    updateSchedule: async (id: number, schedule: {
        holiday: number,
        hourStart: number,
        break: number,
        timeBreak: number,
        hourEnd: number,
    }) => {
        const [affectedRows, updatedProfessionals] = await Professional.update({ schedule }, {
            where: { id },
            returning: true,
            individualHooks: true
        })

        return updatedProfessionals[0]
    },

    getProfessionals: async () => {
        const professionals = await Professional.findAll()

        return professionals
    },

    appointmentSchedule: async (id: number = 0) => {
        if (id) {
            const professional = await sequelize.query(`SELECT id, schedule->>'hourStart' as hourStart, schedule->>'hourEnd' as hourEnd FROM professionals WHERE id = ${id}`, { type: QueryTypes.SELECT })
            return professional[0]
        } else {
            const professional = await sequelize.query(`SELECT schedule FROM professionals WHERE id = 4`, {
                type: QueryTypes.SELECT
            })

            return professional
        }

    },

    availableTimes: async (id: number) => {
        try {
            // Obter o horário de início e fim do profissional
            const result = await sequelize.query(
                `SELECT schedule FROM professionals WHERE id = ${id}`,
                { type: QueryTypes.SELECT }
            );

            const appointments = await sequelize.query(
                `SELECT schedule FROM appointments WHERE professional_id = ${id}`,
                { type: QueryTypes.SELECT }
            );

            if (!result || result.length === 0) {
                throw new Error("Profissional não encontrado");
            }


            const appointmentAs = JSON.parse(JSON.stringify(appointments[0]))
            const professionalAs = JSON.parse(JSON.stringify(result[0]))


            const schedule = professionalAs.schedule
            const { hourStart, hourEnd } = schedule
            const breakHour = schedule.break
            const breakTime = schedule.timeBreak

            const unavailableTimes: string[] = [];
            const hourUnavailable = appointmentAs.schedule.hour

            const availableTimes: string[] = [];
            let currentTime = hourStart;

            while (currentTime <= hourEnd) {
                if (currentTime < breakHour || currentTime >= breakHour + breakTime) {
                    if(currentTime < 10) {
                        const timeString = `0${currentTime}:00`;
                        availableTimes.push(timeString);
                    } else {
                        const timeString = `${currentTime}:00`;
                        availableTimes.push(timeString);
                    }
                }
                currentTime++;
              }

            return availableTimes;
        } catch (error) {
            throw new Error("Erro ao obter os horários disponíveis do profissional");
        }
    }
}