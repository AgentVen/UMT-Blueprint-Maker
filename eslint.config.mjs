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
			// [NOTE] Remember to disable these and fix the code later
			'@stylistic/no-tabs': ['off', 'always'],
			'@stylistic/indent': ['off', 'always'],
			'@stylistic/quotes': ['off', 'alawys'],
		},
	},
];