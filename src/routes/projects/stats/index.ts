import { Router } from 'express'
import taskCount from './taskCount'

const router = Router({ mergeParams: true })

router.get('/task-count', taskCount)

export default router
