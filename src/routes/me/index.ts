import { Router } from 'express'
import projects from './projects'
import tasks from './tasks'
import profile from './profile'
import contextCounts from './context-counts'

const router = Router()

router.get('/projects', projects)
router.get('/tasks', tasks)
router.get('/profile', profile)
router.get('/context-counts', contextCounts)

export default router
