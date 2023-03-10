export type StudyTimePerSubject = {
  startTime: Date;
  endTime: Date;
  subject: string;
};

export type StudyTimeInfo = {
  startTime: string;
  endTime: string;
  subject: string;
};

export type DetailedStudyTimeInfo = StudyTimeInfo & {
  color: string;
  studyTime: string;
};
