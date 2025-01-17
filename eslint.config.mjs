import eslintJs from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import jestPlugin from 'eslint-plugin-jest';

export default [
  {
    // Analisa apenas arquivos TypeScript
    files: ['**/*.ts'], 
    ignores: ['node_modules', 'dist', 'build', '**/*.js'], // Ignora arquivos .js
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      globals: {
        __dirname: true,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier,
    },
    rules: {
      ...eslintJs.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    // Regras específicas para testes (aplica apenas aos arquivos de teste .spec.ts ou .test.ts)
    files: ['tests/**/*.spec.ts', 'tests/**/*.test.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      globals: {
        it: true,
        describe: true,
        expect: true,
        jest: true,
        __dirname: true,
        beforeEach: true,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier,
      jest: jestPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
];
