import jsdoc from 'eslint-plugin-jsdoc';

export default [
	{
		ignores: ['node_modules/**', '**/*.transpiled.min.js'],
	},
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		plugins: {
			jsdoc,
		},
		rules: {
			semi: ['error', 'always'],
			indent: ['error', 'tab', { MemberExpression: 1, SwitchCase: 1 }],
			'no-tabs': 0,
			quotes: ['error', 'single', { allowTemplateLiterals: true }],
			'space-in-parens': ['error', 'never'],
			'block-spacing': ['error'],
			'object-curly-spacing': ['error', 'always'],
			'one-var': ['error', 'never'],
			'no-console': ['warn'],
			'keyword-spacing': ['error', { before: true, after: true }],
			'comma-spacing': ['error', { before: false, after: true }],
			'space-infix-ops': 'error',
			'no-debugger': ['warn'],
			'global-require': ['warn'],
			'arrow-body-style': ['warn', 'always'],
			'handle-callback-err': ['error', '^.*(e|E)rr'],
			'implicit-arrow-linebreak': ['warn', 'beside'],
			'no-template-curly-in-string': ['error'],
		},
	},
];
