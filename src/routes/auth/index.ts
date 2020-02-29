import { Router } from 'express'
import getToken from './getToken'
import authentication from '../../utils/authentication'
import verifyToken from './verifyToken'

const router = Router()

router.post('/token', getToken)
router.post('/verify', authentication.authenticate(), verifyToken)

export default router
