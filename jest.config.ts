import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Run tests only for the files that end with .test before the extension
  // Example: SignUpForm.test.tsx will run / setup.ts will be ignored
  testRegex: '(/__tests__/.*\\.test)\\.[jt]sx?$',
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 75,
      functions: 75,
      lines: 75,
    },
  },
};

export default createJestConfig(config);
