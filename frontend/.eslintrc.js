module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended', // PrettierルールをESLintに統合
    'prettier',                    // Prettierと競合するESLintルールをオフ
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off', // React 17+では不要
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
