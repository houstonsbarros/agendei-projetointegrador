import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { jwtService } from '../services/jwtService'
import { ProfessionalInstance } from '../models/Professional'
import { professionalService } from '../services/professionalService'

export interface AuthenticatedRequestProfessional extends Request {
    professional?: ProfessionalInstance | null
}

export function ensureAuthProfessional(req: AuthenticatedRequestProfessional, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' })
    }

    const token = authorizationHeader.replace(/Bearer /, '')

    jwtService.verifyToken(token, (err, decoded) => {
        if (err || typeof decoded === 'undefined') {
            return res.status(401).json({ message: 'Não autorizado: token inválido' })
        }

        professionalService.findbyEmail((decoded as JwtPayload).email).then(professional => {
            req.professional = professional
            next()
          })
    })
}