import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import requestIp from 'request-ip'
import User from '../../models/User'
import argon2 from 'argon2'
import log from '../../utils/log'

const jwtParams = {
  expiration: parseFloat(process.env.JWT_EXPIRATION_IN_HOURS || '') || 6
}

const getToken = async (req: Request, res: Response): Promise<void> => {
  if (req.body.email && req.body.password) {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({ emailAddress: email, isActive: true }).select('emailAddress password salt role')

    if (user && await argon2.verify(user.password, password, { salt: Buffer.from(user.salt) })) {
      const payload = {
        ...user,
        ipAddress: req.clientIp
      }
      const jwtSecret: string = process.env.JWT_SECRET || ''

      const token = jwt.sign(payload, jwtSecret, { expiresIn: `${jwtParams.expiration}h` })
      const expiration = moment(new Date())
        .add(jwtParams.expiration, 'hours')
        .toISOString()

      res.json({
        token: token,
        expiresAt: expiration
      })

      log.debug(`Bearer created for user '${user._id}' (${user.role}) that expires at ${expiration} (${jwtParams.expiration}h)`)
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
