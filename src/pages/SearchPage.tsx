import { useState } from "react";
import SectionCard from "@/components/common/SectionCard";
import Field from "@/components/common/Field";
import SelectField from "@/components/common/SelectField";
import FileBox from "@/components/common/FileBox";
import {
  seasonOptions,
  schoolOptions,
  gradeOptions,
  subjectOptions,
  publisherOptions,
  bookUnitOptions,
  subUnitOptions,
  printTypeOptions,
  mockData,
  emptyRecord,
} from "@/data/mockData";
import type { ExamRecord, SearchFilters } from "@/types/exam";
import CreateSeasonModal from "@/components/season/CreatSeasonModal";
import ExamFilterBar from "@/components/common/ExamFilterBar";

type SeasonOption = {
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

export default function SearchPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    season: "",
    school: "",
    grade: "",
    subject: "",
  });

  const [seasonOptionList, setSeasonOptionList] =
    useState<SeasonOption[]>(seasonOptions);
  const [isSeasonModalOpen, setIsSeasonModalOpen] = useState(false);

  const [examRecords, setExamRecords] = useState<ExamRecord[]>(mockData);
  const [currentRecord, setCurrentRecord] = useState<ExamRecord>(emptyRecord);
  const [draftRecord, setDraftRecord] = useState<ExamRecord>(emptyRecord);
  const [isEditing, setIsEditing] = useState(false);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    if (
      !filters.season ||
      !filters.school ||
      !filters.grade ||
      !filters.subject
    ) {
      setCurrentRecord(emptyRecord);
      setDraftRecord(emptyRecord);
      setIsEditing(false);
      return;
    }

    const found = examRecords.find(
      (record) =>
        record.season === filters.season &&
        record.school === filters.school &&
        record.grade === filters.grade &&
        record.subject === filters.subject,
    );

    const newRecord: ExamRecord = {
      ...emptyRecord,
      id: `${filters.season}-${filters.school}-${filters.grade}-${filters.subject}`,
      season: filters.season,
      school: filters.school,
      grade: filters.grade,
      subject: filters.subject,
    };

    const nextRecord = found || newRecord;

    setCurrentRecord(nextRecord);
    setDraftRecord(nextRecord);
    setIsEditing(false);
  };

  const handleEditStart = () => {
    setDraftRecord(currentRecord);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setDraftRecord(currentRecord);
    setIsEditing(false);
  };

  const handleEditSave = () => {
    const exists = examRecords.some((record) => record.id === draftRecord.id);

    if (exists) {
      setExamRecords((prev) =>
        prev.map((record) =>
          record.id === draftRecord.id ? draftRecord : record,
        ),
      );
    } else {
      setExamRecords((prev) => [...prev, draftRecord]);
    }

    setCurrentRecord(draftRecord);
    setIsEditing(false);
  };

  const handleDraftChange = (key: keyof ExamRecord, value: string) => {
    setDraftRecord((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDownload = (fileName: string) => {
    if (!fileName) return;

    const blob = new Blob([`${fileName} ダウンロード`], {
      type: "text/plain",
    });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    window.URL.revokeObjectURL(url);
  };

  const handleCreateSeason = ({ seasonLabel }: CreateSeasonPayload) => {
    const exists = seasonOptionList.some(
      (option) => option.value === seasonLabel,
    );

    if (!exists) {
      setSeasonOptionList((prev) => [
        ...prev,
        { label: seasonLabel, value: seasonLabel },
      ]);
    }

    setFilters((prev) => ({
      ...prev,
      season: seasonLabel,
    }));

    setIsSeasonModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <SectionCard title="試験検索">
        <ExamFilterBar
          filters={filters}
          onChange={handleFilterChange}
          seasonOptions={seasonOptionList}
          schoolOptions={schoolOptions}
          gradeOptions={gradeOptions}
          subjectOptions={subjectOptions}
          actionLabel="検索"
          onAction={handleSearch}
          seasonActionSlot={
            <button
              onClick={() => setIsSeasonModalOpen(true)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base font-semibold text-slate-700"
            >
              + 新規シーズン
            </button>
          }
        />
      </SectionCard>

      <SectionCard
        title="試験情報"
        action={
          !isEditing &&
          currentRecord.id && (
            <button
              onClick={handleEditStart}
              className="rounded-2xl bg-violet-600 px-4 py-2.5 text-base font-semibold text-white"
            >
              編集する
            </button>
          )
        }
      >
        {!isEditing ? (
          currentRecord.id ? (
            <div className="space-y-5">
              <Field label="試験日" value={currentRecord.examDate} />

              <div>
                <Field label="教科書名" value={currentRecord.bookName} />
                <Field label="出版社" value={currentRecord.bookPublisher} />
                <Field
                  label="単元"
                  value={`${currentRecord.bookUnitFrom} から ${currentRecord.bookUnitTo} まで`}
                />
              </div>

              <div>
                <Field label="副教材名" value={currentRecord.subName} />
                <Field label="出版社" value={currentRecord.subPublisher} />
                <Field
                  label="単元"
                  value={`${currentRecord.subUnitFrom} から ${currentRecord.subUnitTo} まで`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="プリント1" value={currentRecord.print1Name} />
                <FileBox
                  fileName={currentRecord.print1File}
                  onDownload={() => handleDownload(currentRecord.print1File)}
                />

                <Field label="プリント2" value={currentRecord.print2Name} />
                <FileBox
                  fileName={currentRecord.print2File}
                  onDownload={() => handleDownload(currentRecord.print2File)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="実際試験紙" value={currentRecord.examPaperName} />
                <FileBox
                  fileName={currentRecord.examPaperFile}
                  onDownload={() => handleDownload(currentRecord.examPaperFile)}
                />

                <Field
                  label="解答・解説"
                  value={currentRecord.answerSheetName}
                />
                <FileBox
                  fileName={currentRecord.answerSheetFile}
                  onDownload={() =>
                    handleDownload(currentRecord.answerSheetFile)
                  }
                />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-10 text-center text-slate-500">
              検索条件を選択してください。
            </div>
          )
        ) : (
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-500">
                試験日
              </p>
              <input
                type="date"
                value={draftRecord.examDate}
                onChange={(e) => handleDraftChange("examDate", e.target.value)}
                className="w-1/2 rounded-2xl border border-slate-200 px-4 py-3.5 text-base"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-500">
                教科書名
              </p>
              <input
                value={draftRecord.bookName}
                onChange={(e) => handleDraftChange("bookName", e.target.value)}
                className="w-1/2 rounded-2xl border border-slate-200 px-4 py-3.5 text-base"
              />
            </div>

            <div className="w-1/2">
              <p className="mb-2 text-sm font-semibold text-slate-500">
                出版社
              </p>
              <SelectField
                value={draftRecord.bookPublisher}
                onChange={(e) =>
                  handleDraftChange("bookPublisher", e.target.value)
                }
                options={publisherOptions}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-500">
                  教科書 from
                </p>
                <SelectField
                  value={draftRecord.bookUnitFrom}
                  onChange={(e) =>
                    handleDraftChange("bookUnitFrom", e.target.value)
                  }
                  options={bookUnitOptions}
                />
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-500">
                  教科書 to
                </p>
                <SelectField
                  value={draftRecord.bookUnitTo}
                  onChange={(e) =>
                    handleDraftChange("bookUnitTo", e.target.value)
                  }
                  options={bookUnitOptions}
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-500">
                副教材名
              </p>
              <input
                value={draftRecord.subName}
                onChange={(e) => handleDraftChange("subName", e.target.value)}
                className="w-1/2 rounded-2xl border border-slate-200 px-4 py-3.5 text-base"
              />
            </div>

            <div className="w-1/2">
              <p className="mb-2 text-sm font-semibold text-slate-500">
                副教材 出版社
              </p>
              <SelectField
                value={draftRecord.subPublisher}
                onChange={(e) =>
                  handleDraftChange("subPublisher", e.target.value)
                }
                options={publisherOptions}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-500">
                  副教材 from
                </p>
                <SelectField
                  value={draftRecord.subUnitFrom}
                  onChange={(e) =>
                    handleDraftChange("subUnitFrom", e.target.value)
                  }
                  options={subUnitOptions}
                />
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-500">
                  副教材 to
                </p>
                <SelectField
                  value={draftRecord.subUnitTo}
                  onChange={(e) =>
                    handleDraftChange("subUnitTo", e.target.value)
                  }
                  options={subUnitOptions}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="mb-3 text-sm font-semibold text-slate-500">
                プリント1
              </p>
              <div className="grid gap-3 md:grid-cols-[140px_1fr_1fr]">
                <SelectField
                  value={draftRecord.print1Type}
                  onChange={(e) =>
                    handleDraftChange("print1Type", e.target.value)
                  }
                  options={printTypeOptions}
                />

                <input
                  value={draftRecord.print1Name}
                  onChange={(e) =>
                    handleDraftChange("print1Name", e.target.value)
                  }
                  placeholder="プリント名"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-base"
                />

                <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 px-4 py-3.5 text-base font-medium text-slate-600">
                  ファイルを選択
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleDraftChange(
                        "print1File",
                        e.target.files?.[0]?.name || "",
                      )
                    }
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="mb-3 text-sm font-semibold text-slate-500">
                プリント2
              </p>
              <div className="grid gap-3 md:grid-cols-[140px_1fr_1fr]">
                <SelectField
                  value={draftRecord.print2Type}
                  onChange={(e) =>
                    handleDraftChange("print2Type", e.target.value)
                  }
                  options={printTypeOptions}
                />

                <input
                  value={draftRecord.print2Name}
                  onChange={(e) =>
                    handleDraftChange("print2Name", e.target.value)
                  }
                  placeholder="プリント名"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-base"
                />

                <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 px-4 py-3.5 text-base font-medium text-slate-600">
                  ファイルを選択
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleDraftChange(
                        "print2File",
                        e.target.files?.[0]?.name || "",
                      )
                    }
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="mb-3 text-sm font-semibold text-slate-500">
                実際試験紙
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  value={draftRecord.examPaperName}
                  onChange={(e) =>
                    handleDraftChange("examPaperName", e.target.value)
                  }
                  placeholder="試験紙名"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-base"
                />

                <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 px-4 py-3.5 text-base font-medium text-slate-600">
                  ファイルを選択
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleDraftChange(
                        "examPaperFile",
                        e.target.files?.[0]?.name || "",
                      )
                    }
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="mb-3 text-sm font-semibold text-slate-500">
                解答・解説
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  value={draftRecord.answerSheetName}
                  onChange={(e) =>
                    handleDraftChange("answerSheetName", e.target.value)
                  }
                  placeholder="解答・解説名"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-base"
                />

                <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 px-4 py-3.5 text-base font-medium text-slate-600">
                  ファイルを選択
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleDraftChange(
                        "answerSheetFile",
                        e.target.files?.[0]?.name || "",
                      )
                    }
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleEditCancel}
                className="rounded-2xl border border-slate-300 px-4 py-2.5 text-base font-semibold text-slate-700"
              >
                キャンセル
              </button>
              <button
                onClick={handleEditSave}
                className="rounded-2xl bg-slate-900 px-4 py-2.5 text-base font-semibold text-white"
              >
                保存
              </button>
            </div>
          </div>
        )}
      </SectionCard>

      <CreateSeasonModal
        open={isSeasonModalOpen}
        onClose={() => setIsSeasonModalOpen(false)}
        onCreate={handleCreateSeason}
        schoolOptions={schoolOptions}
      />
    </div>
  );
}
