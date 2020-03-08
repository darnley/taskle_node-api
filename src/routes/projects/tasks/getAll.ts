import { Request, Response } from 'express'
import Task from '../../../models/Task'

const getAll = async (req: Request, res: Response): Promise<void> => {
  const projectId = req.params.projectId

  Task
    .find({ project: projectId })
    .populate('project', 'name')
    .populate('responsible', 'firstName lastName')
    .then((task) => {
      res
        .status(200)
        .json(task)
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default getAll
