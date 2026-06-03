import type PackageJson from '../package.json';

type RawBndlktEnv = typeof PackageJson extends { bndlkt: { env: infer Env } }
	? Env
	: Record<string, never>;

type MapStrictBndlktTypes<T> = {
	readonly [K in keyof T]: T[K] extends boolean
		? boolean
		: T[K] extends number
			? number
			: T[K] extends string
				? string
				: never;
};

declare global {
	const bndlkt: {
		readonly env: MapStrictBndlktTypes<RawBndlktEnv>;
	};
}
