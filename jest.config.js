// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-error-boundary)/)', // allow transforming ESM
      'node_modules/(?!axios)/', // <-- force transform for axios
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // for CSS imports
  },
};
