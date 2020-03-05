import { Request, Response } from 'express'
import Project from '../../../models/Project'
import Task from '../../../models/Task'

const update = async (req: Request, res: Response): Promise<void> => {
  const projectId = req.params.projectId
  const taskId = req.params.taskId
  const newDataTask = new Task(req.body)

  newDataTask.validate((err) => {
    if (err) {
      res
        .status(400)
        .json(err)
    } else {
      Task
        .findByIdAndUpdate(taskId, newDataTask, (err, updatedTask) => {
          if (err || !updatedTask) {
            res
              .status(400)
              .json(err)
          } else {
            res
              .status(200)
              .json(updatedTask)
          }
        })
    }
  })
}

export default add
