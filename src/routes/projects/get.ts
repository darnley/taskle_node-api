import { Request, Response } from 'express'
import project from '../../models/Project'

const getAll = async (req: Request, res: Response): Promise<void> => {
  const projectId = req.params.projectId

  project
    .findById(projectId)
    .populate('manager', 'firstName lastName isActive emailAddress position')
    .populate('visibility.users', 'firstName lastName isActive emailAddress position')
    .populate('visibility.teams', 'name')
    .then((p) => {
      if (p) {
        res.json(p)
      } else {
        res
          .status(404)
          .send()
      }
    })
    .catch((reason) => {
      res
        .status(500)
        .json({
          message: reason.message
        })
    })
}

export default getAll
