import { Request, Response } from 'express'
import Task from '../../../models/Task'

const getAll = (req: Request, res: Response) => {
  const projectId = req.params.projectId

  Task
    .find({ project: projectId })
    .populate('responsible', 'firstName lastName emailAddress')
    .select('responsible')
    .then((tasks) => {
      const people = Array.from(new Set(tasks.map(inner => inner.responsible)))
      res.json(people)
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default getAll
