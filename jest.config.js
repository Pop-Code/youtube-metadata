module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.spec.ts$',
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    collectCoverageFrom: ['./src/**/*.ts'],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    verbose: true
};
