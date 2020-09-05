import { Request, Response } from 'express'
import { getPerKeyword } from '../../../services/getOrganizationStatistics'

const keywords = async (req: Request, res: Response): Promise<void> => {
  getPerKeyword()
    .then((keywords) => {
      res
        .status(200)
        .json(keywords)
    })
    .catch((reason) => {
      res
        .status(400)
        .json({
          message: reason.message
        })
    })
}

export default keywords
