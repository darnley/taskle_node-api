import { Request, Response } from 'express'

const verifyToken = (req: Request, res: Response): void => {
  res.status(200).send()
}

export default verifyToken
