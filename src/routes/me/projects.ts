import { Request, Response } from 'express'
import User, { IUser } from '../../models/User'
import Task from '../../models/Task'
import Project, { IProject } from '../../models/Project'
import Team, { ITeam } from '../../models/Team'

const getProjects = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id
  try {
    const user =
    await User
      .findById(userId)
      .populate('team', '_id name')
      .select('team')

    let projects: (string | IProject)[] = []

    const taskProjects = (await Task
      .find({ responsible: userId })
      .populate({
        path: 'project',
        select: 'name description keywords createdAt',
        populate: {
          path: 'manager',
          select: 'firstName lastName emailAddress'
        }
      })
      .select('project'))
      .map(t => t.project)

    const teamProjects = (await Project.find({
      $and: [{
        $or: [
          { manager: userId },
          { 'visibility.users': userId },
          { 'visibility.teams': (user?.team as ITeam).id }
        ]
      },
      {
        _id: {
          $nin: (taskProjects as IProject[]).map(t => t._id)
        }
      }]

    })
      // .populate('name description keywords createdAt')
      .populate('manager', 'firstName lastName emailAddress'))

    projects = [...taskProjects, ...teamProjects]

    res
      .json([...new Set(projects)])
  } catch (err) {
    res
      .status(400)
      .json(err)
  }
}

export default getProjects
