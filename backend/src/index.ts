import express from 'express'
import prisma from './lib/prisma'
import * as jwt from 'jsonwebtoken'
import { hashPassword, verifyPassword } from './utils/password'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 4000

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!')
})
// 위에서 한 번만 등록
const isavailable = async (username: string) => {
    // Check if the user exists in the database
    const user = await prisma.user.findFirst({
        where: {
            name: username
        }
    });
    if (user) {
        return false;
    }
    return true;
}
const secretKey: string = process.env.JWT_SECRET_KEY || process.env.JWT_SECRET || "jwt-secret-key";
const createToken = (username: string, id: number, permission:string) => {
  return jwt.sign({ user_id: username, id, permission }, secretKey) as string
}


app.post('/signin', async (req: any, res: any) => {
  try {
    const { username, password } = req.body ?? {}
    if (!username || !password) {
      return res.status(400).json({ message: '닉네임과 비밀번호를 입력해주세요' })
    }

    const user = await prisma.user.findFirst({ where: { name: username } })
    if (!user) return res.status(400).json({ message: '올바르지 않은 닉네임 또는 비밀번호입니다' })

    const ok = await verifyPassword(password, user.password)
    if (!ok) return res.status(400).json({ message: '올바르지 않은 닉네임 또는 비밀번호입니다' })

    const token = createToken(username, user.id, 'user')
    await prisma.user.update({ where: { id: user.id }, data: { token } })
    return res.status(200).json({ message: '로그인 성공', token, data: { username: user.name, email: user.email, id: user.id, createdAt: user.createdAt } })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})
app.post('/signup', async (req: any, res: any) => {
  try {
    const { username, password, email } = req.body ?? {};

    // 유효성
    if (
      typeof email !== 'string' || !email.trim() ||
      typeof username !== 'string' || !username.trim() ||
      typeof password !== 'string' || !password.trim()
    ) {
      return res.status(400).json({ message: '이메일, 닉네임과 비밀번호를 입력해주세요' });
    }

    // 닉네임 중복 확인
    const available = await isavailable(username);
    if (!available) {
      return res.status(400).json({ message: '중복된 닉네임 입니다' });
    }

    const hashed = await hashPassword(password)
    const created = await prisma.user.create({
      data: {
        email,
        name: username,
        username,
        password: hashed,
        token: 'signuping',
      },
    })

  const token = createToken(username, created.id, 'user')
  await prisma.user.update({ where: { id: created.id }, data: { token } })
  return res.status(201).json({ message: '회원가입 성공', token })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`SereNa is running on port ${port}`)
})
