import { Request, Response } from 'express'
import Project from '../../models/Project'
import ProjectStatus from '../../enums/projectStatus'

const add = async (req: Request, res: Response) => {
  const projectId = req.params.projectId
  const newDataProject = new Project(req.body)

  if (newDataProject.status === ProjectStatus.Ended) {
    return res
      .status(400)
      .json({
        message: 'Não é permitido alterar o estado do projeto para encerrado ou alterar um projeto encerrado. Para encerrar um projeto, utilize a API \'/projects/:projectId/end\'.'
      })
  }

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
