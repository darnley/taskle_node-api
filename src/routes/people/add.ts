import { Request, Response } from 'express'
import User from '../../models/User'
import argon2 from 'argon2'
import uuid from 'uuid-random'
import { sendMailOnPersonCreation } from '../../services/mail/sendMailOnPersonCreation'

const add = async (req: Request, res: Response): Promise<void> => {
  const user = new User(req.body)

  user.salt = uuid()
  // user.password = await argon2.hash(user.password, { salt: Buffer.from(user.salt) })
  user.password = uuid()
  user.isActive = true

  user.save()
    .then((user) => {
      delete user.password
      delete user.salt

      sendMailOnPersonCreation(user)

      res
        .status(201)
        .json(user)
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default add
