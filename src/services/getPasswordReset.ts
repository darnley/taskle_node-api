import User from '../models/User'
import uuid from 'uuid-random'
import PasswordReset from '../models/PasswordReset'

export interface IPasswordResetReturnData {
  userId: string;
  key1: string;
  key2: string;
}

export default async function getPasswordReset (userId: string): Promise<IPasswordResetReturnData> {
  if (!userId) {
    throw new Error('Parameter \'userId\' is required.')
  }

  if (!await User.exists({ _id: userId })) {
    throw new Error(`User '${userId}' not exists.`)
  }

  return new Promise((resolve, reject) => {
    const key1: string = uuid()
    const key2: string = uuid()

    const passwordReset = new PasswordReset({ user: userId, key1, key2 })

    passwordReset
      .save()
      .then(res => {
        resolve({ userId: res.user.toString(), key1, key2 } as IPasswordResetReturnData)
      })
      .catch(reject)
  })
};
