module.exports = {
	'env': {
		'browser': true,
		'es2020': true
	},
	'extends': [
		'turbo',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 11,
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
		'import',
		'unused-imports',
	],
	'rules': {
		'indent': ['error', 2, { 'SwitchCase': 1 } ],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'comma-dangle': ['error', 'always-multiline'],
		'eol-last': ['error', 'always'],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
		'unused-imports/no-unused-imports': 'error',
		'import/order': [
			'error',
			{
				'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
				'newlines-between': 'always',  // import groups の間 1行あける
				'pathGroupsExcludedImportTypes': ['builtin'],
				'alphabetize': { 'order': 'asc', 'caseInsensitive': true }, // 大文字小文字関係なくアルファベット順にしたい
			}
		],
		'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/consistent-type-imports': 'error',
	}
};
