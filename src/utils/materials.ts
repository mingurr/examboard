import type { ExamRecord, ExamFilter } from "@/types/exam";
import type { MaterialItem, MaterialPreviewGroup } from "@/types/materials";

export function buildMaterialItems(records: ExamRecord[]): MaterialItem[] {
  return records.flatMap((record) => {
    const items: MaterialItem[] = [
      {
        id: `${record.id}-exam`,
        recordId: record.id,
        season: record.season,
        school: record.school,
        grade: record.grade,
        subject: record.subject,
        examDate: record.examDate,
        type: "examPaper",
        label: "試験紙",
        name: record.examPaperName,
        file: record.examPaperFile,
      },
      {
        id: `${record.id}-p1`,
        recordId: record.id,
        season: record.season,
        school: record.school,
        grade: record.grade,
        subject: record.subject,
        examDate: record.examDate,
        type: "print1",
        label: record.print1Type,
        name: record.print1Name,
        file: record.print1File,
      },
    ];

    if (record.print2Name || record.print2File) {
      items.push({
        id: `${record.id}-p2`,
        recordId: record.id,
        season: record.season,
        school: record.school,
        grade: record.grade,
        subject: record.subject,
        examDate: record.examDate,
        type: "print2",
        label: record.print2Type,
        name: record.print2Name,
        file: record.print2File,
      });
    }

    return items;
  });
}

export function filterMaterialItems(
  items: MaterialItem[],
  filters: ExamFilter,
): MaterialItem[] {
  return items.filter((item) => {
    if (filters.school && item.school !== filters.school) return false;
    if (filters.grade && item.grade !== filters.grade) return false;
    if (filters.subject && item.subject !== filters.subject) return false;
    return true;
  });
}
export function groupMaterialPreviewItems(
  items: MaterialItem[],
): MaterialPreviewGroup[] {
  const map = new Map<string, MaterialPreviewGroup>();

  items.forEach((item) => {
    const existing = map.get(item.recordId);

    if (existing) {
      existing.items.push(item);
      return;
    }

    map.set(item.recordId, {
      recordId: item.recordId,
      season: item.season,
      school: item.school,
      grade: item.grade,
      subject: item.subject,
      examDate: item.examDate,
      items: [item],
    });
  });

  return Array.from(map.values());
}
