/*eslint-env node*/
module.exports = {
	env: {
		browser: true,
	},
	parser: 'babel-eslint',
	extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		// Include .prettierrc.js rules
		'prettier/prettier': ['error', {}, { usePrettierrc: true }],
		'react/prop-types': 'off',
		'no-unused-vars': 'off',
	},
	globals: {
		process: 'readonly',
	},
};
