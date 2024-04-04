import React from "react";
import { useAbsences } from "../data/absences";

export function App() {
  const absences = useAbsences();

  if (!absences.hasLoaded) {
    return <main className="h-screen flex items-center justify-center">Loading...</main>;
  }

  return (
    <main className="h-screen overflow-hidden">
      <h1>Absences</h1>
      {absences.data.length ? (
        absences.data.map((absence) => <div key={absence.id}>{absence.absenceType}</div>)
      ) : (
        <div>No absences to display</div>
      )}
    </main>
  );
}
