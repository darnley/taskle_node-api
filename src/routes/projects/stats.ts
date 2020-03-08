import { Request, Response } from 'express'
import Task from '../../models/Task'
import getProjectStatistics from '../../services/getProjectStatistics'

const getStats = (req: Request, res: Response) => {
  const projectId: string = req.params.projectId

  getProjectStatistics(projectId)
    .then((stats) => {
      res.json(stats)
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default getStats
