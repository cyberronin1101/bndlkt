import path from 'path';
import fs from 'fs';
import webpack from 'webpack';

// todo update semver handling from the webpack plugin

function runWebpackCompiler(config) {
	return new Promise((resolve, reject) => {
		webpack(config, (err, stats) => {
			if (err) {
				return reject(err);
			}
			if (stats.hasErrors()) {
				const info = stats.toJson({
					errors: true,
				});
				const errorMessages = info.errors.map((e) => e.message || JSON.stringify(e)).join('\n');
				return reject(new Error(errorMessages));
			}
			resolve();
		});
	});
}

async function buildAll() {
	console.log('🚀 BUILDING SHARED BUNDLES (including subpaths from bndlkt.externals)...');

	const rootPkgPath = path.resolve(process.cwd(), 'package.json');
	const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf-8'));

	const prodDeps = Object.keys(rootPkg.dependencies || {});
	const peerDeps = Object.keys(rootPkg.peerDependencies || {});

	const bndlktConfig = rootPkg.bndlkt || {};
	const explicitExternals = bndlktConfig.externals || [];

	const allLibraries = Array.from(
		new Set([
			...prodDeps,
			...peerDeps,
			...explicitExternals,
		]),
	);

	if (allLibraries.length === 0) {
		console.log('⚠️ No dependencies to build.');
		return;
	}

	for (const libName of allLibraries) {
		if (
			!libName ||
			libName.startsWith('.') ||
			libName.startsWith('/') ||
			path.isAbsolute(libName)
		) {
			continue;
		}

		let version = '0.0.0';
		let targetPkg = {}; // We'll store the library's own package.json here

		const parts = libName.split('/');
		const rootPackageName = libName.startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0];

		const libDir = path.resolve(process.cwd(), 'node_modules', rootPackageName);
		try {
			targetPkg = JSON.parse(fs.readFileSync(path.join(libDir, 'package.json'), 'utf-8'));
			version = targetPkg.version;
		} catch {
			console.warn(
				`⚠️ Could not read package.json for root package ${rootPackageName} (requested as ${libName})`,
			);
		}

		console.log(`\n📦 Building macro-package: ${libName}@${version}`);

		// CRITICAL FIX: Collect externals only from the REAL dependencies of the package being built
		const targetLibDeps = new Set([
			...Object.keys(targetPkg.dependencies || {}),
			...Object.keys(targetPkg.peerDependencies || {}),
		]);

		const externalMap = {};
		const manifestDeps = {};

		for (const dep of allLibraries) {
			if (dep === libName) {
				continue;
			}

			// Extract the root of the external dependency to check if it's in the package.json of the library being built
			const depParts = dep.split('/');
			const depRootName = dep.startsWith('@') ? `${depParts[0]}/${depParts[1]}` : depParts[0];

			// If the library being built REALLY depends on this package (or its subpath)
			if (targetLibDeps.has(depRootName)) {
				// 1. Add to Webpack mapping for the build
				externalMap[dep] = dep;

				// 2. Look up its exact version for the bndlkt.json manifest
				try {
					const depPkg = JSON.parse(
						fs.readFileSync(
							path.resolve(process.cwd(), 'node_modules', depRootName, 'package.json'),
							'utf-8',
						),
					);
					manifestDeps[dep] = depPkg.version;
				} catch {
					manifestDeps[dep] = 'unknown';
				}
			}
		}

		const safeOutputName = libName.replace('/', '--');
		const outputPath = path.resolve(process.cwd(), `dist/shared/${safeOutputName}/${version}`);

		const bndlktId = `${libName}@${version}`;

		const banner = `window.bndlkt.register("${bndlktId}", function(require, module, exports) {
		(function(require, module, exports) {\n`;

		const footer = `\n}).call(exports, require, module, exports);
		});`;

		const config = {
			mode: 'production',
			target: 'web',
			entry: {
				[libName]: libName,
			},
			output: {
				path: outputPath,
				filename: 'bundle.js',
				clean: true,
				library: {
					type: 'commonjs',
				},
			},
			externalsType: 'commonjs',
			externals: externalMap, // Now only real dependencies end up here
			optimization: {
				runtimeChunk: false,
				usedExports: false,
				providedExports: true,
				sideEffects: true,
				splitChunks: false,
			},
			plugins: [
				new webpack.BannerPlugin({
					banner,
					raw: true,
					entryOnly: true,
				}),
				new webpack.BannerPlugin({
					banner: footer,
					raw: true,
					entryOnly: true,
					footer: true,
				}),

				{
					apply(compiler) {
						compiler.hooks.thisCompilation.tap('BndlktSharedManifestPlugin', (compilation) => {
							compilation.hooks.processAssets.tap(
								{
									name: 'BndlktSharedManifestPlugin',
									stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
								},
								() => {
									const criticalDeps = {};
									const lazyRemotes = {};

									// For shared libraries, we take the honest dependency manifest,
									// which you have already calculated based on the package.json of this library!
									// They are always critical (externals).
									Object.keys(manifestDeps).forEach((depName) => {
										criticalDeps[depName] = manifestDeps[depName];
									});

									// Build the split manifest structure
									const bndlktData = {
										id: bndlktId,
										name: libName,
										version,
										externals: criticalDeps, // Now it is guaranteed to be populated with versions
										remotes: lazyRemotes, // For libraries, it always stays empty
									};

									const fileSource = JSON.stringify(bndlktData, null, 2);
									compilation.emitAsset('bndlkt.json', new webpack.sources.RawSource(fileSource));
								},
							);
						});
					},
				},
			],
		};

		try {
			await runWebpackCompiler(config);
			console.log(`✅ Successfully built: ${outputPath}/remoteEntry.js`);
			console.log(`📝 Dependency graph manifest created: ${outputPath}/bndlkt.json`);
		} catch (error) {
			console.error(`❌ Build error for ${libName}:`, error.message);
			process.exit(1);
		}
	}

	console.log('\n🎉 ALL SHARED BUNDLE BUILDS COMPLETED!');
}

buildAll();
