export interface IProjectStatisticsTaskStatus {
  status: string;
  count: number;
}

export interface IProjectStatisticsTaskComplexity {
  complexity: string;
  count: number;
}

export interface IProjectStatisticsPerKeywords {
  keyword: string;
  count: number;
}

export interface IProjectStatistics {
  projectId: string;
  perTaskStatus: IProjectStatisticsTaskStatus[];
  perTaskComplexity: IProjectStatisticsTaskComplexity[];
  perKeywords: IProjectStatisticsPerKeywords[];
}
