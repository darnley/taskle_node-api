import { Request, Response } from 'express'
import Project from '../../../models/Project'
import Task from '../../../models/Task'
import { updateUserKeywords } from '../../../services/userKeywords'

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

      if (t.responsible) updateUserKeywords(t.responsible as string)
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default add
