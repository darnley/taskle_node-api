import { Request, Response } from 'express'
import user, { IUser } from '../../models/User'

const getMyProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = (req.user as IUser)._id

  user
    .findById(userId)
    .select('-password -salt')
    .populate('team', 'name')
    .then((user) => {
      if (user) {
        res.json(user)
      } else {
        res
          .status(404)
          .send()
      }
    })
    .catch((reason) => {
      res
        .status(500)
        .json({
          message: reason.message
        })
    })
}

export default getMyProfile
