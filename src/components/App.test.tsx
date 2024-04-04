import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { App } from "./App";

it("loads and displays correct absence details", async () => {
  render(<App />);
  await screen.findByRole("heading");

  const expectedData = [
    ["0", "1 Mar 2020", "10 Mar 2020", "Jane Doe", "Approved", "Medical"],
    ["1", "1 Jan 2020", "11 Jan 2020", "John Doe", "Not Approved", "Sickness"],
    ["2", "1 Feb 2020", "9 Feb 2020", "John Doe", "Approved", "Annual Leave"],
  ];
  expectedData.forEach(([id, startDate, endDate, name, approval, type]) => {
    expect(screen.getByTestId(`row-${id}-startDate`)).toHaveTextContent(startDate);
    expect(screen.getByTestId(`row-${id}-endDate`)).toHaveTextContent(endDate);
    expect(screen.getByTestId(`row-${id}-name`)).toHaveTextContent(name);
    expect(screen.getByTestId(`row-${id}-approval`)).toHaveTextContent(approval);
    expect(screen.getByTestId(`row-${id}-type`)).toHaveTextContent(type);
  });
});

it("includes a visual indication of any conflicts", async () => {
  render(<App />);
  await screen.findByRole("heading");

  expect(screen.getByTestId(`row-0-conflict`)).toBeInTheDocument();
  expect(screen.queryByTestId(`row-1-conflict`)).toBeNull();
  expect(screen.queryByTestId(`row-2-conflict`)).toBeNull();
});

it("sorts absences by start date", async () => {
  render(<App />);
  await screen.findByRole("heading");
  const dateHeader = screen.getByTestId(`header-startDate`);

  // Assert original order in the mock handlers
  const dates1 = screen.queryAllByTestId(/row-\d*-startDate/);
  ["1 Mar 2020", "1 Jan 2020", "1 Feb 2020"].forEach((date, i) => {
    expect(dates1[i]).toHaveTextContent(date);
  });

  // Click start date header to set descending sort
  fireEvent.click(dateHeader);
  await expect(screen.getByTestId("header-startDate-desc")).toBeInTheDocument();

  // Assert descending order in the mock handlers
  const dates2 = screen.queryAllByTestId(/row-\d*-startDate/);
  ["1 Mar 2020", "1 Feb 2020", "1 Jan 2020"].forEach((date, i) => {
    expect(dates2[i]).toHaveTextContent(date);
  });

  // Click start date header again to set ascending sort
  fireEvent.click(dateHeader);
  await expect(screen.getByTestId("header-startDate-asc")).toBeInTheDocument();

  // Assert descending order in the mock handlers
  const dates3 = screen.queryAllByTestId(/row-\d*-startDate/);
  ["1 Jan 2020", "1 Feb 2020", "1 Mar 2020"].forEach((date, i) => {
    expect(dates3[i]).toHaveTextContent(date);
  });
});

// TODO: shows loading screen

// TODO: sorts absences by type

// TODO: sorts absences by name

// TODO: shows an employees absences when name is clicked

// TODO: in a wider context would include more indications outside of the happy path, eg: server errors and timeouts
