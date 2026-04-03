import SectionCard from "@/components/common/SectionCard";
import type { AnalysisSummary } from "@/types/analysis";

type AnalysisOverviewPanelProps = {
  summary: AnalysisSummary;
};

export default function AnalysisOverviewPanel({
  summary,
}: AnalysisOverviewPanelProps) {
  return (
    <SectionCard>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
              {summary.title}
            </h3>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <h4 className="text-base font-semibold text-slate-900">
              領域別出題比重および難易度
            </h4>

            <div className="mt-5 flex pt-8 pb-8 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
              <div className="w-full max-w-[320px] space-y-5 px-6">
                {summary.radarMetrics.map((metric) => (
                  <div key={metric.label} className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{metric.label}</span>
                      <span className="font-medium text-slate-900">
                        {metric.value}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-violet-500"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <h4 className="text-base font-semibold text-slate-900">
                問題タイプ分布
              </h4>

              <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-[conic-gradient(#3b82f6_0_35%,#10b981_35%_65%,#f59e0b_65%_85%,#8b5cf6_85%_100%)]">
                  <div className="h-20 w-20 rounded-full bg-white shadow-inner" />
                  <div className="absolute text-center">
                    <p className="text-xs font-medium text-slate-400">総項目</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {summary.donutItems.reduce(
                        (acc, item) => acc + item.value,
                        0,
                      )}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {summary.donutItems.map((item, index) => {
                    const dotColors = [
                      "bg-blue-500",
                      "bg-emerald-500",
                      "bg-amber-500",
                      "bg-violet-500",
                    ];

                    return (
                      <div key={item.id} className="flex items-center gap-3">
                        <div
                          className={`h-3 w-3 rounded-full ${dotColors[index % dotColors.length]}`}
                        />
                        <span className="min-w-20 text-sm text-slate-600">
                          {item.label}
                        </span>
                        <span className="text-sm font-semibold text-slate-900">
                          {item.value}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-xl">
              <h4 className="text-base font-semibold">Key Insights</h4>

              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                {summary.insights.map((insight) => (
                  <li key={insight.id} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-fuchsia-400" />
                    <span>{insight.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-slate-900">
                難易度別出題分布
              </h4>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />低
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />中
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />高
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {summary.difficultyDistribution.map((item) => (
                <div key={item.id}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {item.label}
                    </span>
                    <span className="text-slate-400">
                      {item.low + item.medium + item.high}%
                    </span>
                  </div>

                  <div className="flex h-4 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="bg-rose-400"
                      style={{ width: `${item.low}%` }}
                    />
                    <div
                      className="bg-amber-400"
                      style={{ width: `${item.medium}%` }}
                    />
                    <div
                      className="bg-emerald-400"
                      style={{ width: `${item.high}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-violet-50 to-fuchsia-50 p-5 ring-1 ring-violet-100">
            <p className="text-sm font-semibold text-violet-700">推薦戦略</p>
            <h4 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
              次回試験対策の主要アクション
            </h4>

            <div className="mt-4 space-y-3">
              {summary.strategies.map((strategy) => (
                <div
                  key={strategy.id}
                  className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-sm ring-1 ring-white"
                >
                  {strategy.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
