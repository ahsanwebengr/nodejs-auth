module.exports = {
  env: {
    node: true, // Enables Node.js global variables and Node.js scoping
    es2021: true // Enables ES2021 features
  },
  extends: [
    'eslint:recommended', // Uses the recommended ESLint rules
    'plugin:node/recommended' // Node.js specific linting rules
  ],
  parserOptions: {
    ecmaVersion: 2021, // Support for ES2021 syntax
    sourceType: 'module' // Allows the use of `import` and `export`
  },
  rules: {
    // Possible Errors
    'no-console': 'off', // Allow console.log (useful for debugging in Node.js)
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn for unused vars except args starting with "_"
    'no-undef': 'error', // Disallow undefined variables

    // Best Practices
    eqeqeq: 'error', // Enforce strict equality
    curly: 'error', // Require curly braces for all control statements
    'no-process-exit': 'warn', // Warn against using process.exit()
    'no-implicit-globals': 'error', // Disallow undeclared globals

    // Node.js Specific Rules
    'node/no-missing-import': 'error', // Disallow missing imports
    'node/no-unpublished-import': 'off', // Allow importing dev dependencies
    'node/no-unsupported-features/es-syntax': [
      'error',
      { version: '>=14.0.0', ignores: [] }
    ], // Ensure ES2020+ features work with Node.js >=14
    'node/no-deprecated-api': 'error', // Disallow deprecated Node.js APIs

    // Stylistic Choices
    semi: ['error', 'always'], // Require semicolons
    quotes: ['error', 'single'], // Use single quotes
    indent: ['error', 2], // Enforce 2-space indentation
    'comma-dangle': ['error', 'always-multiline'], // Enforce dangling commas in multiline objects/arrays
    'eol-last': ['error', 'always'] // Enforce newline at the end of files
  }
}
