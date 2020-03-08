import { Request, Response } from 'express'
import getUsedKeywords from '../../services/getUsedKeywords'
import sanitizeKeyword from '../../utils/sanitizeKeyword'

const getLike = async (req: Request, res: Response) => {
  getUsedKeywords(req.params.word)
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

export default getLike
