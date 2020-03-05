import { Router } from 'express'
import getAll from './getAll'
import add from './add'
import get from './get'

const router = Router()

router.get('/', getAll)
router.post('/', add)
router.get('/:taskId', get)

export default router
