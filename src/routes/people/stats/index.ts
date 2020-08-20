import { Router } from 'express'
import taskComplexity from './taskComplexity'

const router = Router({ mergeParams: true })

router.get('/task-complexity', taskComplexity)

export default router
