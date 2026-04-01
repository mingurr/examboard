import type { MaterialItem } from "@/types/materials";

type MaterialsSelectionListProps = {
  filteredItems: MaterialItem[];
  selectedItemIds: string[];
  onSelectAllVisible: () => void;
  onClearVisible: () => void;
  onToggleItem: (id: string) => void;
};

export default function MaterialsSelectionList({
  filteredItems,
  selectedItemIds,
  onSelectAllVisible,
  onClearVisible,
  onToggleItem,
}: MaterialsSelectionListProps) {
  return (
    <div className="mt-6 rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">生成対象</p>
          <p className="mt-1 text-xs text-slate-500">
            試験紙とプリント資料を選択します。
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSelectAllVisible}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
          >
            全選択
          </button>
          <button
            type="button"
            onClick={onClearVisible}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
          >
            解除
          </button>
        </div>
      </div>

      <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto pr-1">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const checked = selectedItemIds.includes(item.id);

            return (
              <label
                key={item.id}
                className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition ${
                  checked
                    ? "border-violet-400 bg-violet-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleItem(item.id)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-600"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                      {item.season}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-violet-700 ring-1 ring-violet-200">
                      {item.label}
                    </span>
                  </div>

                  <p className="mt-3 truncate text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.school} · {item.grade} · {item.subject}
                  </p>
                </div>
              </label>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
            条件に合う資料がありません。
          </div>
        )}
      </div>
    </div>
  );
}
