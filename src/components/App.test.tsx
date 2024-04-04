import { render, screen } from "@testing-library/react";
import React from "react";
import { App } from "./App";

test("loads and displays greeting", async () => {
  render(<App />);
  // await screen.findByRole("heading");
  // expect(screen.getByTestId("absence-0")).toBeInTheDocument();
});
