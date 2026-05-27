import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import-x';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { fixupPluginRules } from '@eslint/compat';
import perfectionist from 'eslint-plugin-perfectionist';
import ts from 'typescript-eslint';

export default [
	{
		ignores: [
			'**/dist/',
			'**/node_modules/',
			'tmp/',
			'poc/app-main/backet', //todo remove after poc
		],
	},

	js.configs.recommended,

	{
		files: [
			'**/*.ts',
			'**/*.tsx',
		],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: { jsx: true },
				tsconfigRootDir: import.meta.dirname,
				projectService: true,
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			react: reactPlugin,
			'react-refresh': reactRefresh,
			perfectionist,

			import: fixupPluginRules(importPlugin),
			'react-hooks': fixupPluginRules(reactHooksPlugin),
		},
		settings: {
			react: {
				version: 'detect',
			},
			'import-x/resolver-next': [
				createTypeScriptImportResolver({
					alwaysTryTypes: true,
					projectService: true,
				}),
			],
		},
		rules: {
			// ----- TypeScript -----
			...ts.configs.recommended.reduce((acc, config) => ({ ...acc, ...config.rules }), {}),
			...ts.configs.recommendedTypeChecked.reduce(
				(acc, config) => ({ ...acc, ...config.rules }),
				{},
			),
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/await-thenable': 'error',
			'@typescript-eslint/require-await': 'error',
			'@typescript-eslint/no-misused-promises': 'error',
			'@typescript-eslint/prefer-promise-reject-errors': 'error',
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/strict-boolean-expressions': [
				'error',
				{
					allowString: true,
					allowNumber: false,
					allowNullableBoolean: true,
					allowNullableString: true,
					allowNullableNumber: true,
				},
			],

			// ----- unsafe -----
			'@typescript-eslint/no-unsafe-argument': 'error',
			'@typescript-eslint/no-unsafe-assignment': 'error',
			'@typescript-eslint/no-unsafe-call': 'error',
			'@typescript-eslint/no-unsafe-member-access': 'error',
			'@typescript-eslint/no-unsafe-return': 'error',
			'@typescript-eslint/no-unsafe-declaration-merging': 'error',

			// ----- Additional Best Practices -----

			'@typescript-eslint/no-unnecessary-condition': 'error',
			'@typescript-eslint/explicit-function-return-type': [
				'error',
				{
					allowTypedFunctionExpressions: true,
					allowExpressions: false,
				},
			],
			'@typescript-eslint/restrict-template-expressions': 'error',
			'@typescript-eslint/no-unnecessary-type-assertion': 'error',
			'@typescript-eslint/no-unsafe-type-assertion': 'error',
			'@typescript-eslint/consistent-type-assertions': [
				'error',
				{ assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
			],
			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/ban-ts-comment': [
				'error',
				{
					'ts-ignore': 'allow-with-description',
					'ts-expect-error': 'allow-with-description',
					'ts-nocheck': 'allow-with-description',
					'ts-check': 'allow-with-description',
					minimumDescriptionLength: 5,
				},
			],
			'@typescript-eslint/prefer-ts-expect-error': 'error',
			'@typescript-eslint/array-type': [
				'error',
				{ default: 'array' },
			], // Array<T>
			'@typescript-eslint/prefer-readonly': 'error',
			'@typescript-eslint/no-restricted-types': [
				'error',
				{
					types: {
						'{}': 'Use `Record<string, unknown>` or a specific object type instead of empty object `{}`.',
						object: 'Use `Record<string, unknown>` instead of `object`.',
						Object: 'Use `object` or `Record<string, unknown>` instead of `Object`.',
						Function: 'Use a specific call signature, e.g., `() => void`.',
						Number: 'Use the primitive type `number`.',
						String: 'Use the primitive type `string`.',
						Boolean: 'Use the primitive type `boolean`.',
						'React.FC': 'Use explicit props type to avoid implicit `children`.',
						'React.FunctionComponent': 'Use explicit props type to avoid implicit `children`.',
						FC: 'Use explicit props type to avoid implicit `children`.',
						FunctionComponent: 'Use explicit props type to avoid implicit `children`.',
					},
				},
			],
			'@typescript-eslint/consistent-type-definitions': [
				'error',
				'type',
			],

			// ----- Imports -----
			'import/no-duplicates': 'error',
			'import/no-useless-path-segments': 'error',
			'import/no-default-export': 'error',
			'import/no-cycle': 'error',
			'perfectionist/sort-imports': [
				'error',
				{
					type: 'alphabetical',
					order: 'asc',
					groups: [
						'builtin', // Native Node.js modules (e.g., fs, path)
						'external', // Third-party packages from node_modules (e.g., react, vite)
						'internal', // Internal monorepo packages (@bndlkt/*)
						[
							'parent',
							'sibling',
							'index',
						],
						'unknown',
					],
					internalPattern: ['^@bndlkt/.*'],
					newlinesBetween: 'ignore',
				},
			],
			// ----- React -----
			'react/react-in-jsx-scope': 'off', // Not required in React 17+
			'react/prop-types': 'off', // TypeScript replaces prop-types
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'error',
			'react/self-closing-comp': 'error',
			'react/jsx-boolean-value': [
				'error',
				'never',
			],
			'react/function-component-definition': [
				'error',
				{ namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
			],
			'react/jsx-curly-brace-presence': [
				'error',
				{ props: 'never', children: 'never', propElementValues: 'always' },
			],
			'react-refresh/only-export-components': [
				'error',
				{ allowConstantExport: true },
			],
			'react/jsx-no-leaked-render': [
				'error',
				{
					validStrategies: [
						'ternary',
						'coerce',
					],
				},
			],

			// ----- Object and Array Formatting -----

			'object-curly-newline': [
				'error',
				{
					ObjectExpression: { multiline: true, minProperties: 1 },
					ImportDeclaration: 'never',
				},
			],
			'object-property-newline': [
				'error',
				{ allowAllPropertiesOnSameLine: false },
			],

			// ----- Common ESLint -----
			'no-console': 'warn',
			'no-debugger': 'warn',
			'no-alert': 'error',
			'@typescript-eslint/no-implied-eval': 'error',
			eqeqeq: [
				'error',
				'always',
				{ null: 'ignore' },
			],
			'object-shorthand': [
				'error',
				'always',
			],
			'no-else-return': [
				'error',
				{ allowElseIf: false },
			],
			curly: [
				'error',
				'all',
			],
			'no-var': 'error',
			'no-shadow': 'off',
			'@typescript-eslint/no-shadow': 'error',

			// ----- var and const -----
			'prefer-const': [
				'error',
				{
					destructuring: 'all',
					ignoreReadBeforeAssign: false,
				},
			],

			// ----- Naming Conventions -----
			// todo check naming
			// Enforces strict, consistent naming standards across the monorepo
			'@typescript-eslint/naming-convention': [
				'error',
				// Standard fallback for everything: strictly camelCase
				{ selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow' },

				// Global or constant variables: allow camelCase or strict UPPER_CASE
				{
					selector: 'variable',
					modifiers: [
						'const',
						'global',
					],
					format: [
						'camelCase',
						'UPPER_CASE',
					],
				},

				// Exported variables: allow PascalCase specifically for React arrow-function components
				{
					selector: 'variable',
					modifiers: ['exported'],
					format: [
						'camelCase',
						'UPPER_CASE',
						'PascalCase',
					],
				},

				// Functions (standard declarations): camelCase for helpers, PascalCase for components
				{
					selector: 'function',
					format: [
						'camelCase',
						'PascalCase',
					],
				},

				// Types, Interfaces, and Enums: strictly PascalCase
				{ selector: 'typeLike', format: ['PascalCase'] },

				// Enum members: strictly UPPER_CASE
				{ selector: 'enumMember', format: ['UPPER_CASE'] },

				// Object properties: disable strict checks for quoted keys to allow external API payloads,
				// microfrontend manifests, and network headers (e.g., 'Content-Type', snake_case keys)
				{
					selector: 'property',
					format: [
						'camelCase',
						'UPPER_CASE',
						'snake_case',
					],
					leadingUnderscore: 'allow',
				},
				{
					selector: 'property',
					modifiers: ['requiresQuotes'],
					format: null,
				},

				// Private class properties and methods: require a leading underscore
				{
					selector: 'property',
					modifiers: ['private'],
					format: ['camelCase'],
					leadingUnderscore: 'require',
				},
				{
					selector: 'method',
					modifiers: ['private'],
					format: ['camelCase'],
					leadingUnderscore: 'require',
				},

				// Function parameters: camelCase only, allow leading underscore for unused ones (_param)
				{ selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },

				// Destructured variables: safely ignore formatting to match external API responses
				{ selector: 'variable', modifiers: ['destructured'], format: null },
			],
		},
	},

	// Isolated block: Restrict placeholder.ts / index.tsx files to contain strictly imports and exports only
	{
		files: [
			'**/placeholder.ts',
			'**/index.tsx',
		],
		rules: {
			'no-restricted-syntax': [
				'error',
				{
					selector:
						'Program > :not(ImportDeclaration, ExportNamedDeclaration, ExportAllDeclaration, EmptyStatement)',
					message:
						'Index files must strictly contain only imports and exports. No inline business logic allowed.',
				},
			],
		},
	},

	// Overrides for configuration files
	{
		files: [
			'**/vite.config.ts',
			'**/tsup.config.ts',
			'**/eslint.config.js',
			'**/prettier.config.js',
			'**/commitlint.config.сjs',
		],
		rules: {
			'import/no-default-export': 'off',
		},
	},

	// Explicitly commented out to prevent configPrettier from disabling
	// our custom 'object-curly-newline' and 'object-property-newline' rules.
	// This ensures ESLint strictly enforces multi-line block formatting for objects.
	// configPrettier,
];
