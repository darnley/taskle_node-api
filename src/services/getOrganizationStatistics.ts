import mongoose from 'mongoose'
import TaskComplexity from '../enums/taskComplexity'
import TaskStatus from '../enums/taskStatus'
import { IProjectStatistics, IProjectStatisticsPerKeywords, IProjectStatisticsTaskComplexity, IProjectStatisticsTaskStatus } from '../interfaces/ProjectStatistics'
import Task from '../models/Task'
import { IOrganizationStatistics } from '../interfaces/OrganizationStatistics'

export async function getPerKeyword (): Promise<IProjectStatisticsPerKeywords[]> {
  const statistics: IProjectStatisticsPerKeywords[] =
    await Task
      .aggregate()
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

export async function getPerTaskStatus (): Promise<IProjectStatisticsTaskStatus[]> {
  const statistics: IProjectStatisticsTaskStatus[] = []

  for (const status of Object.values(TaskStatus)) {
    statistics.push({
      status,
      count: await Task.countDocuments({ status: status })
    })
  }

  return statistics
}

export async function getPerTaskComplexity (): Promise<IProjectStatisticsTaskComplexity[]> {
  const statistics: IProjectStatisticsTaskComplexity[] = []

  for (const complexity of Object.values(TaskComplexity)) {
    statistics.push({
      complexity,
      count: await Task.countDocuments({ complexity: complexity })
    })
  }

  return statistics
}

const getOrganizationStatistics = async (): Promise<IOrganizationStatistics> => {
  return {
    perTaskStatus: await getPerTaskStatus(),
    perTaskComplexity: await getPerTaskComplexity(),
    perKeywords: await getPerKeyword()
  }
}

export default getOrganizationStatistics
