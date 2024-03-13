// export default {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     reporters: [
//         'default',
//         [
//             'jest-junit-reporter',
//             {
//                 outputDirectory: 'JourneyLingua/backend/__tests__/reports',
//                 outputName: 'junit.xml',
//             },
//         ],
//         [
//             'jest-html-reporter',
//             {
//                 pageTitle: 'Test Report',
//                 outputPath: '__tests__/reports/test-report.html',
//             },
//         ],
//     ],
//     testMatch: ['JourneyLingua/backend/__tests__/**/*.test.ts'], // Adjust the file extension if needed
//     testPathIgnorePatterns: ['JourneyLingua/node_modules/'],
//     collectCoverage: true,
//     collectCoverageFrom: ['JourneyLingua/backend/**/*.ts', '!JourneyLingua/backend/__tests__/**/*.ts'], // Exclude test files from coverage collection
//     coverageDirectory: 'JourneyLingua/backend/__tests__/coverageReports',
// };

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)$": "JourneyLingua/src/$1",
    },
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
    moduleFileExtensions: ["ts", "js", "json", "node"],
    reporters: [
        "default",
        [
            "jest-junit",
            { outputDirectory: "reports", outputName: "junit.xml" },
        ],
        [
            "jest-html-reporters",
            { publicPath: "./__tests__/coverageReports", filename: "html-test-report.html" },
        ],
    ],
};
