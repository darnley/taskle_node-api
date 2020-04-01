import { Router } from 'express'
import projects from './projects'
import tasks from './tasks'
import profile from './profile'

const router = Router()

router.get('/projects', projects)
router.get('/tasks', tasks)
router.get('/profile', profile)

export default router
