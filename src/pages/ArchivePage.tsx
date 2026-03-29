import { useMemo, useState } from "react";
import SectionCard from "@/components/common/SectionCard";
import ExamFilterBar from "@/components/common/ExamFilterBar";
import { downloadFile } from "@/utils/downloadFile";
import {
  seasonOptions,
  schoolOptions,
  gradeOptions,
  subjectOptions,
  mockData,
} from "@/data/mockData";
import type { ExamFilter, ExamRecord } from "@/types/exam";

export default function ArchivePage() {
  const [archiveFilters, setArchiveFilters] = useState<ExamFilter>({
    season: "",
    school: "",
    grade: "",
    subject: "",
  });

  const [openRecordId, setOpenRecordId] = useState<string | null>(null);

  const handleArchiveFilterChange = (key: keyof ExamFilter, value: string) => {
    setArchiveFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetArchiveFilters = () => {
    setArchiveFilters({
      season: "",
      school: "",
      grade: "",
      subject: "",
    });
    setOpenRecordId(null);
  };

  const toggleRecordOpen = (id: string) => {
    setOpenRecordId((prev) => (prev === id ? null : id));
  };

  const matchesArchiveFilter = (record: ExamRecord, filters: ExamFilter) => {
    return (
      (!filters.season || record.season === filters.season) &&
      (!filters.school || record.school === filters.school) &&
      (!filters.grade || record.grade === filters.grade) &&
      (!filters.subject || record.subject === filters.subject)
    );
  };

  const filteredArchiveRecords = useMemo(() => {
    return mockData.filter((record) =>
      matchesArchiveFilter(record, archiveFilters),
    );
  }, [archiveFilters]);

  return (
    <div className="space-y-6">
      <SectionCard title="アーカイブ検索">
        <ExamFilterBar
          filters={archiveFilters}
          onChange={handleArchiveFilterChange}
          seasonOptions={seasonOptions}
          schoolOptions={schoolOptions}
          gradeOptions={gradeOptions}
          subjectOptions={subjectOptions}
          actionLabel="リセット"
          onAction={handleResetArchiveFilters}
        />
      </SectionCard>

      <SectionCard title="検索結果">
        {filteredArchiveRecords.length > 0 ? (
          <div className="rounded-3xl bg-slate-100 p-6">
            <ul className="space-y-4">
              {filteredArchiveRecords.map((record) => {
                const isOpen = openRecordId === record.id;

                const attachmentFiles = [
                  record.print1File,
                  record.print2File,
                  record.examPaperFile,
                  record.answerSheetFile,
                ].filter(Boolean);

                return (
                  <li
                    key={record.id}
                    className="overflow-hidden rounded-3xl border border-slate-300 bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => toggleRecordOpen(record.id)}
                      className="flex w-full items-center justify-between px-8 py-6 text-left"
                    >
                      <span className="flex items-center gap-4">
                        <span className="rounded-full bg-sky-100 px-6 py-2 text-base font-medium text-slate-700">
                          {record.season}
                        </span>
                        <span className="text-base text-slate-500">
                          {record.examDate || "-"}
                        </span>
                      </span>

                      <span className="flex items-center gap-6">
                        <span className="rounded-full bg-stone-100 px-5 py-2 text-base font-medium text-slate-700">
                          添付 {attachmentFiles.length}件
                        </span>
                        <span
                          className={`text-lg text-slate-700 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          ⌃
                        </span>
                      </span>
                    </button>

                    {isOpen && (
                      <section className="grid gap-8 border-t border-slate-300 px-8 py-8 md:grid-cols-[1.1fr_0.9fr]">
                        <dl className="grid gap-y-3 text-sm text-slate-700">
                          <div className="grid grid-cols-[80px_1fr] gap-2">
                            <dt className="text-slate-400">試験日</dt>
                            <dd>{record.examDate || "-"}</dd>
                          </div>
                          <div className="grid grid-cols-[80px_1fr] gap-2">
                            <dt className="text-slate-400">学校</dt>
                            <dd>{record.school}</dd>
                          </div>
                          <div className="grid grid-cols-[80px_1fr] gap-2">
                            <dt className="text-slate-400">学年</dt>
                            <dd>{record.grade}</dd>
                          </div>
                          <div className="grid grid-cols-[80px_1fr] gap-2">
                            <dt className="text-slate-400">科目</dt>
                            <dd>{record.subject}</dd>
                          </div>
                          <div className="grid grid-cols-[80px_1fr] gap-2">
                            <dt className="text-slate-400">教科書</dt>
                            <dd>{record.bookName || "-"}</dd>
                          </div>
                          <div className="grid grid-cols-[80px_1fr] gap-2">
                            <dt className="text-slate-400">出版社</dt>
                            <dd>{record.bookPublisher || "-"}</dd>
                          </div>
                          <div className="grid grid-cols-[80px_1fr] gap-2">
                            <dt className="text-slate-400">単元</dt>
                            <dd>
                              {record.bookUnitFrom && record.bookUnitTo
                                ? `${record.bookUnitFrom} から ${record.bookUnitTo} まで`
                                : "-"}
                            </dd>
                          </div>
                          <div className="grid grid-cols-[80px_1fr] gap-2">
                            <dt className="text-slate-400">副教材</dt>
                            <dd>{record.subName || "-"}</dd>
                          </div>
                          <div className="grid grid-cols-[80px_1fr] gap-2">
                            <dt className="text-slate-400">範囲</dt>
                            <dd>
                              {record.subUnitFrom && record.subUnitTo
                                ? `${record.subUnitFrom} から ${record.subUnitTo} まで`
                                : "-"}
                            </dd>
                          </div>
                        </dl>

                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-slate-400">
                            プリント・添付ファイル
                          </p>

                          {attachmentFiles.length > 0 ? (
                            attachmentFiles.map((fileName) => (
                              <button
                                key={fileName}
                                type="button"
                                onClick={() => downloadFile(fileName)}
                                className="flex w-full items-center justify-between rounded-2xl bg-stone-100 px-5 py-3 text-sm font-medium text-slate-700"
                              >
                                <span>{fileName}</span>
                                <span>↓</span>
                              </button>
                            ))
                          ) : (
                            <p className="text-sm text-slate-400">
                              添付ファイルがありません。
                            </p>
                          )}
                        </div>
                      </section>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-10 text-center text-slate-500">
            条件に一致するアーカイブデータがありません。
          </div>
        )}
      </SectionCard>
    </div>
  );
}
