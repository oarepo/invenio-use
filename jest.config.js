module.exports = {
    preset: 'ts-jest',
    roots: [
        '<rootDir>/packages',
    ],
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
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
    // setupFiles: [
    //     '<rootDir>/packages/.test/test.setup.js',
    // ],
    moduleNameMapper: {
        "^lodash-es$": "lodash",
        '^@oarepo/invenio-use-(.*)$': '<rootDir>/packages/$1/index.ts',
    },
    testURL: 'https://oarepo.org',
    testEnvironment: 'node',
}
