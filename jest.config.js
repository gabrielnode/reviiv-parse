const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  collectCoverageFrom: [
    "**/*.ts", // Inclui apenas arquivos TypeScript
    "!**/*index.ts", // Exclui arquivos .factory.ts
    "!**/*.factory.ts", // Exclui arquivos .factory.ts
    "!**/*.entrypoint.ts", // Exclui arquivos .factory.ts
    "!**/node_modules/**", // Exclui a pasta node_modules
    "!**/dist/**", // Exclui arquivos da build
    "!**/tests/**", // (Opcional) Exclui arquivos de teste, se necessário
    "!jest.config.js", // Exclui o arquivo de configuração do Jest
  ],
  coverageDirectory: "coverage", // Define a pasta onde os relatórios serão gerados
  coverageReporters: ["text", "lcov", "json", "html"], // Define os formatos do relatório
};
