import { Request, Response } from 'express'
import Task from '../../models/Task'

const getAllMilestones = async (req: Request, res: Response): Promise<void> => {
  const projectId = req.params.projectId

  Task
    .find({
      $and: [
        {
          project: projectId
        },
        {
          milestone: {
            $exists: true
          }
        }
      ]
    })
    .select('milestone')
    .distinct('milestone')
    .then(milestones => {
      res.json(milestones.map(m => {
        return {
          name: m
        }
      }))
    })
    .catch(reason => {
      res
        .status(500)
        .json({
          message: reason.message
        })
    })
}

export default getAllMilestones
