import { Router } from 'express'
import tasks from './tasks'
import people from './people'
import projects from './projects'
import auth from './auth'
import authentication from '../utils/authentication'

const router = Router()

router.use('/auth', auth)

router.use('/people', authentication.authenticate(), people)
router.use('/projects', authentication.authenticate(), projects)
router.use('/tasks', authentication.authenticate(), tasks)

export default router
