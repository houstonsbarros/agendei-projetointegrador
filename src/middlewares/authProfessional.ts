import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { jwtProfessional, jwtService } from '../services/jwtService'
import { ProfessionalInstance } from '../models/Professional'
import { professionalService } from '../services/professionalService'

export interface AuthenticatedRequestProfessional extends Request {
    professional?: ProfessionalInstance | null
}

export function ensureAuthProfessional(req: AuthenticatedRequestProfessional, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
  
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' });
    }
  
    const token = authorizationHeader.replace(/Bearer /, '');
  
    jwtProfessional.verifyProfessionalToken(token, (err, decoded) => {
      if (err || typeof decoded === 'undefined') {
        return res.status(401).json({ message: 'Não autorizado: token inválido' });
      }
  
      professionalService.findbyEmail((decoded as { email: string }).email).then(professional => {
        if (professional && professional.isProfessional) {
          req.professional = professional;
          next();
        } else {
          return res.status(401).json({ message: 'Não autorizado: usuário não é um profissional' });
        }
      }).catch(error => {
        return res.status(500).json({ message: 'Erro ao verificar o profissional', error: error.message });
      });
    });
  }