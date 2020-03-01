import { Request, Response } from 'express'
import team from '../../models/Team'

const getAll = async (req: Request, res: Response): Promise<void> => {
  team
    .find({})
    .then((teams) => {
      res.json(teams)
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
