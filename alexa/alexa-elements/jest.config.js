module.exports = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testEnvironment: "node",
  roots: ["<rootDir>/src/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
