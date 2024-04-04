import React from "react";
import { SortKey, useAbsences } from "../data/absences";

const headers = ["Start Date"];

export function App() {
  const absences = useAbsences();

  // Handle sorting absences
  const [sortKey, setSortKey] = React.useState<SortKey>("id");
  const [sortDirection, setSortDirection] = React.useState("asc");
  const sortedAbsences = React.useMemo(() => {
    const newAbsences = absences.data.sort((a, b) => {
      if (sortKey === "startDate") {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      } else {
        return Number(a) - Number(b);
      }
    });
    return sortDirection === "desc" ? newAbsences.reverse() : newAbsences;
  }, [sortKey, sortDirection, absences.data]);

  // Show loading screen if not loaded yet
  if (!absences.hasLoaded) {
    return <main className="h-screen flex items-center justify-center">Loading...</main>;
  }

  return (
    <main className="h-screen overflow-hidden">
      <h1>Absences</h1>
      <div className="grid grid-cols-6">
        <div>
          <button
            data-testid="header-startDate"
            onClick={() => {
              let newDirection = "desc";
              if (sortKey === "startDate" && sortDirection === "desc") {
                newDirection = "asc";
              }
              setSortDirection(newDirection);
              setSortKey("startDate");
            }}
          >
            Start Date{" "}
            {sortKey === "startDate" && sortDirection === "asc" && (
              <span data-testid="header-startDate-asc">&uarr;</span>
            )}
            {sortKey === "startDate" && sortDirection === "desc" && (
              <span data-testid="header-startDate-desc">&darr;</span>
            )}
          </button>
        </div>
        <div>End Date</div>
        <div>Name</div>
        <div>Status</div>
        <div>Type</div>
        <div>Conflicts</div>
        {absences.data.length ? (
          absences.data.map((absence) => (
            <React.Fragment key={absence.id}>
              <div data-testid={`row-${absence.id}-startDate`}>{formatDate(absence.startDate)}</div>
              <div data-testid={`row-${absence.id}-endDate`}>
                {formatDate(getEndDate(absence.startDate, absence.days))}
              </div>
              <div data-testid={`row-${absence.id}-name`}>
                {absence.employee.firstName} {absence.employee.lastName}
              </div>
              <div data-testid={`row-${absence.id}-approval`}>{absence.approved ? "Approved" : "Not Approved"}</div>
              <div data-testid={`row-${absence.id}-type`}>{formatAbsenceType(absence.absenceType)}</div>
              <div>{absence.hasConflict && <div data-testid={`row-${absence.id}-conflict`}>Conflict</div>}</div>
            </React.Fragment>
          ))
        ) : (
          <div>No absences to display</div>
        )}
      </div>
    </main>
  );
}

/**
 * @param date ISO string of date
 * @returns Date formatted to a standard (eg: 20 Jun 2020)
 */
function formatDate(date: string): string {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "short" });
  return `${d.getDate()} ${month} ${d.getFullYear()}`;
}

/**
 * @param startDate ISO string of date
 * @param days Number of days we want to add on
 * @returns A new ISO string of the date {days} number of days from the {startDate}
 * Would this require thinking about weekdays and relevant workdays this contributes to?
 */
function getEndDate(startDate: string, days: number) {
  const d = new Date(startDate);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

/**
 * @param str Absence type string (eg: ABSENCE_TYPE)
 * @returns Absence type formatted to title case with underscores removed (eg: Absence Type)
 */
function formatAbsenceType(str: string) {
  return str.replace("_", " ").replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
