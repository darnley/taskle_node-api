import { Request, Response } from 'express'
import User from '../../models/User'

const getPeople = async (req: Request, res: Response): Promise<void> => {
  const teamId: string = req.params.teamId

  User
    .find({ team: teamId })
    .select('_id firstName lastName emailAddress')
    .then(users => {
      res.json(users)
    })
    .catch(reason => {
      res
        .status(500)
        .json({
          message: reason.message
        })
    })
}

export default getPeople
