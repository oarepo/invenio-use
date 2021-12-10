module.exports = {
    roots: [
        '<rootDir>/packages',
    ],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)',
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
    ],
    modulePathIgnorePatterns: [
        '/dist/',
    ],
    setupFiles: [
        '<rootDir>/packages/.test/test.setup.js',
    ],
    moduleNameMapper: {
        '^@oarepo/invenio-use-(.*)$': '<rootDir>/packages/$1/index.ts',
    },
    testURL: 'https://oarepo.org',
    testEnvironment: 'jsdom',
}
