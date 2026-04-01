import { useMemo, useState } from "react";
import MaterialsButton from "@/components/materials/MaterialsButton";
import MaterialsFilter from "@/components/materials/MaterialsFilter";
import SectionCard from "@/components/common/SectionCard";

import {
  schoolOptions,
  gradeOptions,
  subjectOptions,
  mockData,
} from "@/data/mockData";

import { materialModeOptions, initialMaterialsFilters } from "@/data/materials";

import {
  buildMaterialItems,
  filterMaterialItems,
  groupMaterialPreviewItems,
} from "@/utils/materials";

import type { ExamFilter } from "@/types/exam";
import type { MaterialType } from "@/types/materials";

export default function MaterialsPage() {
  const [materialType, setMaterialType] = useState<MaterialType>("studyPacket");

  const [filters, setFilters] = useState<ExamFilter>(initialMaterialsFilters);

  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  const materialItems = useMemo(() => buildMaterialItems(mockData), []);
  const filteredItems = useMemo(
    () => filterMaterialItems(materialItems, filters),
    [materialItems, filters],
  );

  const selectedItems = useMemo(() => {
    return materialItems.filter((item) => selectedItemIds.includes(item.id));
  }, [materialItems, selectedItemIds]);

  const previewGroups = useMemo(() => {
    return groupMaterialPreviewItems(selectedItems);
  }, [selectedItems]);

  const toggleItem = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const handleResetFilters = () => {
    setFilters(initialMaterialsFilters);
  };

  const handleSelectAllVisible = () => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      filteredItems.forEach((item) => next.add(item.id));
      return Array.from(next);
    });
  };

  const handleClearVisible = () => {
    setSelectedItemIds((prev) =>
      prev.filter((id) => !filteredItems.some((item) => item.id === id)),
    );
  };

  const removeSelectedItem = (id: string) => {
    setSelectedItemIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-500">
              ExamBoard
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              自動資料生成
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
              試験紙とプリント資料を選択して、試験対策資料を作成します。
            </p>
          </div>

          <div className="grid w-full gap-3 md:grid-cols-2 lg:max-w-2xl">
            {materialModeOptions.map((mode) => (
              <MaterialsButton
                key={mode.type}
                active={materialType === mode.type}
                title={mode.title}
                description={mode.description}
                onClick={() => setMaterialType(mode.type)}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <SectionCard
            title="設定パネル"
            action={
              <button
                type="button"
                onClick={handleResetFilters}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
              >
                リセット
              </button>
            }
          >
            <div className="space-y-4">
              <MaterialsFilter
                label="学校"
                value={filters.school}
                options={schoolOptions}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, school: value }))
                }
              />

              <MaterialsFilter
                label="学年"
                value={filters.grade}
                options={gradeOptions}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, grade: value }))
                }
              />

              <MaterialsFilter
                label="科目"
                value={filters.subject}
                options={subjectOptions}
                onChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    subject: value as ExamFilter["subject"],
                  }))
                }
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 px-5 py-5">
              <p className="text-sm font-semibold text-slate-700">
                現在選択した条件
              </p>
              <div className="mt-3 space-y-2 text-sm text-slate-500">
                <p>学校: {filters.school || "全体"}</p>
                <p>学年: {filters.grade || "全体"}</p>
                <p>科目: {filters.subject || "全体"}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    生成対象
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    試験紙とプリント資料を選択します。
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSelectAllVisible}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                  >
                    全選択
                  </button>
                  <button
                    type="button"
                    onClick={handleClearVisible}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
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
                          onChange={() => toggleItem(item.id)}
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
          </SectionCard>

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
                  disabled={selectedItemIds.length === 0}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${
                    selectedItemIds.length === 0
                      ? "bg-slate-300"
                      : "bg-slate-900"
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
                  {selectedItems.length}件
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
                  {materialType === "studyPacket"
                    ? "試験対策資料"
                    : "試験情報カレンダー"}
                </p>
              </div>
            </div>

            {selectedItems.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mx-auto max-w-md rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10">
                  <p className="text-base font-semibold text-slate-900">
                    生成対象を選択してください
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    左の設定パネルで試験紙とプリント資料を選択すると、ここで出力前のプレビューを確認できます。
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {previewGroups.map((group) => (
                  <div
                    key={group.recordId}
                    className="rounded-2xl bg-slate-50 p-5"
                  >
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
                            <p className="mt-1 text-xs text-slate-500">
                              {item.file}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeSelectedItem(item.id)}
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
        </div>
      </div>
    </div>
  );
}
