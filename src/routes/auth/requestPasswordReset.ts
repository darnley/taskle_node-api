import { Request, Response, NextFunction } from 'express'
import PasswordReset from '../../models/PasswordReset'
import User from '../../models/User'
import uuid from 'uuid-random'
import argon2 from 'argon2'
import getPasswordReset from '../../services/getPasswordReset'
import { sendMailOnPersonCreation, sendMailRecoverPassword } from '../../services/mail/sendMailOnPersonCreation'

const passwordResetRequest = async (req: Request, res: Response): Promise<void> => {
  const emailAddress: string = req.body.emailAddress

  User
    .findOne({ emailAddress: emailAddress })
    .then(user => {
      if (user) {
        getPasswordReset(user._id)
          .then(pwInfo => {
            sendMailRecoverPassword(user, pwInfo)
          })
      }
    })

  res
    .status(200)
    .json({})
}

export default passwordResetRequest
