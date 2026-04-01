import type { ExamFilter } from "@/types/exam";
import type { MaterialType } from "@/types/materials";

export const materialModeOptions: {
  type: MaterialType;
  title: string;
  description: string;
}[] = [
  {
    type: "studyPacket",
    title: "試験対策資料 作成",
    description:
      "複数シーズンの試験紙とプリント資料を一つの練習資料にまとめます。",
  },
  {
    type: "calendar",
    title: "試験情報カレンダー 作成",
    description: "選択した試験情報を日付ベースで確認できる画面を準備します。",
  },
];

export const initialMaterialsFilters: ExamFilter = {
  season: "",
  school: "",
  grade: "",
  subject: "",
};
