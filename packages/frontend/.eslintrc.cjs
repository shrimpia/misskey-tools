module.exports = {
  extends: [
    'tools', 
    'plugin:react/recommended',
    "plugin:react-hooks/recommended",
  ],
  settings: {
    react: {
      version: "detect"
	},
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    project: './tsconfig.json', // プロジェクトに対するコンパイル設定ファイルのパス
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react',
    'react-hooks',
  ],
};
