import { Request, Response } from 'express'
import getUsedKeywords from '../../services/getUsedKeywords'

const getAll = (req: Request, res: Response) => {
  getUsedKeywords()
    .then((keywords) => {
      res
        .json(keywords)
    })
    .catch((reason) => {
      res
        .status(400)
        .json(reason)
    })
}

export default getAll
