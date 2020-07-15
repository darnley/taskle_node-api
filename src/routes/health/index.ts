import { Request, Response } from "express";

const health = (req: Request, res: Response) => {
  res
    .status(200)
    .header('Cache-Control', 'no-cache')
    .json({
      'status': 'OK',
      'message': 'The application is running.'
    })
}

export default health