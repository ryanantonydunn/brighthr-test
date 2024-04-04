export const isMocking =
  process.env.NODE_ENV === "test" || (window?.location && !!new URLSearchParams(window.location.search).get("mock"));

export const apiUrl = isMocking ? "" : "https://front-end-kata.brighthr.workers.dev";
