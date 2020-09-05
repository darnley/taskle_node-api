import { Router } from 'express'
import stats from './stats'

const router = Router()

router.use('/:projectId/stats', stats)

export default router
