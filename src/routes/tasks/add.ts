import { Request, Response } from 'express'
import Task from '../../models/Task'

const add = (req: Request, res: Response) => {
  const projectId: string = req.params.projectId
  const newTask = new Task(req.body)

  newTask.project = projectId

  newTask
    .save()
    .then((t) => {
      res
        .status(201)
        .json(t)
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default add
