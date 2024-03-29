import { Router } from 'express'
import stats from './stats'

const router = Router()

router.use('/stats', stats)

export default router
