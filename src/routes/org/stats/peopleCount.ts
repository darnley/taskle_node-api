import { Request, Response } from 'express'
import Task from '../../../models/Task'
import getOrganizationStatistics from '../../../services/getOrganizationStatistics'
import User from '../../../models/User'

const peopleCount = async (req: Request, res: Response): Promise<void> => {
  User
    .find({ isActive: true })
    .count()
    .then(count => {
      res
        .status(200)
        .json({
          peopleCount: count
        })
    })
}

export default peopleCount
