import { Request, Response } from "express"
import { jwtProfessional, jwtService } from "../services/jwtService"
import { professionalService } from "../services/professionalService"
import { sequelize } from "../database"
import { QueryTypes } from "sequelize"

export const professionalController = {
    // POST /professional/register
    register: async (req: Request, res: Response) => {
        const { first_name, last_name, cpf, phone, email, password, adress, schedule } = req.body

        try {
            const client = await professionalService.create({
                first_name,
                last_name,
                cpf,
                phone,
                email,
                password,
                adress: {
                    street: adress.street,
                    number: adress.number,
                    complement: adress.complement,
                    city: adress.city,
                    state: adress.state,
                    zip_code: adress.zip_code
                },
                schedule: {
                    holiday: schedule.holiday,
                    hourStart: schedule.hourStart,
                    break: schedule.break,
                    timeBreak: schedule.timeBreak,
                    hourEnd: schedule.hourEnd
                }
            })

            return res.status(201).json(client)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    // POST /professional/login
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body

        try {
            const profissional = await professionalService.findbyEmail(email)

            if (!profissional) {
                return res.status(401).json({ message: 'E-mail não registrado' })
            }

            profissional.checkPasswordProfessional(password, (err, match) => {
                if (err) {
                    return res.status(400).json({ message: err.message })
                }

                if (!match) {
                    return res.status(401).json({ message: 'Senha incorreta' })
                }

                const payload = {
                    id: profissional.id,
                    first_name: profissional.first_name,
                    email: profissional.email
                }

                const token = jwtProfessional.signPayload(payload, '1d')

                return res.status(200).json({ authenticated: true, profissional, token })
            })

            return res.status(200).json({ authenticated: false, profissional })
        } catch (err) {
            const profissional = await professionalService.findbyEmail(email)

            const opa = profissional.checkPasswordProfessional(password, (err, isSame) => {
                if (err) {
                    return res.status(400).json({ message: err.message, authenticated: false, profissional })
                }

                if (!isSame) {
                    return res.status(401).json({ message: 'Senha incorreta', authenticated: false, profissional })
                }

                const payload = {
                    id: profissional.id,
                    first_name: profissional.first_name,
                    email: profissional.email
                }

                const token = jwtService.signPayload(payload, '1d')

                return res.status(200).json({ authenticated: true, profissional, token })
            })


            if (err instanceof Error) {
                return res.status(400).json({ message: err.message, authenticated: false, opa })
            }
        }
    },

    // PUT /professional/updatePassword
    updatePassword: async (req: Request, res: Response) => {
        const { id, password } = req.body

        try {
            const professional = await professionalService.updatePassword(id, password)

            return res.json(professional)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    // PUT /professional/updateSchedule
    updateSchedule: async (req: Request, res: Response) => {
        const { id, schedule } = req.body

        try {
            const professional = await professionalService.updateSchedule(id, schedule)

            return res.json(professional)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    getProfessionals: async (req: Request, res: Response) => {
        try {
            const professionals = await professionalService.getProfessionals()

            return res.json(professionals)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    // GET /professional/appointmentSchedule
    appointmentSchedule: async (req: Request, res: Response) => {
        const { id } = req.body

        try {
            const professional = await professionalService.appointmentSchedule(id)

            return res.json(professional)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    // GET /professional/availableTimes
    availableTimes: async (req: Request, res: Response) => {
        const { id, date } = req.query

        const parsedId = Number(id);
        const parsedDate = String(date);

        try {
            const professional = await professionalService.availableTimes(parsedId, parsedDate)

            return res.json(professional)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
}