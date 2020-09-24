import { Request, Response } from 'express'
import Task from '../../../models/Task'
import { Types } from 'mongoose'

const taskComplexity = async (req: Request, res: Response): Promise<void> => {
  const personId = req.params.userId
  const monthHistory: number = parseInt(req.query.monthHistory) ?? -1

  let queryArguments: any = { responsible: Types.ObjectId(personId) }

  if (monthHistory > 0) {
    const currentDate = new Date()
    currentDate.setMonth(currentDate.getMonth() - monthHistory)
    queryArguments = { ...queryArguments, createdAt: { $lt: new Date(), $gt: currentDate } }
  }

  Task
    .aggregate()
    .match(queryArguments)
    .group({
      _id: '$complexity',
      count: {
        $sum: 1
      }
    })
    .project({
      _id: 0,
      name: '$_id',
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
