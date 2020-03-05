import { Request, Response } from 'express'
import project from '../../models/Project'

const getAll = async (req: Request, res: Response): Promise<void> => {
  project
    .find({})
    .populate('manager', 'firstName lastName isActive emailAddress position')
    .then((p) => {
      res.json(p)
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
