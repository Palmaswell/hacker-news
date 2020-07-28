module.exports = {
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
    setupFiles: ['<rootDir>/testing-library-setup.ts'],
  },
  roots: [
    '<rootDir>/src'
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
}
