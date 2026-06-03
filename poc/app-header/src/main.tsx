// AppHeader.tsx (v0.0.3)
import type { FC } from 'react';
import imgExample from './assets/img.png';
import './index.css';

export const AppHeader: FC = () => {
	return (
		<header className="app-header">
			<div className="app-header__left">
				<img
					src={imgExample}
					alt="Demo asset"
					className="app-header__asset app-header__asset--rounded"
					title="Assets imported via relative path inside a remote bndlkt bundle"
				/>
			</div>
			<div className="app-header__right">
				<div className="app-header__text">
					<h2 className="app-header__title">
						@poc/app-header <span className="app-header__version">v0.0.3</span>
					</h2>
					<p className="app-header__subtitle">
						Demonstrates on‑demand bundle loading &amp; asset path resolution in lazy‑loaded chunks.
					</p>
					<p className="app-header__added-text">
						✨ Here could be some description added in v0.0.3
					</p>
				</div>
				<div className="app-header__badges">
					<span className="app-header__badge">📦 Remote Bundle</span>
					<span className="app-header__badge">✅ Assets Verified</span>
					<span className="app-header__badge app-header__badge--version">v0.0.3</span>
				</div>
				<p className="app-header__shared-deps">
					Shared deps: <code>react</code>, <code>react-dom/client</code> (provided by bndlkt graph)
				</p>
			</div>
		</header>
	);
};
