declare module '@poc/app-header/index' {
	export { AppHeader as default } from '@poc/app-header/main';
}
declare module '@poc/app-header/main' {
	import type { FC } from 'react';
	import './index.css';
	export const AppHeader: FC;
}
declare module '@poc/app-header' {
	import main = require('@poc/app-header/index');
	export = main;
}
