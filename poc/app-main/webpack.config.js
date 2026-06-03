import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { BndlktWebpackPlugin } from './BndlktWebpackPlugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
	entry: './src/main.tsx',
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		chunkFilename: 'chunks/[name].[contenthash:8].js',
		clean: true,
		library: {
			type: 'commonjs',
		},
	},
	resolve: {
		extensions: [
			'.ts',
			'.tsx',
			'.js',
			'.jsx',
		],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
			{
				test: /\.svg$/,
				type: 'asset/resource',
			},
		],
	},
	devServer: {
		port: 8080,
		open: true,
		hot: true,
	},
	// optimization: {
	// 	minimize: false,
	// },
	cache: {
		type: 'filesystem',
		buildDependencies: {
			config: [__filename],
		},
	},
};

export default (_env, argv) => {
	const mode = argv.mode ?? 'development';
	const isProd = mode === 'production';

	return {
		...config,
		mode,
		plugins: [
			new HtmlWebpackPlugin({
				template: './index.html',
				// FIX: Disable injection only for production.
				// In dev, Webpack will insert the script tag for local development.
				inject: isProd ? false : 'body',
			}),
			new BndlktWebpackPlugin(),
		],
	};
};
