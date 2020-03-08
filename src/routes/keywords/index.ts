import { Router } from 'express'
import getAll from './getAll'
import getLike from './getLike'

const router = Router()

router.get('/', getAll)
router.get('/:word', getLike)

export default router
