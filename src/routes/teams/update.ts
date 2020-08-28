import { Request, Response } from 'express'
import Team from '../../models/Team'

const update = async (req: Request, res: Response) => {
  const teamId = req.params.teamId
  const newDataTeam = new Team(req.body)

  newDataTeam._id = teamId

  newDataTeam.validate((err) => {
    if (err) {
      res
        .status(400)
        .json(err)
    } else {
      Team
        .findByIdAndUpdate(teamId, newDataTeam, (err, updatedTeam) => {
          if (err || !updatedTeam) {
            res
              .status(400)
              .json(err)
          } else {
            res
              .status(200)
              .json(updatedTeam)
          }
        })
    }
  })
}

export default update
