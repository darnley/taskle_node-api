import { Request, Response } from 'express'
import Task from '../../models/Task'
import ProjectEndRating, { IProjectEndRating } from '../../models/ProjectEndRating'
import updateUserStarRating from '../../services/updateUserStarRating'
import Project from '../../models/Project'
import ProjectStatus from '../../enums/projectStatus'
import log from '../../utils/log'

const endProject = async (req: Request, res: Response) => {
  const projectId = req.params.projectId
  let people: IProjectEndRating[] = req.body

  // Adiciona o ID do projeto passado como parâmetro na URL em todos os objetos
  people = people.map(person => {
    person.project = projectId
    return new ProjectEndRating(person)
  })

  if (await ProjectEndRating.exists({ project: projectId })) {
    return res
      .status(403)
      .json({
        message: 'Este projeto já possui classificações ou já está encerrado.'
      })
  }

  ProjectEndRating
    .create(people)
    .then((ratings) => {
      res.json(ratings)

      Project
        .findByIdAndUpdate(projectId, { status: ProjectStatus.Ended })
        .then(() => null)
        .catch((reason) => { log.error(reason) })

      updateUserStarRating(ratings.map(e => e.user.toString()))
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default endProject
