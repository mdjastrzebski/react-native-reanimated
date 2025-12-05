/** @type {import('jest').Config} */
module.exports = {
  projects: [
    {
      displayName: 'native',
      preset: 'react-native',
      modulePathIgnorePatterns: ['lib'],
      setupFiles: ['./jest-setup.js'],
      setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
      testEnvironment: 'node',
      transformIgnorePatterns: [],
      testPathIgnorePatterns: ['\\.web\\.test\\.(?:ts|tsx)$'],
    },
    {
      displayName: 'web',
      preset: 'react-native',
      modulePathIgnorePatterns: ['lib'],
      setupFiles: ['./jest-setup.js'],
      testEnvironment: 'jsdom',
      transformIgnorePatterns: [],
      testMatch: ['**/*.web.test.ts?(x)'],
      testPathIgnorePatterns: ['\\.native\\.test\\.(?:ts|tsx)$'],
      setupFilesAfterEnv: [
        '@testing-library/jest-native/extend-expect',
        '<rootDir>/jest-web-setup.js',
      ],
    },
  ],
};
