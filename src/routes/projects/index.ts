import { Router } from 'express'
import getAll from './getAll'
import add from './add'
import get from './get'
import tasks from './tasks'
import people from './people'
import update from './update'
import verifyIfEntityExistsById from '../../utils/verifyIfEntityExistsById'

const router = Router()

// Project
router.get('/', getAll)
router.post('/', add)
router.use(['/:projectId', '/:projectId/*'], verifyIfEntityExistsById([{ entity: 'Project' }]))
router.get('/:projectId', get)
router.put('/:projectId', update)

// Project/Task
router.use('/:projectId/tasks', tasks)

// Project/People
router.use('/:projectId/people', people)

export default router
