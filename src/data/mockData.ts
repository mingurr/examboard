import type { ExamRecord } from "@/types/exam";

export const seasonOptions = [
  { label: "2026年 1学期 中間試験", value: "2026年 1学期 中間試験" },
  { label: "2026年 1学期 期末試験", value: "2026年 1学期 期末試験" },
  { label: "2025年 2学期 中間試験", value: "2025年 2学期 中間試験" },
  { label: "2025年 2学期 期末試験", value: "2025年 2学期 期末試験" },
];

export const schoolOptions = [
  { label: "桜丘中学校", value: "桜丘中学校" },
  { label: "青葉中学校", value: "青葉中学校" },
  { label: "白鳥中学校", value: "白鳥中学校" },
  { label: "星川高等学校", value: "星川高等学校" },
  { label: "明成高等学校", value: "明成高等学校" },
  { label: "東陵高等学校", value: "東陵高等学校" },
];

export const gradeOptions = [
  { label: "1学年", value: "1学年" },
  { label: "2学年", value: "2学年" },
  { label: "3学年", value: "3学年" },
];

export const subjectOptions = [
  { label: "英語", value: "英語" },
  { label: "数学", value: "数学" },
];

export const publisherOptions = [
  { label: "三省堂", value: "三省堂" },
  { label: "東京書籍", value: "東京書籍" },
  { label: "数研出版", value: "数研出版" },
];

export const bookUnitOptions = [
  { label: "Unit 1", value: "Unit 1" },
  { label: "Unit 2", value: "Unit 2" },
  { label: "Unit 3", value: "Unit 3" },
  { label: "Unit 4", value: "Unit 4" },
];

export const subUnitOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];

export const printTypeOptions = [
  { label: "文法", value: "文法" },
  { label: "単語", value: "単語" },
  { label: "読解", value: "読解" },
  { label: "書述", value: "書述" },
  { label: "その他", value: "その他" },
];

export const emptyRecord: ExamRecord = {
  id: "",
  season: "",
  school: "",
  grade: "",
  subject: "",
  examDate: "",
  bookName: "",
  bookPublisher: "",
  bookUnitFrom: "",
  bookUnitTo: "",
  subName: "",
  subPublisher: "",
  subUnitFrom: "",
  subUnitTo: "",
  print1Type: "",
  print1Name: "",
  print1File: "",
  print2Type: "",
  print2Name: "",
  print2File: "",
  examPaperName: "",
  examPaperFile: "",
  answerSheetName: "",
  answerSheetFile: "",
};

export const mockData: ExamRecord[] = [
  {
    id: "2026-1-mid-sakura-3-math",
    season: "2026年 1学期 中間試験",
    school: "桜丘中学校",
    grade: "3学年",
    subject: "数学",
    examDate: "2026-04-15",
    bookName: "New Crown English 3",
    bookPublisher: "三省堂",
    bookUnitFrom: "Unit 1",
    bookUnitTo: "Unit 3",
    subName: "英語ワーク",
    subPublisher: "三省堂",
    subUnitFrom: "1",
    subUnitTo: "3",
    print1Type: "文法",
    print1Name: "文法まとめ",
    print1File: "bunpo_matome.pdf",
    print2Type: "単語",
    print2Name: "単語テスト",
    print2File: "tango_test.pdf",
    examPaperName: "2025年度 中間試験",
    examPaperFile: "midterm_2025.pdf",
    answerSheetName: "2025年度 中間試験 解答",
    answerSheetFile: "midterm_answer_2025.pdf",
  },
];
