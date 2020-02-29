import { Request, Response } from 'express'

const getAll = (req: Request, res: Response): void => {
  res.json({ ready: true })
}

export default getAll
