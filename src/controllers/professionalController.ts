import { Request, Response } from "express"
import { jwtService } from "../services/jwtService"
import { professionalService } from "../services/professionalService"

export const professionalController = {
    // POST /auth/register
    register: async (req: Request, res: Response) => {
        const { first_name, last_name, cpf, phone, email, password, services, schedules } = req.body

        try {
            const clientAlreadyExists = await professionalService.findbyEmail(email)

            if (clientAlreadyExists) {
                throw new Error('Cliente já cadastrado')
            }

            const client = await professionalService.create({
                first_name,
                last_name,
                cpf,
                phone,
                email,
                password,
                services,
                schedules
            })

            return res.status(201).json(client)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    // POST /auth/login
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body

        try {
            const client = await professionalService.findbyEmail(email)

            if (!client) {
                return res.status(401).json({ message: 'E-mail não registrado' })
            }

            client.checkPassword(password, (err, isSame) => {
                if (err) {
                    return res.status(400).json({ message: err.message })
                }

                if (!isSame) {
                    return res.status(401).json({ message: 'Senha incorreta' })
                }

                const payload = {
                    id: client.id,
                    first_name: client.first_name,
                    email: client.email
                }

                const token = jwtService.signPayload(payload, '1d')

                return res.json({ authenticated: true, client, token })
            })
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    // POST /professional/addService
    addService: async (req: Request, res: Response) => {
        const { id } = req.params
        const { serviceId } = req.body

        try {
            const professional = await professionalService.addService(Number(id), Number(serviceId))

            return res.json(professional)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }
}