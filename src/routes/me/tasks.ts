import { Request, Response } from 'express'
import { IUser } from '../../models/User'
import Task from '../../models/Task'
import ProjectStatus from '../../enums/projectStatus'
import { IProject } from '../../models/Project'
import getUserTasks from '../../services/getUserTasks'

const getTasks = (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id

  getUserTasks(userId)
    .then((tasks) => {
      res
        .json(tasks.filter(t => (t.project as IProject).status !== ProjectStatus.Ended))
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default getTasks
