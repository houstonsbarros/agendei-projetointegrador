import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { ClientInstance } from '../models/Client'
import { jwtService } from '../services/jwtService'
import { clientService } from '../services/clientService'
import { ProfessionalInstance } from '../models/Professional'

export interface AuthenticatedRequest extends Request {
  client?: ClientInstance | null
  professional?: ProfessionalInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' })
  }

  const token = authorizationHeader.replace(/Bearer /, '')

  jwtService.verifyToken(token, (err, decoded) => {
    if (err || typeof decoded === 'undefined') {
      return res.status(401).json({ message: 'Não autorizado: token inválido' })
    }

    clientService.findbyEmail((decoded as JwtPayload).email).then(client => {
      req.client = client
      next()
    })
  })
}

export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { token } = req.query

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' })
  }

  if (typeof token !== 'string') {
    return res.status(400).json({ message: 'O parâmetro token deve ser do tipo string' })
  }

  jwtService.verifyToken(token, (err, decoded) => {
    if (err || typeof decoded === 'undefined') {
      return res.status(401).json({ message: 'Não autorizado: token inválido' })
    }

    clientService.findbyEmail((decoded as JwtPayload).email).then(client => {
      req.client = client
      next()
    })
  })
}