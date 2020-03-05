import { Request, Response } from 'express'
import Task from '../../../models/Task'

const getAll = async (req: Request, res: Response): Promise<void> => {
  const projectId = req.params.projectId
  const taskId = req.params.taskId

  Task
    .findOne({ projectId, taskId })
    .populate('project', 'name')
    .populate('responsible', 'firstName lastName')
    .then((task) => {
      if (task) {
        res
          .status(200)
          .json(task)
      } else {
        res
          .status(404)
          .send('')
      }
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default getAll
