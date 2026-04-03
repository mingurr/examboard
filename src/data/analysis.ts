import type { AnalysisMockData } from "../types/analysis";

export const analysisMockData: AnalysisMockData = {
  filterOptions: {
    school: [
      { label: "A高等学校", value: "a-high-school" },
      { label: "B高等学校", value: "b-high-school" },
      { label: "C中学校", value: "c-middle-school" },
    ],
    grade: [
      { label: "1年生", value: "grade-1" },
      { label: "2年生", value: "grade-2" },
      { label: "3年生", value: "grade-3" },
    ],
    subject: [
      { label: "数学", value: "math" },
      { label: "英語", value: "english" },
      { label: "国語", value: "japanese" },
    ],
    examType: [
      { label: "中間試験", value: "midterm" },
      { label: "期末試験", value: "final" },
      { label: "総合試験", value: "mock" },
    ],
    season: [
      { label: "2023年 1学期 中間", value: "2023-1-midterm" },
      { label: "2023年 1学期 期末", value: "2023-1-final" },
      { label: "2023年 2学期 中間", value: "2023-2-midterm" },
      { label: "2023年 2学期 期末", value: "2023-2-final" },
    ],
  },

  defaultFilters: {
    school: "a-high-school",
    grade: "grade-1",
    subject: "math",
    examType: "final",
    season: "2023-2-final",
  },

  summary: {
    title: "A高等学校 1年生 数学 出題傾向分析",
    description:
      "選択した学校とシーズンの試験データをもとに、出題傾向、問題タイプ、難易度分布を確認できます。",
    badge: "直近3シーズン基準",
    radarMetrics: [
      { label: "理解", value: 72 },
      { label: "応用", value: 84 },
      { label: "批判", value: 68 },
      { label: "表現", value: 54 },
      { label: "把握", value: 61 },
    ],
    donutItems: [
      { id: "multiple-choice", label: "選択式", value: 35 },
      { id: "short-answer", label: "短答式", value: 30 },
      { id: "descriptive", label: "記述式", value: 20 },
      { id: "other", label: "その他", value: 15 },
    ],
    difficultyDistribution: [
      { id: "algebra", label: "代数", low: 36, medium: 34, high: 30 },
      { id: "functions", label: "関数", low: 18, medium: 42, high: 40 },
      { id: "equation", label: "方程式", low: 24, medium: 38, high: 38 },
      { id: "probability", label: "確率", low: 12, medium: 33, high: 55 },
    ],
    insights: [
      { id: "insight-1", text: "外部文章の活用比率が増加しています。" },
      {
        id: "insight-2",
        text: "記述式問題の割合が前シーズンより上昇しています。",
      },
      { id: "insight-3", text: "中・高難度問題への集中が見られます。" },
      { id: "insight-4", text: "概念応用型の設問が多く出題されています。" },
      { id: "insight-5", text: "次回試験でも記述式強化が予想されます。" },
    ],
    strategies: [
      { id: "strategy-1", text: "記述式対策問題の比重を拡大する" },
      { id: "strategy-2", text: "外部文章ベースの読解訓練を追加する" },
      { id: "strategy-3", text: "高難度応用問題セットを構成する" },
      { id: "strategy-4", text: "概念説明型課題の比率を強化する" },
    ],
  },

  questions: [
    {
      id: "question-1",
      number: 1,
      type: "選択式",
      difficulty: "high",
      unit: "関数",
    },
    {
      id: "question-2",
      number: 2,
      type: "短答式",
      difficulty: "medium",
      unit: "方程式",
    },
    {
      id: "question-3",
      number: 3,
      type: "記述式",
      difficulty: "high",
      unit: "図形",
    },
    {
      id: "question-4",
      number: 4,
      type: "選択式",
      difficulty: "medium",
      unit: "確率",
    },
    {
      id: "question-5",
      number: 5,
      type: "記述式",
      difficulty: "low",
      unit: "代数",
    },
  ],

  resources: [
    {
      id: "resource-1",
      title: "類似過去問のおすすめ",
      description: "直近3シーズンから類似パターンの問題を推薦します。",
      badge: "推薦",
    },
    {
      id: "resource-2",
      title: "弱点単元集中学習資料",
      description: "中・高難度を中心に学習資料を構成します。",
      badge: "学習",
    },
    {
      id: "resource-3",
      title: "次回試験予想ポートフォリオ",
      description: "出題傾向を反映した次回試験対策資料です。",
      badge: "戦略",
    },
  ],
};
