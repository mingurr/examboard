import SectionCard from "@/components/common/SectionCard";
import MaterialsFilter from "@/components/materials/MaterialsFilter";
import MaterialsSelectionList from "@/components/materials/MaterialsSelectionList";
import type { ExamFilter } from "@/types/exam";
import type { MaterialItem, MaterialType } from "@/types/materials";

type Option = {
  label: string;
  value: string;
};

type MaterialsSidebarProps = {
  materialType: MaterialType;
  filters: ExamFilter;
  schoolOptions: Option[];
  gradeOptions: Option[];
  subjectOptions: Option[];
  filteredItems: MaterialItem[];
  selectedItemIds: string[];
  onChangeSchool: (value: string) => void;
  onChangeGrade: (value: string) => void;
  onChangeSubject: (value: string) => void;
  onReset: () => void;
  onSelectAllVisible: () => void;
  onClearVisible: () => void;
  onToggleItem: (id: string) => void;
};

export default function MaterialsSidebar({
  materialType,
  filters,
  schoolOptions,
  gradeOptions,
  subjectOptions,
  filteredItems,
  selectedItemIds,
  onChangeSchool,
  onChangeGrade,
  onChangeSubject,
  onReset,
  onSelectAllVisible,
  onClearVisible,
  onToggleItem,
}: MaterialsSidebarProps) {
  return (
    <SectionCard
      title={materialType === "studyPacket" ? "設定パネル" : "カレンダー条件"}
      action={
        <button
          type="button"
          onClick={onReset}
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
          onChange={onChangeSchool}
        />

        <MaterialsFilter
          label="学年"
          value={filters.grade}
          options={gradeOptions}
          onChange={onChangeGrade}
        />

        <MaterialsFilter
          label="科目"
          value={filters.subject}
          options={subjectOptions}
          onChange={onChangeSubject}
        />
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 px-5 py-5">
        <p className="text-sm font-semibold text-slate-700">選択条件</p>
        <div className="mt-3 space-y-2 text-sm text-slate-500">
          <p>学校: {filters.school || "All"}</p>
          <p>学年: {filters.grade || "All"}</p>
          <p>科目: {filters.subject || "All"}</p>
        </div>
      </div>

      {materialType === "studyPacket" ? (
        <MaterialsSelectionList
          filteredItems={filteredItems}
          selectedItemIds={selectedItemIds}
          onSelectAllVisible={onSelectAllVisible}
          onClearVisible={onClearVisible}
          onToggleItem={onToggleItem}
        />
      ) : (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">表示条件</p>
          <p className="mt-1 text-xs text-slate-500">
            登録された学校の試験日程を一つのカレンダーで確認します。
          </p>
        </div>
      )}
    </SectionCard>
  );
}
