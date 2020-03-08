import { Request, Response } from 'express'
import Project from '../../models/Project'

const add = async (req: Request, res: Response): Promise<void> => {
  const projectId = req.params.projectId
  const newDataProject = new Project(req.body)

  newDataProject.validate((err) => {
    if (err) {
      res
        .status(400)
        .json(err)
    } else {
      Project
        .findByIdAndUpdate(projectId, newDataProject, (err, updatedProject) => {
          if (err || !updatedProject) {
            res
              .status(400)
              .json(err)
          } else {
            res
              .status(200)
              .json(updatedProject)
          }
        })
    }
  })
}

export default add
