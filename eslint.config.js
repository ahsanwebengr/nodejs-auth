import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser // Define browser-specific globals
    },
    rules: {
      // Add custom rules here
      'no-console': 'warn', // Example: Warn when console.log is used
      eqeqeq: 'error', // Enforce strict equality
      semi: ['error', 'always'], // Require semicolons
      quotes: ['error', 'single'], // Enforce single quotes
      'node/no-process-env': 'off'
    }
  },
  pluginJs.configs.recommended
];
