import { Router } from 'express'
import getAll from './getAll'
import add from './add'
import get from './get'
import updateStarRating from './updateStarRating'
import stats from './stats'

const router = Router()

router.get('/', getAll)
router.post('/', add)
router.get('/:id', get)
router.get('/:id/update-star-rating', updateStarRating)
router.use('/:id/stats', stats)

export default router
