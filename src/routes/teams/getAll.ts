import { Request, Response } from 'express'
import team from '../../models/Team'

const getAll = async (req: Request, res: Response): Promise<void> => {
  const teams = await team.find({})

  res.json(teams)
}

export default getAll
