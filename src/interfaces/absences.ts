import { Conflict } from "./conflicts";
import { Employee } from "./employee";

export enum AbsenceType {
  SICKNESS = "SICKNESS",
  ANNUAL_LEAVE = "ANNUAL_LEAVE",
  MEDICAL = "MEDICAL",
}

export interface Absence {
  id: number;
  startDate: string;
  days: number;
  absenceType: AbsenceType;
  employee: Employee;
  approved: boolean;
}

export type AbsenceWithConflict = Absence & Conflict;

export enum ApprovalStatus {
  APPROVED = "APPROVED",
  NOT_APPROVED = "NOT APPROVED",
}

export interface AbsenceDisplayedData extends AbsenceWithConflict {
  endDate: string;
  employeeFullName: string;
  approvalStatus: ApprovalStatus;
}
