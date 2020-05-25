import { Router } from 'express'
import getAll from './getAll'
import add from './add'
import get from './get'
import tasks from './tasks'
import people from './people'
import update from './update'
import verifyIfEntityExistsById from '../../middlewares/verifyIfEntityExistsById'
import endProject from './end'
import stats from './stats'
import getAllMilestones from './getAllMilestones'

const router = Router()

// Project
router.get('/', getAll)
router.post('/', add)
router.use(['/:projectId', '/:projectId/*'], verifyIfEntityExistsById([{ entity: 'Project' }]))
router.get('/:projectId', get)
router.put('/:projectId', update)
router.post('/:projectId/end', endProject)
router.get('/:projectId/stats', stats)
router.get('/:projectId/milestones', getAllMilestones)

// Project/Task
router.use('/:projectId/tasks', tasks)

// Project/People
router.use('/:projectId/people', people)

export default router
