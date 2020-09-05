import { Request, Response } from 'express'
import Task from '../../../models/Task'
import getOrganizationStatistics from '../../../services/getOrganizationStatistics'

const taskCount = async (req: Request, res: Response): Promise<void> => {
  getOrganizationStatistics()
    .then(result => {
      res
        .status(200)
        .json(result)
    })
}

export default taskCount
