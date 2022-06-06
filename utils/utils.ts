import { v4 as uuid } from "uuid";

export const generateReportID = (): string => {
  const reportID: string = uuid();
  return reportID;
};
