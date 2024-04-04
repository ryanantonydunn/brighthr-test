export type AbsenceType = "SICKNESS" | "ANNUAL_LEAVE" | "MEDICAL";

export type SortKey = "id" | "startDate";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Absence {
  id: number;
  startDate: string;
  days: number;
  absenceType: AbsenceType;
  approved: boolean;
  employee: Employee;
  hasConflict: boolean;
}

export type AbsenceRaw = Omit<Absence, "hasConflict">;

export interface Conflict {
  conflicts: boolean;
}
