'use strict';
(self.webpackChunk_poc_app_main = self.webpackChunk_poc_app_main || []).push([
	[583],
	{
		583(d, e, a) {
			a.d(e, { Banner: () => i });
			var n = a(80);
			const i = () =>
				(0, n.jsxs)('div', {
					style: {
						padding: '12px 16px',
						margin: '16px 0 24px',
						border: '1px solid #b7eb8f',
						borderRadius: '6px',
						background: '#f6ffed',
						color: '#52c41a',
						fontSize: '14px',
						boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
						lineHeight: 1.5,
					},
					children: [
						(0, n.jsx)('div', {
							style: { fontWeight: 600, marginBottom: 4 },
							children: '✅ Lazy chunk successfully loaded and rendered!',
						}),
						(0, n.jsxs)('div', {
							style: { color: 'rgba(0,0,0,0.65)', fontSize: 13 },
							children: [
								'This block is imported dynamically via',
								' ',
								(0, n.jsx)('code', {
									style: { background: 'rgba(0,0,0,0.04)', padding: '1px 4px', borderRadius: 3 },
									children: 'React.lazy',
								}),
								' ',
								'and demonstrates on‑demand chunk loading.',
							],
						}),
					],
				});
		},
	},
]);
