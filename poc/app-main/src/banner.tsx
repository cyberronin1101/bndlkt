// Banner.tsx
import type { FC } from 'react';

export const Banner: FC = () => {
	return (
		<div
			style={{
				padding: '12px 16px',
				margin: '16px 0 24px',
				border: '1px solid #b7eb8f',
				borderRadius: '6px',
				background: '#f6ffed',
				color: '#52c41a',
				fontSize: '14px',
				boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
				lineHeight: 1.5,
			}}
		>
			<div
				style={{
					fontWeight: 600,
					marginBottom: 4,
				}}
			>
				✅ Lazy chunk successfully loaded and rendered!
			</div>
			<div
				style={{
					color: 'rgba(0,0,0,0.65)',
					fontSize: 13,
				}}
			>
				This block is imported dynamically via{' '}
				<code
					style={{
						background: 'rgba(0,0,0,0.04)',
						padding: '1px 4px',
						borderRadius: 3,
					}}
				>
					React.lazy
				</code>{' '}
				and demonstrates on‑demand chunk loading.
			</div>
		</div>
	);
};
