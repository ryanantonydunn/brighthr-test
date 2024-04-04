import React from "react";
import { apiUrl } from "../mocks/api-url";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
}

interface Absence {
  id: number;
  startDate: string;
  days: number;
  absenceType: string;
  approved: boolean;
  employee: Employee;
}

/**
 * Load absences and store in local state
 */
export function useAbsences() {
  const [data, setData] = React.useState<Absence[]>([]);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  React.useEffect(() => {
    async function loadAbsences() {
      try {
        const response = await fetch(`${apiUrl}/api/absences`);
        const json = (await response.json()) as Absence[];
        setData(json);
        setHasLoaded(true);
      } catch (e) {
        console.error(e);
      }
    }
    loadAbsences();
  }, []);
  return { hasLoaded, data };
}
