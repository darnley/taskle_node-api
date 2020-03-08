import { Request, Response } from 'express'
import Task from '../../../models/Task'
import TaskStatus from '../../../enums/taskStatus'

const finishTask = (req: Request, res: Response) => {
  const taskId = req.params.taskId

  Task
    .findByIdAndUpdate(taskId, { status: TaskStatus.Finished })
    .then((t) => {
      res
        .json(t)
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default finishTask
