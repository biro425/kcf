import type { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt'

export interface AuthUser {
  id: number
  name: string
  email?: string | null
}

function getTokenFromRequest(req: Request): string | null {
  const auth = req.headers['authorization']
  if (auth && typeof auth === 'string' && auth.startsWith('Bearer ')) {
    return auth.slice(7)
  }
  // cookie-parser가 있으면 req.cookies.token 사용
  const anyReq = req as any
  if (anyReq.cookies?.token) return anyReq.cookies.token as string
  // 간단 파서 (cookie-parser가 없을 때 대비)
  const rawCookie = req.headers['cookie']
  if (typeof rawCookie === 'string') {
    const parts = rawCookie.split(';').map(s => s.trim())
    const tokenPart = parts.find(p => p.startsWith('token='))
  if (tokenPart) return tokenPart.split('=')[1] ?? null
  }
  return null
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.JWT_SECRET
  if (!secret) return res.status(500).json({ message: 'JWT secret not configured' })
  const token = getTokenFromRequest(req)
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  const payload = verifyJwt<AuthUser>(token, secret)
  if (!payload) return res.status(401).json({ message: 'Invalid token' })
  ;(req as any).user = payload
  next()
}
