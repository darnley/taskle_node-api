import { Request, Response, NextFunction } from 'express'
import PasswordReset from '../../models/PasswordReset'
import User from '../../models/User'
import uuid from 'uuid-random'
import argon2 from 'argon2'

const passwordReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId: string = req.params.userId
  const key1: string = req.params.key1
  const key2: string = req.params.key2

  if (!userId || !key1 || !key2) {
    next(new Error('The request is invalid. All parameters must be sent.'))
  }

  const passwordResetRequest = await PasswordReset
    .findOne({
      user: userId,
      key1: key1,
      key2: key2
    })

  if (!passwordResetRequest) {
    next(new Error('The request is invalid. We did not found the password reset as requested.'))
  }

  const salt: string = uuid()
  const hashedPassword: string = await argon2.hash(req.body.password, { salt: Buffer.from(salt) })

  await User
    .findByIdAndUpdate(userId, { salt: salt, password: hashedPassword })

  await PasswordReset
    .findByIdAndRemove(passwordResetRequest?._id)

  res
    .status(200)
    .json({})
}

export default passwordReset
