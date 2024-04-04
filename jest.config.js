module.exports = {
  rootDir: ".",
  setupFiles: [require.resolve("whatwg-fetch")],
  setupFilesAfterEnv: ["./test/jest.setup.tsx", "./test/setup-env.ts"],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    "test/(.*)": "<rootDir>/test/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/acceptance/"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};
