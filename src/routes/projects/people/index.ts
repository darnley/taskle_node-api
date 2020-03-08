import { Router } from 'express'
import getAll from './getAll'

const router = Router({ mergeParams: true })

router.get('/', getAll)

export default router
