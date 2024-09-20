module.exports = {
    testEnvironment: 'node',
    reporters: [
      'default',
      ['jest-junit', {
        outputDirectory: './Test/results',
        outputName: 'test-results.xml'
      }]
    ],
    collectCoverage: true,
    coverageDirectory: './Test/coverage'
  };