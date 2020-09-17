import { Router } from 'express'
import taskCount from './taskCount'
import taskComplexity from './taskComplexity'
import keywords from './keywords'
import peopleCount from './peopleCount'

const router = Router({ mergeParams: true })

router.get('/task-count', taskCount)
router.get('/task-complexity', taskComplexity)
router.get('/task-keywords', keywords)
router.get('/people-count', peopleCount)

export default router
