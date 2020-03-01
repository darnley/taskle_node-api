import { Request, Response } from 'express'
import user from '../../models/User'

const getAll = async (req: Request, res: Response): Promise<void> => {
  user
    .find({ isActive: req.query.isActive || true })
    .select('-password -salt')
    .populate('team', 'name')
    .then((users) => {
      res.json(users)
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
