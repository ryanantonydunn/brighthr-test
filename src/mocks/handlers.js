import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api/absences", () => {
    return HttpResponse.json([
      {
        id: 0,
        startDate: "2020-03-01T00:00:00.000Z",
        days: 9,
        absenceType: "MEDICAL",
        employee: { firstName: "Jane", lastName: "Doe", id: "a" },
        approved: true,
      },
      {
        id: 1,
        startDate: "2020-01-01T00:00:00.000Z",
        days: 10,
        absenceType: "SICKNESS",
        employee: { firstName: "John", lastName: "Doe", id: "b" },
        approved: false,
      },
      {
        id: 2,
        startDate: "2020-02-01T00:00:00.000Z",
        days: 8,
        absenceType: "ANNUAL_LEAVE",
        employee: { firstName: "John", lastName: "Doe", id: "b" },
        approved: true,
      },
    ]);
  }),
  http.get("/api/conflict/:id", (req) => {
    const { id } = req.params;
    return HttpResponse.json({ conflicts: id === "0" }); // absence id '0' has conflicts, '1' and '2' do not
  }),
];
