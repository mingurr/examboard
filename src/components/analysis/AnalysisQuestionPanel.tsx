import SectionCard from "@/components/common/SectionCard";
import type { AnalysisQuestionItem } from "@/types/analysis";

type AnalysisQuestionPanelProps = {
  questions: AnalysisQuestionItem[];
  selectedQuestionId: string | null;
  onSelectQuestion: (questionId: string) => void;
};

const difficultyLabelMap: Record<AnalysisQuestionItem["difficulty"], string> = {
  low: "低",
  medium: "中",
  high: "高",
};

const difficultyTextColorMap: Record<
  AnalysisQuestionItem["difficulty"],
  string
> = {
  low: "text-emerald-500",
  medium: "text-amber-500",
  high: "text-rose-500",
};

export default function AnalysisQuestionPanel({
  questions,
  selectedQuestionId,
  onSelectQuestion,
}: AnalysisQuestionPanelProps) {
  return (
    <SectionCard>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">
          試験問題ごとの詳細情報
        </h3>

        <button
          type="button"
          className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
        >
          すべて表示
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-slate-200">
        <div className="grid grid-cols-[52px_1fr_64px_72px_92px] bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>#</span>
          <span>タイプ</span>
          <span>難易度</span>
          <span>単元</span>
          <span>詳細</span>
        </div>

        <div className="divide-y divide-slate-200">
          {questions.map((question) => {
            const isSelected = question.id === selectedQuestionId;

            return (
              <div
                key={question.id}
                className={`grid grid-cols-[52px_1fr_64px_72px_92px] items-center px-4 py-3 text-sm transition ${
                  isSelected ? "bg-violet-50" : "bg-white"
                }`}
              >
                <span className="font-semibold text-slate-900">
                  {question.number}
                </span>

                <span className="text-slate-700">{question.type}</span>

                <span
                  className={`font-semibold ${
                    difficultyTextColorMap[question.difficulty]
                  }`}
                >
                  {difficultyLabelMap[question.difficulty]}
                </span>

                <span className="text-slate-700">{question.unit}</span>

                <button
                  type="button"
                  onClick={() => onSelectQuestion(question.id)}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    isSelected
                      ? "bg-violet-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  詳細情報
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}
