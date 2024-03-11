export default {
    preset: "ts-jest",
    testEnvironment: "node",
    reporters: [
      "default",
      ["jest-html-reporter", {
        "pageTitle": "Test Report",
        "outputPath": "__tests__/reports/test-report.html"
      }]
    ]
  };
  