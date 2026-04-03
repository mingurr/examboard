import SectionCard from "@/components/common/SectionCard";
import type { AnalysisResourceItem } from "@/types/analysis";

type AnalysisResourcePanelProps = {
  resources: AnalysisResourceItem[];
  selectedResourceIds: string[];
  onToggleResource: (resourceId: string) => void;
  onCreatePacket: () => void;
};

const badgeStyleMap: Record<string, string> = {
  推薦: "bg-orange-100 text-orange-600",
  学習: "bg-emerald-100 text-emerald-600",
  戦略: "bg-violet-100 text-violet-600",
};

export default function AnalysisResourcePanel({
  resources,
  selectedResourceIds,
  onToggleResource,
  onCreatePacket,
}: AnalysisResourcePanelProps) {
  return (
    <SectionCard>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">
            関連資料および次シーズン戦略
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            推薦資料を選択し、資料集としてまとめることができます。
          </p>
        </div>

        <button
          type="button"
          onClick={onCreatePacket}
          className="rounded-2xl bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5"
        >
          資料生成
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {resources.map((resource) => {
          const isSelected = selectedResourceIds.includes(resource.id);

          return (
            <label
              key={resource.id}
              className={`flex cursor-pointer items-start gap-4 rounded-2xl px-4 py-4 ring-1 transition ${
                isSelected
                  ? "bg-violet-50 ring-violet-200"
                  : "bg-slate-50 ring-slate-200 hover:bg-white hover:shadow-sm"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleResource(resource.id)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                      badgeStyleMap[resource.badge] ??
                      "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {resource.badge}
                  </span>

                  <h4 className="text-sm font-semibold text-slate-900">
                    {resource.title}
                  </h4>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {resource.description}
                </p>
              </div>

              <div className="flex gap-2">
                <div className="h-10 w-8 rounded-lg bg-rose-100" />
                <div className="h-10 w-8 rounded-lg bg-emerald-100" />
                <div className="h-10 w-8 rounded-lg bg-slate-200" />
              </div>
            </label>
          );
        })}
      </div>
    </SectionCard>
  );
}
