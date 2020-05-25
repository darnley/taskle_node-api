import { Request, Response } from 'express'
import Task from '../../../models/Task'

const update = async (req: Request, res: Response): Promise<void> => {
  const projectId = req.params.projectId
  const taskId = req.params.taskId
  const newDataTask = new Task(req.body)

  newDataTask.project = projectId
  newDataTask._id = taskId

  newDataTask.validate((err) => {
    if (err) {
      res
        .status(400)
        .json(err)
    } else {
      Task
        .findOneAndUpdate({ _id: taskId, project: projectId }, newDataTask, (err, updatedTask) => {
          if (err || !updatedTask) {
            res
              .status(400)
              .json(err)
          } else {
            if (!newDataTask.milestone) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              updatedTask.milestone = undefined!

              updatedTask
                .save()
                .then(t => {
                  res
                    .status(200)
                    .json(t)
                }).catch(err => {
                  res
                    .status(400)
                    .json(err)
                })
            } else {
              res
                .status(200)
                .json(updatedTask)
            }
          }
        })
    }
  })
}

export default update
