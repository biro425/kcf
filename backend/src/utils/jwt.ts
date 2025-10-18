import * as jwt from 'jsonwebtoken'

const DEFAULT_EXPIRES_IN = '7d'

export function signJwt(payload: object, secret: string, expiresIn: string = DEFAULT_EXPIRES_IN): string {
  return jwt.sign(payload as any, secret, { expiresIn } as jwt.SignOptions) as string
}

export function verifyJwt<T = any>(token: string, secret: string): T | null {
  try {
    return jwt.verify(token, secret) as T
  } catch {
    return null
  }
}
