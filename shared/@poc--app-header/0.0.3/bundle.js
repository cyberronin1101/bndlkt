/*! For license information please see bundle.js.LICENSE.txt */
window.bndlkt.register('@poc/app-header@0.0.3', function (e, n, r) {
	(function (e, n, r) {
		(() => {
			'use strict';
			var e = {
					166(e, n, r) {
						r.d(n, { A: () => s });
						var t = r(946),
							a = r.n(t),
							o = r(339),
							i = r.n(o)()(a());
						i.push([
							e.id,
							'.app-header {\n  background: #ffffff;\n  padding: 16px 24px;\n  border-radius: 8px;\n  margin-bottom: 20px;\n  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.03),\n  0 1px 6px -1px rgba(0,0,0,0.02),\n  0 2px 4px 0 rgba(0,0,0,0.02);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border: 1px solid #f0f0f0;\n}\n\n.app-header__left {\n  display: flex;\n  align-items: center;\n  flex: 0 0 auto;      /* не растягивается */\n}\n\n.app-header__asset {\n  display: block;\n  width: 100px;\n  height: 100px;\n  object-fit: contain;\n  border-radius: 4px;\n  flex-shrink: 0;\n}\n\n.app-header__right {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;   /* текст и бейджи выровнены по правому краю */\n  gap: 8px;\n}\n\n.app-header__text {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.app-header__title {\n  margin: 0;\n  font-size: 16px;\n  color: rgba(0, 0, 0, 0.85);\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n.app-header__version {\n  font-weight: 400;\n  color: #8c8c8c;\n  margin-left: 4px;\n}\n\n.app-header__subtitle {\n  margin: 0;\n  font-size: 12px;\n  color: #8c8c8c;\n  line-height: 1.4;\n}\n\n.app-header__badges {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n}\n\n.app-header__badge {\n  background: #f6ffed;\n  color: #52c41a;\n  border: 1px solid #b7eb8f;\n  padding: 2px 12px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 600;\n  line-height: 1.5;\n  white-space: nowrap;\n}\n\n.app-header__version {\n  font-weight: 700;\n  color: #1890ff;\n  margin-left: 4px;\n}\n\n.app-header__badge--version {\n  background: #e6f7ff;\n  color: #1890ff;\n  border-color: #91d5ff;\n}\n\n.app-header__shared-deps {\n  margin: 0;\n  font-size: 11px;\n  color: #8c8c8c;\n  line-height: 1.4;\n  text-align: right;\n}\n\n.app-header__shared-deps code {\n  font-family: monospace;\n  background: rgba(0,0,0,0.04);\n  padding: 1px 4px;\n  border-radius: 3px;\n}\n\n.app-header__added-text {\n  margin: 4px 0 0;\n  font-size: 11px;\n  color: #fa8c16;\n  font-style: italic;\n}\n',
							'',
						]);
						const s = i;
					},
					339(e) {
						e.exports = function (e) {
							var n = [];
							return (
								(n.toString = function () {
									return this.map(function (n) {
										var r = '',
											t = void 0 !== n[5];
										return (
											n[4] && (r += '@supports ('.concat(n[4], ') {')),
											n[2] && (r += '@media '.concat(n[2], ' {')),
											t && (r += '@layer'.concat(n[5].length > 0 ? ' '.concat(n[5]) : '', ' {')),
											(r += e(n)),
											t && (r += '}'),
											n[2] && (r += '}'),
											n[4] && (r += '}'),
											r
										);
									}).join('');
								}),
								(n.i = function (e, r, t, a, o) {
									'string' == typeof e &&
										(e = [
											[
												null,
												e,
												void 0,
											],
										]);
									var i = {};
									if (t)
										for (var s = 0; s < this.length; s++) {
											var p = this[s][0];
											null != p && (i[p] = !0);
										}
									for (var d = 0; d < e.length; d++) {
										var c = [].concat(e[d]);
										(t && i[c[0]]) ||
											(void 0 !== o &&
												(void 0 === c[5] ||
													(c[1] = '@layer'
														.concat(c[5].length > 0 ? ' '.concat(c[5]) : '', ' {')
														.concat(c[1], '}')),
												(c[5] = o)),
											r &&
												(c[2]
													? ((c[1] = '@media '.concat(c[2], ' {').concat(c[1], '}')), (c[2] = r))
													: (c[2] = r)),
											a &&
												(c[4]
													? ((c[1] = '@supports ('.concat(c[4], ') {').concat(c[1], '}')),
														(c[4] = a))
													: (c[4] = ''.concat(a))),
											n.push(c));
									}
								}),
								n
							);
						};
					},
					946(e) {
						e.exports = function (e) {
							return e[1];
						};
					},
					810(e, n) {
						var r = Symbol.for('react.transitional.element');
						function t(e, n, t) {
							var a = null;
							if ((void 0 !== t && (a = '' + t), void 0 !== n.key && (a = '' + n.key), 'key' in n))
								for (var o in ((t = {}), n)) 'key' !== o && (t[o] = n[o]);
							else t = n;
							return (
								(n = t.ref),
								{ $$typeof: r, type: e, key: a, ref: void 0 !== n ? n : null, props: t }
							);
						}
						(Symbol.for('react.fragment'), (n.jsx = t), (n.jsxs = t));
					},
					80(e, n, r) {
						e.exports = r(810);
					},
					599(e) {
						var n = [];
						function r(e) {
							for (var r = -1, t = 0; t < n.length; t++)
								if (n[t].identifier === e) {
									r = t;
									break;
								}
							return r;
						}
						function t(e, t) {
							for (var o = {}, i = [], s = 0; s < e.length; s++) {
								var p = e[s],
									d = t.base ? p[0] + t.base : p[0],
									c = o[d] || 0,
									l = ''.concat(d, ' ').concat(c);
								o[d] = c + 1;
								var f = r(l),
									u = { css: p[1], media: p[2], sourceMap: p[3], supports: p[4], layer: p[5] };
								if (-1 !== f) (n[f].references++, n[f].updater(u));
								else {
									var h = a(u, t);
									((t.byIndex = s), n.splice(s, 0, { identifier: l, updater: h, references: 1 }));
								}
								i.push(l);
							}
							return i;
						}
						function a(e, n) {
							var r = n.domAPI(n);
							return (
								r.update(e),
								function (n) {
									if (n) {
										if (
											n.css === e.css &&
											n.media === e.media &&
											n.sourceMap === e.sourceMap &&
											n.supports === e.supports &&
											n.layer === e.layer
										)
											return;
										r.update((e = n));
									} else r.remove();
								}
							);
						}
						e.exports = function (e, a) {
							var o = t((e = e || []), (a = a || {}));
							return function (e) {
								e = e || [];
								for (var i = 0; i < o.length; i++) {
									var s = r(o[i]);
									n[s].references--;
								}
								for (var p = t(e, a), d = 0; d < o.length; d++) {
									var c = r(o[d]);
									0 === n[c].references && (n[c].updater(), n.splice(c, 1));
								}
								o = p;
							};
						};
					},
					280(e) {
						var n = {};
						e.exports = function (e, r) {
							var t = (function (e) {
								if (void 0 === n[e]) {
									var r = document.querySelector(e);
									if (window.HTMLIFrameElement && r instanceof window.HTMLIFrameElement)
										try {
											r = r.contentDocument.head;
										} catch (e) {
											r = null;
										}
									n[e] = r;
								}
								return n[e];
							})(e);
							if (!t)
								throw new Error(
									"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
								);
							t.appendChild(r);
						};
					},
					979(e) {
						e.exports = function (e) {
							var n = document.createElement('style');
							return (e.setAttributes(n, e.attributes), e.insert(n, e.options), n);
						};
					},
					575(e, n, r) {
						e.exports = function (e) {
							var n = r.nc;
							n && e.setAttribute('nonce', n);
						};
					},
					644(e) {
						e.exports = function (e) {
							if ('undefined' == typeof document)
								return { update: function () {}, remove: function () {} };
							var n = e.insertStyleElement(e);
							return {
								update: function (r) {
									!(function (e, n, r) {
										var t = '';
										(r.supports && (t += '@supports ('.concat(r.supports, ') {')),
											r.media && (t += '@media '.concat(r.media, ' {')));
										var a = void 0 !== r.layer;
										(a &&
											(t += '@layer'.concat(r.layer.length > 0 ? ' '.concat(r.layer) : '', ' {')),
											(t += r.css),
											a && (t += '}'),
											r.media && (t += '}'),
											r.supports && (t += '}'));
										var o = r.sourceMap;
										(o &&
											'undefined' != typeof btoa &&
											(t += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
												btoa(unescape(encodeURIComponent(JSON.stringify(o)))),
												' */',
											)),
											n.styleTagTransform(t, e, n.options));
									})(n, e, r);
								},
								remove: function () {
									!(function (e) {
										if (null === e.parentNode) return !1;
										e.parentNode.removeChild(e);
									})(n);
								},
							};
						};
					},
					160(e) {
						e.exports = function (e, n) {
							if (n.styleSheet) n.styleSheet.cssText = e;
							else {
								for (; n.firstChild; ) n.removeChild(n.firstChild);
								n.appendChild(document.createTextNode(e));
							}
						};
					},
				},
				n = {};
			function t(r) {
				var a = n[r];
				if (void 0 !== a) return a.exports;
				var o = (n[r] = { id: r, exports: {} });
				return (e[r](o, o.exports, t), o.exports);
			}
			((t.n = (e) => {
				var n = e && e.__esModule ? () => e.default : () => e;
				return (t.d(n, { a: n }), n);
			}),
				(t.d = (e, n) => {
					for (var r in n)
						t.o(n, r) && !t.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: n[r] });
				}),
				(t.g = (function () {
					if ('object' == typeof globalThis) return globalThis;
					try {
						return this || new Function('return this')();
					} catch (e) {
						if ('object' == typeof window) return window;
					}
				})()),
				(t.o = (e, n) => Object.prototype.hasOwnProperty.call(e, n)),
				(t.r = (e) => {
					('undefined' != typeof Symbol &&
						Symbol.toStringTag &&
						Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
						Object.defineProperty(e, '__esModule', { value: !0 }));
				}),
				(() => {
					var e;
					t.g.importScripts && (e = t.g.location + '');
					var n = t.g.document;
					if (
						!e &&
						n &&
						(n.currentScript &&
							'SCRIPT' === n.currentScript.tagName.toUpperCase() &&
							(e = n.currentScript.src),
						!e)
					) {
						var r = n.getElementsByTagName('script');
						if (r.length)
							for (var a = r.length - 1; a > -1 && (!e || !/^http(s?):/.test(e)); ) e = r[a--].src;
					}
					if (!e) throw new Error('Automatic publicPath is not supported in this browser');
					((e = e
						.replace(/^blob:/, '')
						.replace(/#.*$/, '')
						.replace(/\?.*$/, '')
						.replace(/\/[^\/]+$/, '/')),
						(t.p = e));
				})(),
				(t.nc = void 0));
			var a = {};
			(t.r(a), t.d(a, { default: () => y }));
			var o = t(80);
			const i = t.p + '009cae99e044725f05bd.png';
			var s = t(599),
				p = t.n(s),
				d = t(644),
				c = t.n(d),
				l = t(280),
				f = t.n(l),
				u = t(575),
				h = t.n(u),
				m = t(979),
				g = t.n(m),
				x = t(160),
				v = t.n(x),
				b = t(166),
				_ = {};
			((_.styleTagTransform = v()),
				(_.setAttributes = h()),
				(_.insert = f().bind(null, 'head')),
				(_.domAPI = c()),
				(_.insertStyleElement = g()),
				p()(b.A, _),
				b.A && b.A.locals && b.A.locals);
			const y = () =>
				(0, o.jsxs)('header', {
					className: 'app-header',
					children: [
						(0, o.jsx)('div', {
							className: 'app-header__left',
							children: (0, o.jsx)('img', {
								src: i,
								alt: 'Demo asset',
								className: 'app-header__asset app-header__asset--rounded',
								title: 'Assets imported via relative path inside a remote bndlkt bundle',
							}),
						}),
						(0, o.jsxs)('div', {
							className: 'app-header__right',
							children: [
								(0, o.jsxs)('div', {
									className: 'app-header__text',
									children: [
										(0, o.jsxs)('h2', {
											className: 'app-header__title',
											children: [
												'@poc/app-header ',
												(0, o.jsx)('span', {
													className: 'app-header__version',
													children: 'v0.0.3',
												}),
											],
										}),
										(0, o.jsx)('p', {
											className: 'app-header__subtitle',
											children:
												'Demonstrates on‑demand bundle loading & asset path resolution in lazy‑loaded chunks.',
										}),
										(0, o.jsx)('p', {
											className: 'app-header__added-text',
											children: '✨ Here could be some description added in v0.0.3',
										}),
									],
								}),
								(0, o.jsxs)('div', {
									className: 'app-header__badges',
									children: [
										(0, o.jsx)('span', {
											className: 'app-header__badge',
											children: '📦 Remote Bundle',
										}),
										(0, o.jsx)('span', {
											className: 'app-header__badge',
											children: '✅ Assets Verified',
										}),
										(0, o.jsx)('span', {
											className: 'app-header__badge app-header__badge--version',
											children: 'v0.0.3',
										}),
									],
								}),
								(0, o.jsxs)('p', {
									className: 'app-header__shared-deps',
									children: [
										'Shared deps: ',
										(0, o.jsx)('code', { children: 'react' }),
										', ',
										(0, o.jsx)('code', { children: 'react-dom/client' }),
										' (provided by bndlkt graph)',
									],
								}),
							],
						}),
					],
				});
			var j = r;
			for (var w in a) j[w] = a[w];
			a.__esModule && Object.defineProperty(j, '__esModule', { value: !0 });
		})();
	}).call(r, e, n, r);
});
