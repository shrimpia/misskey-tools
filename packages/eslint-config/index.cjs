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
		'@typescript-eslint'
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
    "@typescript-eslint/no-unused-vars": "off",
	}
};
