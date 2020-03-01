import { Request, Response } from 'express'
import team from '../../models/Team'

const getAll = (req: Request, res: Response) => {
  team.findById(req.params.id)
    .then((team) => {
      if (team) {
        res.json(team)
      } else {
        res
          .status(404)
          .json({
            message: 'A equipe não foi encontrada'
          })
      }
    })
    .catch((reason) => {
      res
        .status(404)
        .json({ message: reason.message })
    })
}

export default getAll
