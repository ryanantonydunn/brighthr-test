# BrightHR Test: Ryan Dunn

For this task I decided to focus mostly on creating an environment where I could demonstrate a solid foundational structure, a simpler version of how I would normally architect a project from the beginning to show some of my basic decisions. Also based on the brief I have placed most focus on getting the test environment set up properly. I will run through some of my thoughts and decision-making here.

## The stack I have used here and why

* React
* TypeScript
* Vite - Easy bundler to set up for a small project like this, very quick
* Tailwind - Mentioned in the job spec, also I just enjoy using it for prototyping in cases like this
* Jest / React Testing Library - The standard testing tools for a React app
* Mock Service Worker - Mocking the API for use in test suites and development independent of external endpoints

## Mock service worker

I have made use of the endpoints provided but also of [mock-service-worker](https://mswjs.io/). In a real project this means the front-end can be developed completely independent of any back-end (assuming we have a strong data-contract) and seamlessly integrated later in the process. It also means we can write tests that mimic a real environment almost identically and can be run within a node environment as part of our build process.

The mocked endpoint handlers are stored in `/src/mocks/handlers.js` and have a fixed set of results that my tests are written around. The testing strategy is to make assertions based on on-screen results which most closely mimic how actual users interact with the app.

To see the difference, run `npm run dev` and visit `http://localhost:5173/`, this will by default call the provided endpoints. If you set the query string to `?mock=true` then it will switch to using the mocked API data.

## The tasks

Since I have focused most of my attention on getting a high quality environment with a strong test setup, I have included only some of the features in the list as follows:

1. Show basic absence data *complete*
2. Include a visual indication that an absence has conflicts *complete*
3. Allow the list to be sorted by dates, absence type, and name *partial, only did the dates to demonstrate the way it would work*
4. When an employee's name is clicked show all of their absences *not done*

I have left some TODO comments in places suggesting what I might think about doing if I were to continue working on it.
