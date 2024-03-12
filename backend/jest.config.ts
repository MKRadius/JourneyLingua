export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: 'Test Report',
                outputPath: '__tests__/reports/test-report.html',
            },
        ],
    ],
    testMatch: ['**/__tests__/**/*.test.ts'], // Adjust the file extension if needed
    testPathIgnorePatterns: ['JourneyLingua/node_modules/'],
    collectCoverage: true,
    collectCoverageFrom: ['JourneyLingua/backend/**/*.ts', '!JourneyLingua/backend/__tests__/**/*.ts'], // Exclude test files from coverage collection
    coverageDirectory: '__tests__/coverageReports',
};
