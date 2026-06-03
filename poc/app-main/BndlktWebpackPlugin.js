// eslint-disable no-console
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

export class BndlktWebpackPlugin {
	apply(compiler) {
		const packageJsonPath = path.resolve(compiler.context, 'package.json');
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
		const bndlktConfig = packageJson.bndlkt || {};

		const mode = compiler.options.mode || 'development';
		const isProd = mode === 'production';

		const rawEnv = bndlktConfig.env || {};
		const usedEnvKeys = new Set();

		const defineMap = {};
		const runtimeEnvManifest = {};
		Object.keys(rawEnv).forEach((key) => {
			const val = rawEnv[key];
			// Determine the primitive type based on its value in JSON
			const valType = typeof val;

			if (isProd) {
				// In production (build): substitute a dynamic expression referencing the bndlkt runtime
				defineMap[`process.env.${key}`] = `window.bndlkt.env.${key}`;
				// Populate the map for bndlkt.json: store the name and computed primitive type
				runtimeEnvManifest[key] = valType;
			} else {
				// In dev: substitute the actual hardcoded value from package.json
				defineMap[`process.env.${key}`] = JSON.stringify(val);
			}
		});

		// 🎯 BUILD THE SUBSTITUTION MAP WITH A BULLETPROOF DETECTOR
		Object.keys(rawEnv).forEach((key) => {
			const val = rawEnv[key];
			const valType = typeof val;

			if (isProd) {
				runtimeEnvManifest[key] = valType;

				// WEBPACK 5 MANEUVER: Use a getter function inside DefinePlugin!
				// Webpack will call this function ONLY when it actually finds process.env.KEY in the component code!
				defineMap[`bndlkt.env.${key}`] = webpack.DefinePlugin.runtimeValue(
					() => {
						console.log(`✨ [bndlkt-success] Found and replaced variable: "bndlkt.env.${key}"`);
						usedEnvKeys.add(key); // We've caught the fact of usage by the module!

						// Return the runtime string that will be written into the final bundle
						return `window.bndlkt.env.${key}`;
					},
					{
						version: '1',
					},
				); // Required parameter for Webpack 5 cache invalidation
			} else {
				// In dev, simply substitute hardcoded values
				defineMap[`bndlkt.env.${key}`] = JSON.stringify(val);
			}
		});

		// 🎯 INJECTION FIX: Force-push the DefinePlugin directly into the compiler's plugins array.
		// This ensures that Webpack CLI cannot ignore or overwrite our substitution!
		compiler.options.plugins = compiler.options.plugins || [];
		compiler.options.plugins.push(new webpack.DefinePlugin(defineMap));

		// skip if not production mode

		if (!isProd) {
			return;
		}

		const shortName = packageJson.name;
		const version = packageJson.version;
		const bndlktId = `${shortName}@${version}`;

		const explicitExternals = bndlktConfig.externals || [];

		// At the start of the plugin, create a collection for lazy modules
		const lazyRequestSet = new Set();

		// 🎯 OUR NEW DATA STRUCTURES FOR THE MANIFEST (COLLECTED ON THE FLY)
		const manifestExternals = {};
		const manifestRemotes = {};

		const prodDeps = Object.keys(packageJson.dependencies || {});
		const peerDeps = Object.keys(packageJson.peerDependencies || {});
		const allExternalDeps = Array.from(
			new Set([
				...prodDeps,
				...peerDeps,
				...explicitExternals,
			]),
		);

		// Obtain the normal module factory
		compiler.hooks.normalModuleFactory.tap('BndlktWebpackPlugin', (normalModuleFactory) => {
			normalModuleFactory.hooks.beforeResolve.tap('BndlktWebpackPlugin', (resolveData) => {
				if (!resolveData || !resolveData.request) {
					return;
				}
				// Check if the dependency is a dynamic import
				const dep = resolveData.dependencies && resolveData.dependencies[0];
				if (dep && dep.constructor && dep.constructor.name === 'ImportDependency') {
					lazyRequestSet.add(resolveData.request);
				}
			});
		});

		// Modify Webpack externals
		compiler.options.externalsType = 'commonjs';
		compiler.options.externals = [
			function (param, callback) {
				const { request } = param;
				if (!request) {
					return callback();
				}

				// Check if the base request name (or the request itself) matches our externals
				const isExternal = allExternalDeps.some((dep) => request === dep);

				if (isExternal) {
					const parts = request.split('/');
					const rootDepName = request.startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0];

					// Get the original version objects from packageJson
					const rawProdDeps = packageJson.dependencies || {};
					const rawPeerDeps = packageJson.peerDependencies || {};

					// Look up the version: first by root name (for sub-modules), then by full request
					let targetSemverRange =
						rawProdDeps[rootDepName] ||
						rawPeerDeps[rootDepName] ||
						rawProdDeps[request] ||
						rawPeerDeps[request];

					// 2. Regex for valid ranges: only digits, dots, hyphens, spaces, ^, ~, =, | are allowed
					const isValidSemverPattern =
						targetSemverRange && /^[0-9.\-\s^~=|]+$/.test(targetSemverRange);

					if (!isValidSemverPattern) {
						try {
							// Safely go into node_modules to get the real version that was installed during the build
							const depPkgPath = path.resolve(
								compiler.context,
								'node_modules',
								rootDepName,
								'package.json',
							);
							const depPkg = JSON.parse(fs.readFileSync(depPkgPath, 'utf-8'));

							if (depPkg.version) {
								// Convert the exact version from node_modules into a safe caret range
								const oldRange = targetSemverRange;
								targetSemverRange = `^${depPkg.version}`;
								console.log(
									`🔄 [bndlkt-fix] Converted non-standard range "${oldRange}" -> "${targetSemverRange}" for package "${rootDepName}"`,
								);
							}
						} catch {
							// If the package is physically absent from node_modules, use a wildcard as a last resort
							targetSemverRange = '*';
						}
					}

					if (!targetSemverRange) {
						// If the package came only from explicitExternals, use a wildcard
						targetSemverRange = '*';
					}

					// Check if this module is marked as lazy in our hook
					const isLazy = lazyRequestSet.has(request);
					if (isLazy) {
						console.log(`🚀 [bndlkt-compiler] Generating PROMISE for lazy: ${request}`);

						// Accumulate into the lazy registry for the manifest
						manifestRemotes[request] = targetSemverRange;

						// Write pure JS code that will be injected instead of require()
						const promiseCode =
							`new Promise(function(res, rej) { ` +
							`if (!window.bndlkt) return rej(new Error("[bndlkt] Runtime missing")); ` +
							`window.bndlkt.requireLazy('${bndlktId}', '${request}')` +
							`.then(res)` +
							`.catch(rej); ` +
							`})`;

						// CORRECT CALLBACK: 2nd argument - type 'promise', 3rd argument - the JS code itself
						return callback(null, `promise ` + promiseCode);
					}

					// Return the reference to the context object.
					// Webpack will substitute this expression wherever this import is used.
					console.log(`📦 [bndlkt-compiler] Generating COMMONJS for static: ${request}`);

					// Accumulate into the critical registry for the manifest
					manifestExternals[request] = targetSemverRange;

					// CORRECT CALLBACK: 2nd argument - type 'commonjs', 3rd argument - the package name for require()
					return callback(null, `commonjs ` + request);
				}
				callback();
			},
		];

		// 3. --- MANIFEST BUILD HOOK
		compiler.hooks.thisCompilation.tap('BndlktWebpackPlugin', (compilation) => {
			compilation.hooks.processAssets.tap(
				{
					name: 'BndlktWebpackPlugin',
					stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
				},
				() => {
					// Deduplication: if a module ended up in critical (during build), remove it from lazy remotes
					Object.keys(manifestExternals).forEach((key) => delete manifestRemotes[key]);

					const filteredRuntimeEnv = {};
					usedEnvKeys.forEach((key) => {
						if (runtimeEnvManifest[key]) {
							filteredRuntimeEnv[key] = runtimeEnvManifest[key];
						}
					});

					// Build the clean manifest from the registries we collected during the externals step
					const manifest = {
						id: bndlktId,
						name: shortName,
						version,
						externals: manifestExternals,
						env: filteredRuntimeEnv,
						remotes: manifestRemotes,
					};

					// Write the manifest into Webpack assets
					compilation.emitAsset(
						'bndlkt.json',
						new webpack.sources.RawSource(JSON.stringify(manifest, null, 2)),
					);

					console.log('✅ [bndlkt] bndlkt.json manifest build completed successfully!');
				},
			);
		});

		// --- Build the wrapper via BannerPlugin ---
		const banner = `window.bndlkt.register("${bndlktId}", function(require, module, exports) {
		(function(require, module, exports) {\n`;

		const footer = `\n}).call(exports, require, module, exports);
		});`;

		new webpack.BannerPlugin({
			banner,
			raw: true,
			entryOnly: true,
		}).apply(compiler);
		new webpack.BannerPlugin({
			banner: footer,
			raw: true,
			entryOnly: true,
			footer: true,
		}).apply(compiler);
	}
}
