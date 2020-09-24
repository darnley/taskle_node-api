import { Request, Response } from 'express'
import { getUserKeywords } from '../../services/userKeywords'

const getKeywords = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id
  const monthHistory: number = parseInt(req.query.monthHistory) ?? -1

  getUserKeywords(userId, monthHistory)
    .then((keywords) => {
      if (keywords) {
        res.json(keywords)
      } else {
        res
          .status(404)
          .send()
      }
    })
    .catch((reason) => {
      res
        .status(500)
        .json({
          message: reason.message
        })
    })
}

export default getKeywords
