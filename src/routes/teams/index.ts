import { Router } from 'express'
import getAll from './getAll'
import add from './add'
import get from './get'
import verifyIfEntityExistsById from '../../middlewares/verifyIfEntityExistsById'
import getPeople from './getPeople'
import update from './update'
import getPeopleCount from './getPeopleCount'

const router = Router()

router.get('/', getAll)
router.post('/', add)
router.use(['/:teamId', '/:teamId/*'], verifyIfEntityExistsById([{ entity: 'Team' }]))
router.get('/:teamId', get)
router.get('/:teamId/people', getPeople)
router.get('/:teamId/people-count', getPeopleCount)
router.put('/:teamId', update)

export default router
