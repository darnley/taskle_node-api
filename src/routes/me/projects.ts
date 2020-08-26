import { Request, Response } from 'express'
import User, { IUser } from '../../models/User'
import Task from '../../models/Task'
import Project, { IProject } from '../../models/Project'
import Team, { ITeam } from '../../models/Team'
import getUserProjects from '../../services/getUserProjects'

const getProjects = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id
  try {
    const projects = await getUserProjects(userId)

    res
      .json([...new Set(projects)])
  } catch (err) {
    res
      .status(400)
      .json(err)
  }
}

export default getProjects
