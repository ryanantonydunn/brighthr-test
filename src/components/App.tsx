import React from "react";
import { useAbsences } from "../data/absences";
import { SortKey } from "../data/types";

export function App() {
  const absences = useAbsences();

  // Handle sorting
  // TODO: move into a generic sorting hook that takes a data array
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
    <main className="p-4">
      <h1 className="font-bold text-2xl mb-2 p-1 border-b border-gray-200">Absences</h1>
      <div className="grid grid-cols-6">
        {/* TODO: organise into a table component, streamline repetitive tailwind classes */}
        <div className="border-b border-gray-200 font-bold">
          <button
            className="p-1 w-full text-left"
            data-testid="header-startDate"
            onClick={() => {
              let newDirection = "desc";
              if (sortKey === "startDate" && sortDirection === "desc") {
                newDirection = "asc";
              }
              setSortDirection(newDirection);
              setSortKey("startDate");
            }}
            aria-label="Sort by start date"
          >
            {/* TODO: improve accessibility here by being more specific about the non-sighted user-experience */}
            Start Date{" "}
            {sortKey === "startDate" && sortDirection === "asc" && (
              <span data-testid="header-startDate-asc">&uarr;</span>
            )}
            {sortKey === "startDate" && sortDirection === "desc" && (
              <span data-testid="header-startDate-desc">&darr;</span>
            )}
          </button>
        </div>
        <div className="border-b border-gray-200 p-1 font-bold">End Date</div>
        <div className="border-b border-gray-200 p-1 font-bold">Name</div>
        <div className="border-b border-gray-200 p-1 font-bold">Status</div>
        <div className="border-b border-gray-200 p-1 font-bold">Type</div>
        <div className="border-b border-gray-200 p-1 font-bold">Conflicts</div>
        {sortedAbsences ? (
          sortedAbsences.map((absence, i) => {
            const cellClass = `p-1 ${i % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`;
            return (
              <React.Fragment key={absence.id}>
                <div className={cellClass} data-testid={`row-${absence.id}-startDate`}>
                  {formatDate(absence.startDate)}
                </div>
                <div className={cellClass} data-testid={`row-${absence.id}-endDate`}>
                  {formatDate(getEndDate(absence.startDate, absence.days))}
                </div>
                <div className={cellClass} data-testid={`row-${absence.id}-name`}>
                  {absence.employee.firstName} {absence.employee.lastName}
                </div>
                <div className={cellClass} data-testid={`row-${absence.id}-approval`}>
                  {/* TODO: possibly create tag component */}
                  {absence.approved ? (
                    <span className="inline-block bg-green-600 rounded text-white text-sm py-1 px-2">Approved</span>
                  ) : (
                    <span className="inline-block bg-yellow-600 rounded text-white text-sm py-1 px-2">
                      Not Approved
                    </span>
                  )}
                </div>
                <div className={cellClass} data-testid={`row-${absence.id}-type`}>
                  {formatAbsenceType(absence.absenceType)}
                </div>
                <div className={cellClass}>
                  {absence.hasConflict && (
                    <div
                      className="inline-block bg-red-700 rounded text-white text-sm py-1 px-2"
                      data-testid={`row-${absence.id}-conflict`}
                    >
                      Conflict
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <div>No absences to display</div>
        )}
      </div>
    </main>
  );
}

// TODO: move functions into utils folder

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
 * TODO: Would this require thinking about weekdays and relevant workdays this contributes to?
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
