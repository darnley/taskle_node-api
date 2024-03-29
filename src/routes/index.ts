import { Router, Request, Response } from 'express'
import people from './people'
import projects from './projects'
import auth from './auth'
import authentication from '../middlewares/authentication'
import teams from './teams'
import keywords from './keywords'
import me from './me'
import health from './health'
import notFound from './errors/not-found'
import org from './org'

const router = Router()

router.use('/auth', auth)

router.use('/people', authentication.authenticate(), people)
router.use('/projects', authentication.authenticate(), projects)
router.use('/teams', authentication.authenticate(), teams)
router.use('/keywords', authentication.authenticate(), keywords)
router.use('/me', authentication.authenticate(), me)
router.use('/org', authentication.authenticate(), org)

router.use('/health-check', health)
router.use('/*', notFound)

export default router
