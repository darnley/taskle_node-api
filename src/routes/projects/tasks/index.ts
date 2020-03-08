import { Router } from 'express'
import getAll from './getAll'
import add from './add'
import get from './get'
import update from './update'
import verifyIfEntityExistsById from '../../../utils/verifyIfEntityExistsById'
import remove from './remove'

const router = Router({ mergeParams: true })

router.get('/', getAll)
router.post('/', add)
router.use(['/:taskId', '/:taskId/*'], verifyIfEntityExistsById([{ entity: 'Task' }]))
router.get('/:taskId', get)
router.put('/:taskId', update)
router.delete('/:taskId', remove)

export default router
