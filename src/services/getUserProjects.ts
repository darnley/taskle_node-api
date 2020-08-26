import User from '../models/User'
import Task from '../models/Task'
import Project, { IProject } from '../models/Project'
import { ITeam } from '../models/Team'

const getUserProjects = async (userId: string) => {
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
      select: 'name description keywords createdAt status',
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

  return projects
}

export default getUserProjects
