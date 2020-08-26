import Task, { ITask } from '../models/Task'

const getUserTasks = (userId: string): Promise<ITask[]> => {
  return new Promise((resolve, reject) => {
    Task
      .find({ responsible: userId })
      .populate('project', 'name description keywords status')
      .populate('responsible', 'firstName lastName')
      .then(resolve)
      .catch(reject)
  })
}

export default getUserTasks
