module.exports = {
  root: true,
  plugins: [
    '@typescript-eslint',
    'eslint-plugin',
    'import',
    'eslint-comments',
    'eslint-plugin-cypress',
  ],
  env: {
    es6: true,
    node: true,
  },
  settings: {
    react: { version: 'detect' },
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.eslint.json', './srv-frontend/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:cypress/recommended',
  ],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/prefer-as-const': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['arrowFunctions'] },
    ],

    'comma-dangle': ['error', 'always-multiline'],
    'constructor-super': 'off',
    curly: ['error', 'all'],
    'no-mixed-operators': 'error',
    'no-console': 'error',
    'no-process-exit': 'error',

    'eslint-comments/disable-enable-pair': [
      'error',
      {
        allowWholeFile: true,
      },
    ],

    'eslint-comments/no-aggregating-enable': 'error',

    'eslint-comments/no-duplicate-disable': 'error',

    'eslint-comments/no-unlimited-disable': 'error',

    'eslint-comments/no-unused-disable': 'error',

    'eslint-comments/no-unused-enable': 'error',

    'eslint-comments/no-use': [
      'error',
      {
        allow: [
          'eslint-disable',
          'eslint-disable-line',
          'eslint-disable-next-line',
          'eslint-enable',
        ],
      },
    ],

    'import/first': 'error',

    'import/newline-after-import': 'error',

    'import/no-absolute-path': 'error',

    'import/no-amd': 'error',

    'import/no-default-export': 'error',

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        peerDependencies: true,
        optionalDependencies: false,
      },
    ],

    'import/no-mutable-exports': 'error',

    'import/no-named-default': 'error',

    'import/no-named-export': 'off',

    'import/no-self-import': 'error',

    'import/prefer-default-export': 'off',
  },
  overrides: [
    // all test files
    {
      files: [
        'srv-frontend/**/*.ts',
        'srv-frontend/**/*.tsx',
        'srv-frontend/**/*.js',
      ],
      rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
};
