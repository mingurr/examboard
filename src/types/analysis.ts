export type AnalysisFilterKey =
  | "school"
  | "grade"
  | "subject"
  | "examType"
  | "season";

export type AnalysisFilterOption = {
  label: string;
  value: string;
};

export type AnalysisFilterOptions = Record<
  AnalysisFilterKey,
  AnalysisFilterOption[]
>;

export type AnalysisFilters = Record<AnalysisFilterKey, string>;

export type AnalysisInsight = {
  id: string;
  text: string;
};

export type AnalysisStrategy = {
  id: string;
  text: string;
};

export type AnalysisRadarMetric = {
  label: string;
  value: number;
};

export type AnalysisDonutItem = {
  id: string;
  label: string;
  value: number;
};

export type AnalysisDifficultyDistributionItem = {
  id: string;
  label: string;
  low: number;
  medium: number;
  high: number;
};

export type AnalysisSummary = {
  title: string;
  description: string;
  badge: string;
  radarMetrics: AnalysisRadarMetric[];
  donutItems: AnalysisDonutItem[];
  difficultyDistribution: AnalysisDifficultyDistributionItem[];
  insights: AnalysisInsight[];
  strategies: AnalysisStrategy[];
};

export type AnalysisQuestionItem = {
  id: string;
  number: number;
  type: string;
  difficulty: "low" | "medium" | "high";
  unit: string;
};

export type AnalysisResourceItem = {
  id: string;
  title: string;
  description: string;
  badge: string;
};

export type AnalysisMockData = {
  filterOptions: AnalysisFilterOptions;
  defaultFilters: AnalysisFilters;
  summary: AnalysisSummary;
  questions: AnalysisQuestionItem[];
  resources: AnalysisResourceItem[];
};
