import { Router } from 'express'
import getAll from './getAll'

const router = Router()

router.get('/', getAll)

export default router
