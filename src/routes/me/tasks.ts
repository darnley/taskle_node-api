import { Request, Response } from 'express'
import { IUser } from '../../models/User'
import Task from '../../models/Task'

const getTasks = (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id

  Task
    .find({ responsible: userId })
    .populate('project', 'name description keywords')
    .select('-responsible')
    .then((tasks) => {
      res
        .json(tasks)
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default getTasks
