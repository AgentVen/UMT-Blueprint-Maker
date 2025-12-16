import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
	pluginJs.configs.recommended,
	stylistic.configs.recommended,
	{
		languageOptions: { globals: globals.browser },
		rules: {
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/brace-style': ['error', '1tbs'],
			'@stylistic/spaced-comments': ['off'],
			'@stylistic/no-tabs': ['off'],
			'@stylistic/indent': ['off'],
			'@stylistic/no-multiple-empty-lines': ['off'],
		},
	},
];
