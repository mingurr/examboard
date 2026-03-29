import { useState } from "react";
import SectionCard from "@/components/common/SectionCard";

type SchoolItem = {
  id: string;
  name: string;
};

type SchoolInputError = "empty" | "duplicate" | null;

const initialSchools: SchoolItem[] = [
  { id: "s1", name: "釜山女子中学校" },
  { id: "s2", name: "光星中学校" },
  { id: "s3", name: "明星高等学校" },
  { id: "s4", name: "銀河女子中学校" },
];

function getSchoolErrorMessage(error: SchoolInputError) {
  if (error === "empty") return "学校名を正確に入力してください。";
  if (error === "duplicate") return "すでに登録されている学校名です。";
  return "";
}

export default function SettingsPage() {
  const [schools, setSchools] = useState<SchoolItem[]>(initialSchools);
  const [newSchoolName, setNewSchoolName] = useState("");
  const [addSchoolError, setAddSchoolError] = useState<SchoolInputError>(null);

  const [editingSchoolId, setEditingSchoolId] = useState<string | null>(null);
  const [editingSchoolName, setEditingSchoolName] = useState("");
  const [editSchoolError, setEditSchoolError] =
    useState<SchoolInputError>(null);

  const isEditingSchool = editingSchoolId !== null;

  const handleAddSchool = () => {
    const trimmed = newSchoolName.trim();

    if (!trimmed) {
      setAddSchoolError("empty");
      return;
    }

    const exists = schools.some((item) => item.name === trimmed);
    if (exists) {
      setAddSchoolError("duplicate");
      return;
    }

    setSchools((prev) => [
      ...prev,
      { id: `school-${Date.now()}`, name: trimmed },
    ]);
    setNewSchoolName("");
    setAddSchoolError(null);
  };

  const handleStartEditSchool = (schoolId: string) => {
    const target = schools.find((item) => item.id === schoolId);
    if (!target) return;

    setEditingSchoolId(target.id);
    setEditingSchoolName(target.name);
    setEditSchoolError(null);
  };

  const handleChangeEditingSchoolName = (value: string) => {
    setEditingSchoolName(value);
    setEditSchoolError(null);
  };

  const handleSaveEditSchool = () => {
    if (!editingSchoolId) return;

    const trimmed = editingSchoolName.trim();

    if (!trimmed) {
      setEditSchoolError("empty");
      return;
    }

    const exists = schools.some(
      (item) => item.id !== editingSchoolId && item.name === trimmed,
    );

    if (exists) {
      setEditSchoolError("duplicate");
      return;
    }

    setSchools((prev) =>
      prev.map((item) =>
        item.id === editingSchoolId ? { ...item, name: trimmed } : item,
      ),
    );

    setEditingSchoolId(null);
    setEditingSchoolName("");
    setEditSchoolError(null);
  };

  const handleCancelEditSchool = () => {
    setEditingSchoolId(null);
    setEditingSchoolName("");
    setEditSchoolError(null);
  };

  const handleDeleteSchool = (schoolId: string) => {
    setSchools((prev) => prev.filter((item) => item.id !== schoolId));
    setAddSchoolError(null);
    setEditSchoolError(null);
  };

  return (
    <div className="space-y-6">
      <SectionCard title="設定">
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-2 flex gap-3">
              <input
                value={newSchoolName}
                onChange={(e) => {
                  setNewSchoolName(e.target.value);
                  setAddSchoolError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isEditingSchool) {
                    handleAddSchool();
                  }
                }}
                disabled={isEditingSchool}
                placeholder="学校名入力"
                className={`flex-1 rounded-2xl border px-4 py-3.5 text-base outline-none transition disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${
                  addSchoolError
                    ? "border-rose-400 bg-rose-50 text-slate-900"
                    : "border-slate-200 bg-white text-slate-900"
                }`}
              />

              <button
                onClick={handleAddSchool}
                disabled={isEditingSchool}
                className="rounded-2xl bg-slate-900 px-5 py-3.5 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                + 追加
              </button>
            </div>

            {addSchoolError && (
              <p className="mb-4 pl-1 text-sm font-medium text-rose-500">
                {getSchoolErrorMessage(addSchoolError)}
              </p>
            )}

            <div className="space-y-3">
              {schools.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-10 text-center text-slate-500">
                  登録された学校がありません。
                </div>
              ) : (
                schools.map((school) => {
                  const isCurrentEditingRow = editingSchoolId === school.id;
                  const isOtherRowDisabled =
                    isEditingSchool && editingSchoolId !== school.id;

                  if (isCurrentEditingRow) {
                    return (
                      <div key={school.id}>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3.5 text-base">
                          <input
                            value={editingSchoolName}
                            onChange={(e) =>
                              handleChangeEditingSchoolName(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleSaveEditSchool();
                              }
                              if (e.key === "Escape") {
                                handleCancelEditSchool();
                              }
                            }}
                            autoFocus
                            className={`flex-1 rounded-2xl border px-4 py-3.5 text-base outline-none transition ${
                              editSchoolError
                                ? "border-rose-400 bg-rose-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-900"
                            }`}
                          />

                          <div className="flex gap-3">
                            <button
                              onClick={handleCancelEditSchool}
                              className="rounded-2xl border border-slate-300 px-4 py-2.5 text-base font-semibold text-slate-700"
                            >
                              キャンセル
                            </button>
                            <button
                              onClick={handleSaveEditSchool}
                              className="rounded-2xl bg-slate-900 px-4 py-2.5 text-base font-semibold text-white"
                            >
                              保存
                            </button>
                          </div>
                        </div>

                        {editSchoolError && (
                          <p className="mt-2 pl-1 text-sm font-medium text-rose-500">
                            {getSchoolErrorMessage(editSchoolError)}
                          </p>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={school.id}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3.5 text-base"
                    >
                      <span className="font-medium text-slate-900">
                        {school.name}
                      </span>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleStartEditSchool(school.id)}
                          disabled={isOtherRowDisabled}
                          className="rounded-2xl border border-slate-300 px-4 py-2.5 text-base font-semibold text-slate-700 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
                        >
                          編集
                        </button>
                        <button
                          onClick={() => handleDeleteSchool(school.id)}
                          disabled={isOtherRowDisabled}
                          className="rounded-2xl border border-slate-300 px-4 py-2.5 text-base font-semibold text-rose-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="mb-3 text-sm font-semibold text-slate-500">
              固定科目
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base">
                <span>英語</span>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  固定
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base">
                <span>数学</span>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  固定
                </span>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
