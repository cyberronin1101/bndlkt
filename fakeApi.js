const originalFetch = window.fetch;

const scopeData = {
	env: {
		__SOME_VAR__: 'release id 1',
		_BOOL_: true,
		API_TIMEOUT_MS: 300,
	},
	bundles: {
		0: {
			id: '@poc/app-main@0.0.1',
			baseUrl: '/shared/@poc--app-main/0.0.1',
			files: ['bundle.js'],
			deps: [
				1,
				3,
			],
			lazyDeps: [5],
		},
		1: {
			id: 'react@19.2.6',
			baseUrl: '/shared/react/19.2.6',
			files: ['bundle.js'],
			deps: [],
			lazyDeps: [],
		},
		2: {
			id: 'react-dom@19.2.6',
			baseUrl: '/shared/react-dom/19.2.6',
			files: ['bundle.js'],
			deps: [1],
			lazyDeps: [],
		},
		3: {
			id: 'react-dom/client@19.2.6',
			baseUrl: '/shared/react-dom--client/19.2.6',
			files: ['bundle.js'],
			deps: [1],
			lazyDeps: [],
		},
		4: {
			id: 'lodash@4.18.1',
			baseUrl: '/shared/lodash/4.18.1',
			files: ['bundle.js'],
			deps: [],
			lazyDeps: [],
		},
		5: {
			id: '@poc/app-header@0.0.1',
			baseUrl: '/shared/@poc--app-header/0.0.1',
			files: ['bundle.js'],
			deps: [
				1,
				3,
			],
			lazyDeps: [],
		},
	},
};
// Mock responses base
const mockEndpoints = {
	'/api/scopes': {
		scopes: [
			'release',
			'pre-release',
			'develop',
		],
		resetScope: 'release',
	},

	'/api/config': scopeData,
	'/api/config?scope=release': scopeData,
	'/api/config?scope=pre-release': {
		...scopeData,
		env: {
			__SOME_VAR__: 'release id 2',
			_BOOL_: false,
			API_TIMEOUT_MS: 400,
		},
		bundles: {
			...scopeData.bundles,
			0: {
				id: '@poc/app-main@0.0.2',
				baseUrl: '/shared/@poc--app-main/0.0.2',
				files: ['bundle.js'],
				deps: [
					1,
					3,
				],
				lazyDeps: [5],
			},
			5: {
				id: '@poc/app-header@0.0.2',
				baseUrl: '/shared/@poc--app-header/0.0.2',
				files: ['bundle.js'],
				deps: [
					1,
					3,
				],
				lazyDeps: [],
			},
		},
	},
	'/api/config?scope=develop': {
		...scopeData,
		env: {
			__SOME_VAR__: 'release id 3',
			_BOOL_: false,
			API_TIMEOUT_MS: 300,
		},
		bundles: {
			...scopeData.bundles,
			0: {
				id: '@poc/app-main@0.0.2',
				baseUrl: '/shared/@poc--app-main/0.0.2',
				files: ['bundle.js'],
				deps: [
					1,
					3,
				],
				lazyDeps: [5],
			},
			5: {
				id: '@poc/app-header@0.0.3',
				baseUrl: '/shared/@poc--app-header/0.0.3',
				files: ['bundle.js'],
				deps: [
					1,
					3,
				],
				lazyDeps: [],
			},
		},
	},
};

window.fetch = async (input, init) => {
	const url = typeof input === 'string' ? input : input.url;
	const urlObj = new URL(url, location.origin);

	// Remove the uninformative rid
	const searchParams = new URLSearchParams(urlObj.search);
	searchParams.delete('rid');
	const normalizedSearch = searchParams.toString();
	// todo
	// const normalizedPath = urlObj.pathname + (normalizedSearch ? '?' + normalizedSearch : '');

	// Find a matching mock
	const mockKey = Object.keys(mockEndpoints).find((route) => {
		const [
			routePath,
			routeQuery,
		] = route.split('?');
		// The path must match
		if (urlObj.pathname !== routePath) {
			return false;
		}

		// If the mock has no query, then the request after cleanup should also have no parameters
		if (!routeQuery) {
			return !normalizedSearch;
		}

		// Check that all parameters from the mock are present and match
		const routeParams = new URLSearchParams(routeQuery);
		for (const [
			key,
			value,
		] of routeParams) {
			if (searchParams.get(key) !== value) {
				return false;
			}
		}
		return true;
	});

	if (mockKey) {
		console.log(`🌐 [mock-api] Intercepted request: ${url}`);
		const data = mockEndpoints[mockKey];

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	return originalFetch(input, init);
};
