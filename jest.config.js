module.exports = {
  testEnvironment: 'jsdom', // Specifies that Jest should use jsdom
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // Transforms TypeScript files
    '^.+\\.(js|jsx)$': 'babel-jest', // Transforms JavaScript files
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports for Jest
  },
}
