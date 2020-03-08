import { Router } from 'express'
import people from './people'
import projects from './projects'
import auth from './auth'
import authentication from '../middlewares/authentication'
import teams from './teams'
import keywords from './keywords'
import me from './me'

const router = Router()

router.use('/auth', auth)

router.use('/people', authentication.authenticate(), people)
router.use('/projects', authentication.authenticate(), projects)
router.use('/teams', authentication.authenticate(), teams)
router.use('/keywords', authentication.authenticate(), keywords)
router.use('/me', authentication.authenticate(), me)

export default router
