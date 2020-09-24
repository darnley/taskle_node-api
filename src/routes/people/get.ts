import { Request, Response } from 'express'
import user from '../../models/User'

const getAll = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId

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

export default getAll
