module.exports = {
    setupFiles: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '^.+\\.(jpg|jpeg|png|gif|webp|svg|css)$': 'jest-transform-stub'
    },
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ["<rootDir>/node_modules/"]
};
