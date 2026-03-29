export type SubjectType = "英語" | "数学";

export type ExamFilter = {
  season: string;
  school: string;
  grade: string;
  subject: SubjectType | "";
};

export type SearchFilters = ExamFilter;

export type ExamRecord = {
  id: string;

  season: string;
  school: string;
  grade: string;
  subject: string;

  examDate: string;

  bookName: string;
  bookPublisher: string;
  bookUnitFrom: string;
  bookUnitTo: string;

  subName: string;
  subPublisher: string;
  subUnitFrom: string;
  subUnitTo: string;

  print1Type: string;
  print1Name: string;
  print1File: string;

  print2Type: string;
  print2Name: string;
  print2File: string;

  examPaperName: string;
  examPaperFile: string;

  answerSheetName: string;
  answerSheetFile: string;
};
