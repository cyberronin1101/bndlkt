export default {
	plugins: [
		{
			rules: {
				'bracketed-scope-required': (parsed) => {
					const { header } = parsed;
					if (!header) {
						return [
							false,
							'Commit message cannot be empty',
						];
					}

					// Allowed scopes
					const allowedScopes = [
						'common',
						'demo',
						'admin',
						'cli',
						'core',
						'init',
						'plugin',
						'logger',
						'poc',
					];

					// Regex pattern: [scope] type: subject
					const match = header.match(/^\[([a-z0-9-]+)] ([a-z]+): (.+)$/);
					if (!match) {
						return [
							false,
							`Format must be: "[scope] type: subject". Example: [admin] feat: add login page`,
						];
					}

					const [
						,
						scope,
						type,
						subject,
					] = match;

					// Scope validation
					if (!allowedScopes.includes(scope)) {
						return [
							false,
							`Scope "${scope}" is not allowed. Allowed scopes: ${allowedScopes.join(', ')}`,
						];
					}

					// Type validation
					const allowedTypes = [
						'feat',
						'fix',
						'docs',
						'style',
						'refactor',
						'perf',
						'test',
						'chore',
						'revert',
					];
					if (!allowedTypes.includes(type)) {
						return [
							false,
							`Type "${type}" is not allowed. Allowed types: ${allowedTypes.join(', ')}`,
						];
					}

					if (subject.trim() === '') {
						return [
							false,
							'Subject cannot be empty',
						];
					}
					if (/^[A-Z]/.test(subject)) {
						return [
							false,
							'Subject must start with a lowercase letter',
						];
					}
					if (/\.$/.test(subject)) {
						return [
							false,
							'Subject must not end with a period',
						];
					}

					return [true];
				},
			},
		},
	],
	rules: {
		'bracketed-scope-required': [
			2,
			'always',
		],
		'header-max-length': [
			2,
			'always',
			100,
		],
		// Disable standard rules via [0] to prevent conflicts and layout crashes
		'type-enum': [0],
		'subject-case': [0],
		'subject-full-stop': [0],
		'scope-empty': [0],
		'scope-case': [0],
	},
};
