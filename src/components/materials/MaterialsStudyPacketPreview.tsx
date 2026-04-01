import SectionCard from "@/components/common/SectionCard";
import type { MaterialPreviewGroup } from "@/types/materials";

type MaterialsStudyPacketPreviewProps = {
  selectedCount: number;
  previewGroups: MaterialPreviewGroup[];
  onRemoveItem: (id: string) => void;
};

export default function MaterialsStudyPacketPreview({
  selectedCount,
  previewGroups,
  onRemoveItem,
}: MaterialsStudyPacketPreviewProps) {
  return (
    <SectionCard
      title="Preview"
      action={
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            下書き保存
          </button>
          <button
            type="button"
            disabled={selectedCount === 0}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${
              selectedCount === 0 ? "bg-slate-300" : "bg-slate-900"
            }`}
          >
            出力する
          </button>
        </div>
      }
    >
      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Selected Items
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {selectedCount}件
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Selected Exams
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {previewGroups.length}件
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Mode
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            試験対策資料
          </p>
        </div>
      </div>

      {selectedCount === 0 ? (
        <div className="py-16 text-center">
          <div className="mx-auto max-w-md rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10">
            <p className="text-base font-semibold text-slate-900">
              生成対象を選択してください
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              設定パネルで試験紙とプリント資料を選択すると、ここに出力前のプレビューが表示されます。
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {previewGroups.map((group) => (
            <div key={group.recordId} className="rounded-2xl bg-slate-50 p-5">
              <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                    {group.season}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-slate-950">
                    {group.school} · {group.grade} · {group.subject}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    試験日 {group.examDate}
                  </p>
                </div>

                <div className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                  {group.items.length}件 選択
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl bg-white px-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
                          {item.label}
                        </span>
                      </div>

                      <p className="mt-2 truncate text-sm font-semibold text-slate-900">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{item.file}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      除外
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
