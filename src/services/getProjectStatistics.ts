import mongoose from 'mongoose'
import TaskComplexity from '../enums/taskComplexity'
import TaskStatus from '../enums/taskStatus'
import { IProjectStatistics, IProjectStatisticsPerKeywords, IProjectStatisticsTaskComplexity, IProjectStatisticsTaskStatus } from '../interfaces/ProjectStatistics'
import Task from '../models/Task'

export async function getPerKeyword (projectId: string): Promise<IProjectStatisticsPerKeywords[]> {
  const statistics: IProjectStatisticsPerKeywords[] =
    await Task
      .aggregate()
      .match({
        project: mongoose.Types.ObjectId(projectId)
      })
      .project({
        _id: 0,
        keywords: 1
      })
      .unwind({
        path: '$keywords',
        includeArrayIndex: 'string',
        preserveNullAndEmptyArrays: false
      })
      .group({
        _id: '$keywords',
        count: {
          $sum: 1
        }
      })
      .project({
        _id: 0,
        keyword: '$_id',
        count: 1
      })
      .sort({
        count: -1
      })

  return statistics
}

export async function getPerTaskStatus (projectId: string): Promise<IProjectStatisticsTaskStatus[]> {
  const statistics: IProjectStatisticsTaskStatus[] = []

  for (const status of Object.values(TaskStatus)) {
    statistics.push({
      status,
      count: await Task.countDocuments({ project: projectId, status: status })
    })
  }

  return statistics
}

export async function getPerTaskComplexity (projectId: string): Promise<IProjectStatisticsTaskComplexity[]> {
  const statistics: IProjectStatisticsTaskComplexity[] = []

  for (const complexity of Object.values(TaskComplexity)) {
    statistics.push({
      complexity,
      count: await Task.countDocuments({ project: projectId, complexity: complexity })
    })
  }

  return statistics
}

const getProjectStatistics = async (projectId: string): Promise<IProjectStatistics> => {
  return {
    projectId,
    perTaskStatus: await getPerTaskStatus(projectId),
    perTaskComplexity: await getPerTaskComplexity(projectId),
    perKeywords: await getPerKeyword(projectId)
  }
}

export default getProjectStatistics
