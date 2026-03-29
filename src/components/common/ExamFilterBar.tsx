import type { ReactNode } from "react";
import SelectField from "@/components/common/SelectField";
import type { ExamFilter } from "@/types/exam";

type OptionItem = {
  label: string;
  value: string;
};

type ExamFilterBarProps = {
  filters: ExamFilter;
  onChange: (key: keyof ExamFilter, value: string) => void;

  seasonOptions: OptionItem[];
  schoolOptions: OptionItem[];
  gradeOptions: OptionItem[];
  subjectOptions: OptionItem[];

  seasonPlaceholder?: string;
  schoolPlaceholder?: string;
  gradePlaceholder?: string;
  subjectPlaceholder?: string;

  actionLabel: string;
  onAction: () => void;

  seasonActionSlot?: ReactNode;
};

export default function ExamFilterBar({
  filters,
  onChange,
  seasonOptions,
  schoolOptions,
  gradeOptions,
  subjectOptions,
  seasonPlaceholder = "シーズンを選択",
  schoolPlaceholder = "学校を選択",
  gradePlaceholder = "学年を選択",
  subjectPlaceholder = "科目を選択",
  actionLabel,
  onAction,
  seasonActionSlot,
}: ExamFilterBarProps) {
  return (
    <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_0.8fr_0.8fr_auto]">
      <div className="flex gap-2">
        <div className="flex-1">
          <SelectField
            value={filters.season}
            onChange={(e) => onChange("season", e.target.value)}
            placeholder={seasonPlaceholder}
            options={seasonOptions}
          />
        </div>

        {seasonActionSlot}
      </div>

      <SelectField
        value={filters.school}
        onChange={(e) => onChange("school", e.target.value)}
        placeholder={schoolPlaceholder}
        options={schoolOptions}
      />

      <SelectField
        value={filters.grade}
        onChange={(e) => onChange("grade", e.target.value)}
        placeholder={gradePlaceholder}
        options={gradeOptions}
      />

      <SelectField
        value={filters.subject}
        onChange={(e) => onChange("subject", e.target.value)}
        placeholder={subjectPlaceholder}
        options={subjectOptions}
      />

      <button
        onClick={onAction}
        className="rounded-2xl bg-slate-900 px-5 py-3.5 text-base font-semibold text-white"
      >
        {actionLabel}
      </button>
    </div>
  );
}
