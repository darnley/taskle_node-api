import { Request, Response } from 'express'
import Team from '../../models/Team'

const add = async (req: Request, res: Response) => {
  const team = new Team(req.body)

  await team.validate((err) => {
    if (err) {
      res
        .status(400)
        .json({
          message: err.message
        })
      return null
    }
  })

  team.save()
    .then((team) => {
      res
        .status(201)
        .json(team)
    })
}

export default add
