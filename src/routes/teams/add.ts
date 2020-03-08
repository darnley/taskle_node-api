import { Request, Response } from 'express'
import Team from '../../models/Team'

const add = async (req: Request, res: Response) => {
  const team = new Team(req.body)

  team.save()
    .then((team) => {
      res
        .status(201)
        .json(team)
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default add
