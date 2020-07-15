import { Request, Response } from 'express'

const notFound = (req: Request, res: Response) => {
  res
    .status(404)
    .header('Cache-Control', 'no-cache')
    .json({
      message: 'Route not found.'
    })
}

export default notFound
