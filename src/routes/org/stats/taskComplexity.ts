import { Request, Response } from 'express'
import Task from '../../../models/Task'

const taskComplexity = async (req: Request, res: Response): Promise<void> => {
  Task
    .aggregate()
    .group({
      _id: '$complexity',
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

export default taskComplexity
