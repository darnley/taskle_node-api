import Task from '../models/Task'
import { IProjectStatistics, IProjectStatisticsTaskStatus, IProjectStatisticsPerKeywords, IProjectStatisticsTaskComplexity } from '../interfaces/ProjectStatistics'
import TaskStatus from '../enums/taskStatus'
import TaskComplexity from '../enums/taskComplexity'

const getProjectStatistics = async (projectId: string): Promise<IProjectStatistics> => {
  async function getPerTaskStatus (): Promise<IProjectStatisticsTaskStatus[]> {
    const statistics: IProjectStatisticsTaskStatus[] = []

    for (const status of Object.values(TaskStatus)) {
      statistics.push({
        status,
        count: await Task.countDocuments({ project: projectId, status: status })
      })
    }

    return statistics
  }

  async function getPerTaskComplexity (): Promise<IProjectStatisticsTaskComplexity[]> {
    const statistics: IProjectStatisticsTaskComplexity[] = []

    for (const complexity of Object.values(TaskComplexity)) {
      statistics.push({
        complexity,
        count: await Task.countDocuments({ project: projectId, complexity: complexity })
      })
    }

    return statistics
  }

  async function getPerKeyword (): Promise<IProjectStatisticsPerKeywords[]> {
    const keywords: string[] = await Task.distinct('keywords', { project: projectId })
    const statistics: IProjectStatisticsPerKeywords[] = []

    for (const word of keywords) {
      statistics.push({
        keyword: word,
        count: await Task.countDocuments({ project: projectId, keywords: word })
      })
    }

    return statistics
  }

  return {
    projectId,
    perTaskStatus: await getPerTaskStatus(),
    perTaskComplexity: await getPerTaskComplexity(),
    perKeywords: await getPerKeyword()
  }
}

export default getProjectStatistics
