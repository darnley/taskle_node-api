import { Request, Response } from 'express'
import Task from '../../../models/Task'
import log from '../../../utils/log'

const remove = (req: Request, res: Response) => {
  const projectId: string = req.params.projectId
  const taskId: string = req.params.taskId

  Task
    .exists({ _id: taskId, project: projectId })
    .then((taskExists) => {
      if (!taskExists) {
        return res
          .status(404)
          .json({ message: 'Não foi encontrada a tarefa especificada no projeto especificado.' })
      }

      Task
        .findByIdAndDelete(taskId)
        .then(() => {
          log.info(`The task '${taskId}' in project '${projectId}' has been deleted by '${req.user._id}'`)
          res.send()
        })
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default remove
