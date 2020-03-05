import { Request, Response } from 'express'
import Project from '../../models/Project'

const add = async (req: Request, res: Response): Promise<void> => {
  const project = new Project(req.body)

  project.save()
    .then((p) => {
      res
        .status(201)
        .json(p)
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default add
