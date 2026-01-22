import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const sharedConfig = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(js|ts|tsx)$": [
      "babel-jest",
      { configFile: "./babel.jest.config.js" },
    ],
  },
};

const config: Config = {
  coverageProvider: "v8",

  projects: [
    {
      displayName: "utils",
      testEnvironment: "node",
      testMatch: ["<rootDir>/db/**/*.test.ts", "<rootDir>/common/**/*.test.ts"],
      ...sharedConfig,
    },
    {
      displayName: "server",
      testEnvironment: "node",
      testMatch: ["<rootDir>/**/*.server.test.ts"],
      ...sharedConfig,
      transformIgnorePatterns: ["/node_modules/(?!(bson|mongodb)/)"],
    },
    {
      displayName: "client",
      testEnvironment: "jest-environment-jsdom",
      testMatch: ["<rootDir>/**/*.test.tsx", "!<rootDir>/**/*.server.test.ts"],
      ...sharedConfig,
    },
  ],
};

export default createJestConfig(config);
