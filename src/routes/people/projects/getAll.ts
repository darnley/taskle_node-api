import { Request, Response } from 'express'
import Task from '../../../models/Task'

const getAll = async (req: Request, res: Response): Promise<void> => {
  const userId = req.body.id

  Task
    .find({ responsible: userId })
    .populate('project')
    .select('project')
    .then(projects => {
      res
        .status(200)
        .json(projects.map(e => e.project))
    })
    .catch(reason => {
      res
        .status(500)
        .json({
          message: reason.message
        })
    })
}

export default getAll
