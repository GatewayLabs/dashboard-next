export default {
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:editorconfig/noconflict',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'editorconfig',
    'eslint-plugin-import-helpers',
    '@tanstack/query',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/ban-types': ['warn'],
    '@typescript-eslint/no-empty-function': ['warn'],
    'react/no-unescaped-entities': ['warn'],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          ['/^react$/', '/^react-(native|dom)$/', '/^next/'],
          'module',
          '/^@gateway//',
          '/^@mui//',
          ['parent', 'sibling'],
          'index',
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: false,
        },
      },
    ],
    'sort-imports': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
