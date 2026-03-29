import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

type CreateSeasonPayload = {
  year: string;
  term: string;
  examType: string;
  seasonLabel: string;
  selectedSchools: string[];
};

type CreateSeasonModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: CreateSeasonPayload) => void;
  schoolOptions: Option[];
};

const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const start = currentYear - 1;
  const end = currentYear + 3;

  return Array.from({ length: end - start + 1 }, (_, i) => {
    const year = start + i;
    return {
      label: `${year}年`,
      value: `${year}年`,
    };
  });
};

const yearOptions = getYearOptions();

const termOptions = [
  { label: "1学期", value: "1学期" },
  { label: "2学期", value: "2学期" },
];

const examTypeOptions = [
  { label: "中間試験", value: "中間試験" },
  { label: "期末試験", value: "期末試験" },
];

export default function CreateSeasonModal({
  open,
  onClose,
  onCreate,
  schoolOptions,
}: CreateSeasonModalProps) {
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [examType, setExamType] = useState("");
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);

  const resetForm = () => {
    setYear("");
    setTerm("");
    setExamType("");
    setSelectedSchools([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSchoolToggle = (value: string) => {
    setSelectedSchools((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleCreate = () => {
    if (!year || !term || !examType || selectedSchools.length === 0) return;

    const seasonLabel = `${year} ${term} ${examType}`;

    onCreate({
      year,
      term,
      examType,
      seasonLabel,
      selectedSchools,
    });

    handleClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">新規シーズン登録</h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl px-3 py-2 text-sm font-medium text-slate-500"
          >
            閉じる
          </button>
        </div>

        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-500">年度</p>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-base"
              >
                <option value="">選択してください</option>
                {yearOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-500">学期</p>
              <select
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-base"
              >
                <option value="">選択してください</option>
                {termOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-500">
                試験種類
              </p>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-base"
              >
                <option value="">選択してください</option>
                {examTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-slate-500">
              学校選択
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              {schoolOptions.map((school) => {
                const checked = selectedSchools.includes(school.value);

                return (
                  <label
                    key={school.value}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleSchoolToggle(school.value)}
                      className="h-4 w-4"
                    />
                    <span className="text-base text-slate-800">
                      {school.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-2xl border border-slate-300 px-4 py-2.5 text-base font-semibold text-slate-700"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={handleCreate}
            className="rounded-2xl bg-slate-900 px-4 py-2.5 text-base font-semibold text-white"
          >
            登録
          </button>
        </div>
      </div>
    </div>
  );
}
