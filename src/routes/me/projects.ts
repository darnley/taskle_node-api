import { Request, Response } from 'express'
import { IUser } from '../../models/User'
import Task from '../../models/Task'

const getProjects = (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id

  Task
    .find({ responsible: userId })
    .populate('project', 'name description keywords')
    .select('project')
    .then((tasks) => {
      res
        .json(tasks.map(k => k.project))
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default getProjects
