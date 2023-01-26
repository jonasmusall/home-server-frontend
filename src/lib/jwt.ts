import type { JwtPayload } from 'jsonwebtoken';
import jsonwebtoken from 'jsonwebtoken';
const { verify: _verify } = jsonwebtoken;

export function verify(token: string, publicKey: string): Promise<JwtPayload | string> {
  return new Promise((resolve, reject) => {
    _verify(token, publicKey, { algorithms: [ 'RS256' ] }, (err, decoded) => {
      if (err != null) {
        reject(err);
        return;
      }
      if (decoded === undefined) {
        reject({
          name: 'VerificationError',
          message: 'decoded is undefined'
        });
        return;
      }
      resolve(decoded);
    });
  });
}
