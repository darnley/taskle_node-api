import { Request, Response } from 'express'
import getProjectStatistics, { getPerKeyword } from '../../../services/getProjectStatistics'

const keywords = async (req: Request, res: Response): Promise<void> => {
  const projectId = req.params.projectId

  getPerKeyword(projectId)
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
