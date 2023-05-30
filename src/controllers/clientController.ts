import { Request, Response } from "express"
import { jwtService } from "../services/jwtService"
import { clientService } from "../services/clientService"
import { AuthenticatedRequest } from "../middlewares/auth"

export const clientController = {
    // POST /client/register
    register: async (req: Request, res: Response) => {
        const { first_name, last_name, cpf, phone, email, password } = req.body

        try {
            const emailAlreadyExists = await clientService.findbyEmail(email)
            const cpfAlreadyExists = await clientService.checkCPF(cpf)
            const phoneAlreadyExists = await clientService.checkPhone(phone)

            if (emailAlreadyExists || cpfAlreadyExists || phoneAlreadyExists) {
                throw new Error('Cliente já cadastrado')
            }

            const client = await clientService.create({
                first_name,
                last_name,
                cpf,
                phone,
                email,
                password
            })

            return res.status(201).json(client)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    // POST /client/login
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body

        try {
            const client = await clientService.findbyEmail(email)

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
    }
}