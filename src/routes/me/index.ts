import { Router } from 'express'
import projects from './projects'
import tasks from './tasks'

const router = Router()

router.get('/projects', projects)
router.get('/tasks', tasks)

export default router
