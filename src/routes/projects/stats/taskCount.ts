import { Request, Response } from 'express'
import Task from '../../../models/Task'

const taskCount = async (req: Request, res: Response): Promise<void> => {
  const projectId = req.params.projectId

  Task
    .aggregate()
    .match({ project: projectId })
    .group({
      _id: '$status',
      count: {
        $sum: 1
      }
    })
    .project({
      _id: 0,
      name: '$id',
      count: 1
    })
    .then(agg => {
      res
        .status(200)
        .json(agg)
    })
    .catch(reason => {
      res
        .status(400)
        .json({
          message: reason.message
        })
    })
}

export default taskCount
