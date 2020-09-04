import { Router } from 'express'
import getAll from './getAll'
import add from './add'
import get from './get'
import updateStarRating from './updateStarRating'
import stats from './stats'
import projects from './projects'
import update from './update'

const router = Router()

router.get('/', getAll)
router.post('/', add)
router.get('/:id', get)
router.put('/:userId', update)
router.get('/:id/update-star-rating', updateStarRating)
router.use('/:id/stats', stats)
router.use('/:id/projects', projects)

export default router
