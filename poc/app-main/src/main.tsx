// Dashboard.tsx (v0.0.2)
import debounce from 'lodash/debounce';
import type { FC } from 'react';
import { StrictMode, lazy, useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

export const LazyAppHeader = lazy(() => import('@poc/app-header'));

const LazyComponent = lazy(() =>
	import('./banner').then(({ Banner }) => ({
		default: Banner,
	})),
);

export const Dashboard: FC = () => {
	const [
		isShowHeader,
		setShowHeader,
	] = useState<boolean>(false);
	const [
		counter,
		setCounter,
	] = useState<number>(0);

	const handleClick = debounce(() => {
		setCounter((prev) => prev + 1);
	}, 300);

	return (
		<div className="dashboard">
			<div className="app-version">app-main v0.0.2</div>

			<div className="remote-block">
				{!isShowHeader ? (
					<button
						className="ant-btn ant-btn-primary"
						onClick={() => setShowHeader(true)}
					>
						Load AppHeader lazily
					</button>
				) : null}

				{isShowHeader ? (
					<Suspense
						fallback={<div className="loading-placeholder">Loading microfrontend header…</div>}
					>
						<LazyAppHeader />
					</Suspense>
				) : null}
			</div>

			<div className="env-section">
				<h3>Environment (bndlkt.env)</h3>
				<div className="env-table">
					<span className="env-key">__SOME_VAR__</span>
					<span className="env-value">{bndlkt.env.__SOME_VAR__}</span>
					<span className="env-type">string</span>

					<span className="env-key">_BOOL_</span>
					<span className="env-value">{String(bndlkt.env._BOOL_)}</span>
					<span className="env-type">boolean</span>

					<span className="env-key">API_TIMEOUT_MS</span>
					<span className="env-value">{bndlkt.env.API_TIMEOUT_MS}</span>
					<span className="env-type">number</span>
				</div>
			</div>

			<Suspense fallback={<div className="loading-placeholder">Loading chunk…</div>}>
				<LazyComponent />
			</Suspense>

			<div className="demo-section">
				<h3>Tree shaking demo: lodash</h3>
				<div className="demo-content">
					<button
						className="ant-btn"
						onClick={handleClick}
					>
						Increase counter
					</button>
					<span className="demo-counter">Counter: {counter}</span>
					<span className="demo-debounce">debounce: 300ms</span>
				</div>
				<p className="demo-description">
					Uses <code>import debounce from 'lodash/debounce'</code>. Thanks to bndlkt, only the{' '}
					<code>debounce</code> function is included in the bundle, not the whole lodash.
					Package‑level tree shaking works even with CommonJS modules.
				</p>
			</div>

			<div className="demo-section">
				<h3>Externals demo: react-dom</h3>
				<p className="demo-description">
					<code>react-dom</code> is not used in the code, so it is completely excluded from the
					bundle. The required <code>react-dom/client</code> is provided as an external dependency
					via bndlkt and loaded separately. This avoids duplication and reduces bundle size.
				</p>
			</div>

			<div className="features-section">
				<h3>Why bndlkt?</h3>
				<div className="features-grid">
					<div className="feature-card">
						<h4>⚡ Parallel Loading</h4>
						<p>
							The bundle and all its dependencies are fetched simultaneously with{' '}
							<code>Promise.all</code>, eliminating network waterfalls.
						</p>
					</div>
					<div className="feature-card">
						<h4>🔄 Scope Switching</h4>
						<p>
							Switch environments (release, pre-release, develop) on the fly without rebuilding a
							single bundle.
						</p>
					</div>
					<div className="feature-card">
						<h4>🧩 Centralized Versioning</h4>
						<p>
							The backend constructs a version graph per scope, guaranteeing a single consistent
							version of each dependency with no duplication.
						</p>
					</div>
					<div className="feature-card">
						<h4>📋 Declarative Contract</h4>
						<p>
							All environment variables and external dependencies are declared in{' '}
							<code>package.json</code> – no extra config files or runtime parsing.
						</p>
					</div>
				</div>
			</div>

			<div className="info-block">
				<span className="badge">Ecosystem Environment {counter}</span>
				<h1>bndlkt Core Orchestrator</h1>
				<p className="description">
					<strong>Proof of Concept (PoC)</strong> — validating the concept: parallel dependency
					loading, scope switching without rebuild, runtime env injection, package‑level tree
					shaking, and centralised versioning via backend.
				</p>

				<div className="status-grid">
					<div className="status-item">
						<span className="status-label">Runtime Engine</span>
						<span className="status-value">Webpack</span>
					</div>
					<div className="status-item">
						<span className="status-label">Render Core</span>
						<span className="status-value">React v19.2</span>
					</div>
					<div className="status-item">
						<span className="status-label">Sandbox Node</span>
						<span className="status-value">app-main</span>
					</div>
					<div className="status-item">
						<span className="status-label">Orchestration Layer</span>
						<span
							className="status-value"
							style={{
								color: '#ff9800',
							}}
						>
							CommonJS (PoC)
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const rootElement = document.getElementById('root');
if (rootElement !== null) {
	createRoot(rootElement).render(
		<StrictMode>
			<Dashboard />
		</StrictMode>,
	);
}
