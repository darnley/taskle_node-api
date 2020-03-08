import { Request, Response } from 'express'
import Task from '../../../models/Task'

const getAll = (req: Request, res: Response) => {
  const projectId = req.params.projectId

  Task
    .find({ project: projectId })
    .populate('responsible', 'name')
    .select('responsible')
    .then((t) => {
      console.log(t)
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default getAll
