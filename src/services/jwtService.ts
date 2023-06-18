import jwt, { VerifyCallback, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { professionalService } from './professionalService'

const secret = 'agendei-project'

export const jwtService = {
  signPayload: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, { expiresIn: expiration })
  },
  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callbackfn)
  }
}

export const jwtProfessional = {
  signPayload: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, { expiresIn: expiration });
  },

  verifyProfessionalToken: (token: string, callback: VerifyCallback) => {
    jwt.verify(token, secret, (err: JsonWebTokenError | TokenExpiredError | null, decoded) => {
      if (err || typeof decoded === 'undefined') {
        callback(err, decoded);
      } else {
        const { email }: { email: string } = decoded as { email: string };
        professionalService.findbyEmail(email).then(professional => {
          if (professional && professional.isProfessional) {
            callback(null, decoded);
          } else {
            callback(err, decoded);
          }
        }).catch(error => {
          callback(error, decoded);
        });
      }
    });
  }
};