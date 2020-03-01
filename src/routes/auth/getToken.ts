import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import requestIp from 'request-ip'

const jwtParams = {
  expiration: parseFloat(process.env.JWT_EXPIRATION_IN_HOURS || '') || 6
}

const getToken = (req: Request, res: Response): void => {
  if (req.body.email && req.body.password) {
    const email = req.body.email
    const password = req.body.password
    const user = /* users.find(function (u) {
      return u.email === email && u.password === password
    }) */{ _id: '123' }

    if (user) {
      const payload = {
        ...user,
        ipAddress: req.clientIp
      }
      const jwtSecret: string = process.env.JWT_SECRET || ''

      const token = jwt.sign(payload, jwtSecret, { expiresIn: `${jwtParams.expiration}h` })
      const currentTime = moment(new Date())

      res.json({
        token: token,
        expiresAt: moment(moment.now())
          .add(jwtParams.expiration, 'hours')
          .toISOString()
      })
    } else {
      res
        .status(400)
        .json({
          message: 'Usuário ou senha inválido.'
        })
    }
  } else {
    res
      .status(400)
      .json({
        message: 'O usuário e a senha são obrigatórios.'
      })
  }
}

export default getToken
