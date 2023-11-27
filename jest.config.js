module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTest.ts"],
  setupFiles: ["./jest.setup.js"],
  transformIgnorePatterns: [],
  // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/mocks/styleMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
};
