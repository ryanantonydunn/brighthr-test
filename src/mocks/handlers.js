import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api/absences", () => {
    return HttpResponse.json([
      {
        id: 0,
        startDate: "2022-05-28T04:39:06.470Z",
        days: 9,
        absenceType: "SICKNESS",
        employee: { firstName: "Jane", lastName: "Doe", id: "a" },
        approved: true,
      },
      {
        id: 1,
        startDate: "2022-05-28T04:39:06.470Z",
        days: 10,
        absenceType: "SICKNESS",
        employee: { firstName: "John", lastName: "Doe", id: "b" },
        approved: false,
      },
    ]);
  }),
  http.get("/api/conflict/:id", () => {
    return HttpResponse.json([]);
  }),
];
