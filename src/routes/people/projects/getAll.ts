import { Request, Response } from 'express'
import Task from '../../../models/Task'
import { distinctArrayOfObjects } from '../../../utils/distinct'

const getAll = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId
  const monthHistory: number = parseInt(req.query.monthHistory) ?? -1

  let queryArguments: any = {}

  if (monthHistory > 0) {
    const currentDate = new Date()
    currentDate.setMonth(currentDate.getMonth() - monthHistory)
    queryArguments = { ...queryArguments, createdAt: { $lt: new Date(), $gt: currentDate } }
  }

  Task
    .find({ responsible: userId })
    .populate('project')
    .select('project')
    .find(queryArguments)
    .then(projects => {
      res
        .status(200)
        .json(distinctArrayOfObjects(projects.map(e => e.project), '_id'))
    })
    .catch(reason => {
      res
        .status(500)
        .json({
          message: reason.message
        })
    })
}

export default getAll
