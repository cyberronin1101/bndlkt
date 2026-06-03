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
			'poc/demo/shared/',
			'**/dist/',
			'**/node_modules/',
			'tmp/',
			'demo/',
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
				ecmaFeatures: {
					jsx: true,
				},
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
			...ts.configs.recommended.reduce(
				(acc, config) => ({
					...acc,
					...config.rules,
				}),
				{},
			),
			...ts.configs.recommendedTypeChecked.reduce(
				(acc, config) => ({
					...acc,
					...config.rules,
				}),
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
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
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
				{
					assertionStyle: 'as',
					objectLiteralTypeAssertions: 'never',
				},
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
				{
					default: 'array',
				},
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
			'react/jsx-first-prop-new-line': [
				'error',
				'multiline',
			],
			'react/jsx-max-props-per-line': [
				'error',
				{
					maximum: 1,
					when: 'always',
				},
			],
			'react/jsx-closing-bracket-location': [
				'error',
				'line-aligned',
			],
			'react/jsx-boolean-value': [
				'error',
				'never',
			],
			'react/function-component-definition': [
				'error',
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function',
				},
			],
			'react/jsx-curly-brace-presence': [
				'error',
				{
					props: 'never',
					children: 'never',
					propElementValues: 'always',
				},
			],
			'react-refresh/only-export-components': [
				'error',
				{
					allowConstantExport: true,
				},
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
					ObjectExpression: {
						multiline: true,
						minProperties: 1,
					},
					ImportDeclaration: 'never',
				},
			],
			'object-property-newline': [
				'error',
				{
					allowAllPropertiesOnSameLine: false,
				},
			],

			// ----- Common ESLint -----
			'no-console': 'warn',
			'no-debugger': 'warn',
			'no-alert': 'error',
			'@typescript-eslint/no-implied-eval': 'error',
			eqeqeq: [
				'error',
				'always',
				{
					null: 'ignore',
				},
			],
			'object-shorthand': [
				'error',
				'always',
			],
			'no-else-return': [
				'error',
				{
					allowElseIf: false,
				},
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

			'@typescript-eslint/naming-convention': [
				'error',
				// 1. Default: everything camelCase, no underscores
				{
					selector: 'default',
					format: ['camelCase'],
					leadingUnderscore: 'forbid',
				},

				// 2. Boolean variables – mandatory prefixes + PascalCase remainder
				{
					selector: 'variable',
					types: ['boolean'],
					format: ['PascalCase'],
					prefix: [
						'is',
						'has',
						'should',
						'can',
						'did',
						'will',
					],
					leadingUnderscore: 'forbid',
				},

				// 3. Global constants: camelCase or UPPER_CASE
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
					leadingUnderscore: 'forbid',
				},

				// 4. Function variables (arrow components, hooks, utilities)
				{
					selector: 'variable',
					types: ['function'],
					format: [
						'camelCase',
						'PascalCase',
					],
					leadingUnderscore: 'forbid',
				},

				// 5. Exported variables (non-functions) – camelCase or UPPER_CASE
				{
					selector: 'variable',
					modifiers: ['exported'],
					format: [
						'camelCase',
						'UPPER_CASE',
					],
					leadingUnderscore: 'forbid',
				},

				// 6. Named functions (function declaration) – camelCase or PascalCase
				{
					selector: 'function',
					format: [
						'camelCase',
						'PascalCase',
					],
					leadingUnderscore: 'forbid',
				},

				// 7. Types, interfaces, enums – PascalCase
				{
					selector: 'typeLike',
					format: ['PascalCase'],
				},

				// 8. Generic type parameters – PascalCase with T prefix
				{
					selector: 'typeParameter',
					format: ['PascalCase'],
					prefix: ['T'],
				},

				// 9. Enum members – UPPER_CASE
				{
					selector: 'enumMember',
					format: ['UPPER_CASE'],
				},

				// 10. Boolean object properties – mandatory prefixes + PascalCase remainder
				{
					selector: 'property',
					types: ['boolean'],
					format: ['PascalCase'],
					prefix: [
						'is',
						'has',
						'should',
						'can',
						'did',
						'will',
					],
					leadingUnderscore: 'forbid',
				},

				// 11. Private boolean properties – prefix + PascalCase remainder + underscore
				{
					selector: 'property',
					modifiers: ['private'],
					types: ['boolean'],
					format: ['PascalCase'],
					prefix: [
						'is',
						'has',
						'should',
						'can',
						'did',
						'will',
					],
					leadingUnderscore: 'require',
				},

				// 12. Unquoted object properties – camelCase or UPPER_CASE, no underscores
				{
					selector: 'property',
					format: [
						'camelCase',
						'UPPER_CASE',
					],
					leadingUnderscore: 'forbid',
				},

				// 13. Quoted properties – no restrictions (external APIs)
				{
					selector: 'property',
					modifiers: ['requiresQuotes'],
					format: null,
				},

				// 14. Private properties – with underscore
				{
					selector: 'property',
					modifiers: ['private'],
					format: ['camelCase'],
					leadingUnderscore: 'require',
				},

				// 15. Public methods – camelCase, no underscores
				{
					selector: 'method',
					format: ['camelCase'],
					leadingUnderscore: 'forbid',
				},

				// 16. Private methods – with underscore
				{
					selector: 'method',
					modifiers: ['private'],
					format: ['camelCase'],
					leadingUnderscore: 'require',
				},

				// 17. Destructured parameters – unchecked (external names)
				{
					selector: 'parameter',
					modifiers: ['destructured'],
					format: null,
				},

				// 18. Regular function parameters – camelCase, _ allowed for unused
				{
					selector: 'parameter',
					format: ['camelCase'],
					leadingUnderscore: 'allow',
				},

				// 19. Destructured variables – unchecked (external keys)
				{
					selector: 'variable',
					modifiers: ['destructured'],
					format: null,
				},

				// 20. Imports – camelCase or PascalCase, _ allowed (lodash etc.)
				{
					selector: 'import',
					format: [
						'camelCase',
						'PascalCase',
					],
					leadingUnderscore: 'allow',
				},
			],
		},
	},

	// Isolated block: Restrict placeholder.ts / index.tsx files to contain strictly imports and exports only
	{
		files: [
			'**/placeholder.ts',
			'**/index.tsx',
		],
		ignores: [
			'poc/demo',
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
			'**/*.js',
			'**/*.cjs',
			'**/*.mjs',
		],
		ignores: [
			'**/*.ts',
			'**/*.tsx',
		],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			'no-console': 'off',
			'no-debugger': 'warn',
			'import/no-default-export': 'off',

			curly: [
				'error',
				'all',
			],
			'no-var': 'error',
			'prefer-const': [
				'error',
				{
					destructuring: 'all',
					ignoreReadBeforeAssign: false,
				},
			],
			eqeqeq: [
				'error',
				'always',
				{
					null: 'ignore',
				},
			],
			'no-else-return': [
				'error',
				{
					allowElseIf: false,
				},
			],
			'object-shorthand': [
				'error',
				'always',
			],
			'no-alert': 'error',

			'object-curly-newline': [
				'error',
				{
					ObjectExpression: {
						multiline: true,
						minProperties: 1,
					},
					ImportDeclaration: 'never',
				},
			],
			'object-property-newline': [
				'error',
				{
					allowAllPropertiesOnSameLine: false,
				},
			],
		},
	},

	// Explicitly commented out to prevent configPrettier from disabling
	// our custom 'object-curly-newline' and 'object-property-newline' rules.
	// This ensures ESLint strictly enforces multi-line block formatting for objects.
	// configPrettier,
];
