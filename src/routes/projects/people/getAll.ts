import { Request, Response } from 'express'
import Task from '../../../models/Task'
import User, { IUser } from '../../../models/User'
import Project from '../../../models/Project'
import log from '../../../utils/log'
import { ITeam } from '../../../models/Team'
import { distinctArrayOfObjects } from '../../../utils/distinct'

const getAll = async (req: Request, res: Response) => {
  const projectId = req.params.projectId
  const userPopulateFields = 'firstName lastName emailAddress starRating starRatingCount keywords'

  try {
    // Get people that are responsible for tasks
    const peopleInTasks: IUser[] = (
      await Task
        .find({ project: projectId })
        .populate('responsible', userPopulateFields)
        .select('responsible')
    )
      .map(t => t.responsible as IUser)
      .filter(t => t)

    // Get people that are configured in visibility
    const peopleInProject: IUser[] = (
      await Project
        .find({ _id: projectId })
        .populate('visibility.users', userPopulateFields)
        .select('visibility.users')
    ).map(p => p.visibility.users)[0] as IUser[]

    // Get authorized teams
    const projectTeams: ITeam[] = (
      (await Project
        .find({ _id: projectId })
        .select('visibility.teams')
      ).map(p => p.visibility.teams)
    )[0] as ITeam[]

    // Get people in teams
    const peopleInTeams: IUser[] = (await User
      .find({ team: { $in: projectTeams } })
      .select(userPopulateFields)
    )

    const joinedArray: IUser[] = [...peopleInTasks, ...peopleInProject, ...peopleInTeams]
    const distinctedArray = distinctArrayOfObjects(joinedArray, '_id')

    res
      .status(200)
      .json(distinctedArray)
  } catch (err) {
    res
      .status(400)
      .json(err)
  }
}

export default getAll
