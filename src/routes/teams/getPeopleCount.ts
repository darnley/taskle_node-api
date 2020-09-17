import { Request, Response } from 'express'
import User from '../../models/User'

const getPeopleCount = async (req: Request, res: Response): Promise<void> => {
  const teamId: string = req.params.teamId

  User
    .find({ team: teamId })
    .count()
    .then(count => {
      res.json({
        peopleCount: count
      })
    })
    .catch(reason => {
      res
        .status(500)
        .json({
          message: reason.message
        })
    })
}

export default getPeopleCount
