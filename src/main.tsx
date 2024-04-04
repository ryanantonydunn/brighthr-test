import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import "./index.css";

async function enableMocking() {
  if (import.meta.env.MODE === "mocking") {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }
}

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
