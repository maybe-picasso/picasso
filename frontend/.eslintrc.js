module.exports = {
  plugins: ['react', 'simple-import-sort'],
  extends: ['react-app', 'react-app/jest'],
  overrides: [
    // override "simple-import-sort" config
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'import/order': 'off',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^\\w', '^@?\\w'],
              // Internal packages, Side effect imports.
              ['^(@)(/.*|$)', '^\\u0000'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^.'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],
};
