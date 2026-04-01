export type MaterialType = "studyPacket" | "calendar";

export type MaterialItem = {
  id: string;
  recordId: string;

  season: string;
  school: string;
  grade: string;
  subject: string;
  examDate: string;

  type: "examPaper" | "print1" | "print2";

  label: string;
  name: string;
  file: string;
};

export type MaterialPreviewGroup = {
  recordId: string;

  season: string;
  school: string;
  grade: string;
  subject: string;
  examDate: string;

  items: MaterialItem[];
};
