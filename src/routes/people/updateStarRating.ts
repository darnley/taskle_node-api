import { Request, Response } from 'express'
import updateUserStarRating from '../../services/updateUserStarRating'

const updateStarRating = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId

  updateUserStarRating([userId])

  res
    .status(200)
    .send()
}

export default updateStarRating
