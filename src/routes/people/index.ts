import { Router } from 'express'
import getAll from './getAll'
import add from './add'
import get from './get'
import updateStarRating from './updateStarRating'
import stats from './stats'
import projects from './projects'
import update from './update'
import getKeywords from './getKeywords'
import verifyIfEntityExistsById from '../../middlewares/verifyIfEntityExistsById'

const router = Router()

router.get('/', getAll)
router.post('/', add)
router.use(['/:userId', '/:userId/*'], verifyIfEntityExistsById([{ entity: 'User' }]))
router.get('/:userId', get)
router.put('/:userId', update)
router.get('/:userId/keywords', getKeywords)
router.get('/:userId/update-star-rating', updateStarRating)
router.use('/:userId/stats', stats)
router.use('/:userId/projects', projects)

export default router
