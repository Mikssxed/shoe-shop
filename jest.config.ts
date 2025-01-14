import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  testEnvironment: 'jsdom',
  setupFiles: ['./setup.jest.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^jose': 'jose',
    '@panva/hkdf': '@panva/hkdf',
    '^preact-render-to-string': 'preact-render-to-string',
    '^preact': 'preact',
    '^uuid': 'uuid',
  },
  // Run tests only for the files that end with .test before the extension
  // Example: SignUpForm.test.tsx will run / setup.ts will be ignored
  testRegex: '(/__tests__/.*\\.test)\\.[jt]sx?$',
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
