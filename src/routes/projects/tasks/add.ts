import { Request, Response } from 'express'
import Project from '../../../models/Project'
import Task from '../../../models/Task'

const add = async (req: Request, res: Response): Promise<void> => {
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