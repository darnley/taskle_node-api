import { Router } from 'express'
import getToken from './getToken'
import authentication from '../../middlewares/authentication'
import verifyToken from './verifyToken'
import passwordReset from './passwordReset'

const router = Router()

router.post('/password-reset/:userId/:key1/:key2', passwordReset)
router.post('/token', getToken)
router.post('/verify', authentication.authenticate(), verifyToken)

export default router
