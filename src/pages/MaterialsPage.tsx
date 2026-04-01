import { useMemo, useState } from "react";
import MaterialsModeSwitcher from "@/components/materials/MaterialsModeSwitcher";
import MaterialsSidebar from "@/components/materials/MaterialsSidebar";
import MaterialsStudyPacketPreview from "@/components/materials/MaterialsStudyPacketPreview";
import MaterialsCalendarPreview from "@/components/materials/MaterialsCalendarPreview";

import {
  schoolOptions,
  gradeOptions,
  subjectOptions,
  mockData,
} from "@/data/mockData";

import { initialMaterialsFilters } from "@/data/materials";

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

  const filteredItems = useMemo(() => {
    return filterMaterialItems(materialItems, filters);
  }, [materialItems, filters]);

  const selectedItems = useMemo(() => {
    return materialItems.filter((item) => selectedItemIds.includes(item.id));
  }, [materialItems, selectedItemIds]);

  const previewGroups = useMemo(() => {
    return groupMaterialPreviewItems(selectedItems);
  }, [selectedItems]);

  const calendarEvents = useMemo(() => {
    return mockData.filter((record) => {
      if (filters.school && record.school !== filters.school) return false;
      if (filters.grade && record.grade !== filters.grade) return false;
      if (filters.subject && record.subject !== filters.subject) return false;
      return true;
    });
  }, [filters]);

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

  const handleToggleItem = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  };

  const handleRemoveSelectedItem = (id: string) => {
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

          <MaterialsModeSwitcher
            materialType={materialType}
            onChangeMode={setMaterialType}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <MaterialsSidebar
            materialType={materialType}
            filters={filters}
            schoolOptions={schoolOptions}
            gradeOptions={gradeOptions}
            subjectOptions={subjectOptions}
            filteredItems={filteredItems}
            selectedItemIds={selectedItemIds}
            onChangeSchool={(value) =>
              setFilters((prev) => ({
                ...prev,
                school: value,
              }))
            }
            onChangeGrade={(value) =>
              setFilters((prev) => ({
                ...prev,
                grade: value,
              }))
            }
            onChangeSubject={(value) =>
              setFilters((prev) => ({
                ...prev,
                subject: value as ExamFilter["subject"],
              }))
            }
            onReset={handleResetFilters}
            onSelectAllVisible={handleSelectAllVisible}
            onClearVisible={handleClearVisible}
            onToggleItem={handleToggleItem}
          />

          {materialType === "studyPacket" ? (
            <MaterialsStudyPacketPreview
              selectedCount={selectedItems.length}
              previewGroups={previewGroups}
              onRemoveItem={handleRemoveSelectedItem}
            />
          ) : (
            <MaterialsCalendarPreview calendarEvents={calendarEvents} />
          )}
        </div>
      </div>
    </div>
  );
}
