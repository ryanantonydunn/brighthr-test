import React from "react";
import { apiUrl } from "../mocks/api-url";

export type AbsenceType = "SICKNESS" | "ANNUAL_LEAVE" | "MEDICAL";

export type SortKey = "id" | "startDate";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
}

interface Absence {
  id: number;
  startDate: string;
  days: number;
  absenceType: AbsenceType;
  approved: boolean;
  employee: Employee;
  hasConflict: boolean;
}

type AbsenceRaw = Omit<Absence, "hasConflict">;

interface Conflict {
  conflicts: boolean;
}

async function loadAbsences() {
  const response = await fetch(`${apiUrl}/api/absences`);
  const json = await response.json();
  return json as AbsenceRaw[];
}

async function loadConflict(absenceId: number) {
  const response = await fetch(`${apiUrl}/api/conflict/${absenceId}`);
  const json = await response.json();
  return json as Conflict;
}

/**
 * Load absences and store in local state
 */
export function useAbsences() {
  const [data, setData] = React.useState<Absence[]>([]);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  React.useEffect(() => {
    async function getAbsences() {
      // Load all absences
      const absencesRaw = await loadAbsences();

      // Load all conflicts associated with each absence
      const conflicts = await Promise.all(absencesRaw.map((absence) => loadConflict(absence.id)));

      // Combine conflict information with absence information
      const absencesWithConflicts = absencesRaw.map((absence, i) => ({
        ...absence,
        hasConflict: conflicts[i].conflicts,
      }));

      // Set the data in local state to trigger re-renders where hook is used
      setData(absencesWithConflicts);
      setHasLoaded(true);
    }
    getAbsences();
  }, []);
  return { hasLoaded, data };
}
