import SelectField from "@/components/common/SelectField";
import type {
  AnalysisFilterKey,
  AnalysisFilters,
  AnalysisFilterOptions,
} from "@/types/analysis";

type AnalysisFilterBarProps = {
  filters: AnalysisFilters;
  filterOptions: AnalysisFilterOptions;
  onFilterChange: (key: AnalysisFilterKey, value: string) => void;
  onAnalyze: () => void;
};

const filterConfig: Array<{
  key: AnalysisFilterKey;
  label: string;
  placeholder: string;
}> = [
  {
    key: "school",
    label: "学校",
    placeholder: "学校を選択してください",
  },
  {
    key: "grade",
    label: "学年",
    placeholder: "学年を選択してください",
  },
  {
    key: "subject",
    label: "科目",
    placeholder: "科目を選択してください",
  },
  {
    key: "examType",
    label: "試験タイプ",
    placeholder: "試験タイプを選択してください",
  },
  {
    key: "season",
    label: "年度 / シーズン",
    placeholder: "シーズンを選択してください",
  },
];

export default function AnalysisFilterBar({
  filters,
  filterOptions,
  onFilterChange,
  onAnalyze,
}: AnalysisFilterBarProps) {
  return (
    <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200/70 md:p-6">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-sm font-medium text-violet-600">分析レポート</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
            試験問題分析
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            選択した学校とシーズンの試験データをもとに、出題傾向、問題タイプ、
            推薦資料を一画面で確認できます。
          </p>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {filterConfig.map(({ key, label, placeholder }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-500">
                  {label}
                </label>
                <SelectField
                  value={filters[key]}
                  options={filterOptions[key]}
                  placeholder={placeholder}
                  onChange={(event) => onFilterChange(key, event.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end xl:shrink-0">
            <button
              type="button"
              onClick={onAnalyze}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              分析実行
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
