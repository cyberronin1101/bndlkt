/*! For license information please see bundle.js.LICENSE.txt */
window.bndlkt.register('@poc/app-header@0.0.1', function (e, n, t) {
	(function (e, n, t) {
		(() => {
			'use strict';
			var e = {
					166(e, n, t) {
						t.d(n, { A: () => s });
						var r = t(946),
							a = t.n(r),
							o = t(339),
							i = t.n(o)()(a());
						i.push([
							e.id,
							'.app-header {\n  background: #ffffff;\n  padding: 16px 24px;\n  border-radius: 8px;\n  margin-bottom: 20px;\n  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.03),\n  0 1px 6px -1px rgba(0,0,0,0.02),\n  0 2px 4px 0 rgba(0,0,0,0.02);\n  display: flex;\n  justify-content: space-between; \n  align-items: center;\n  border: 1px solid #f0f0f0;\n}\n\n.app-header__left {\n  display: flex;\n  align-items: center;\n  flex: 0 0 auto;      /* не растягивается */\n}\n\n.app-header__asset {\n  display: block;\n  width: 100px;\n  height: 100px;\n  object-fit: contain;\n  border-radius: 4px;\n  flex-shrink: 0;\n}\n\n.app-header__right {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;   /* текст и бейджи выровнены по правому краю */\n  gap: 8px;\n}\n\n.app-header__text {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.app-header__title {\n  margin: 0;\n  font-size: 16px;\n  color: rgba(0, 0, 0, 0.85);\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n.app-header__version {\n  font-weight: 400;\n  color: #8c8c8c;\n  margin-left: 4px;\n}\n\n.app-header__subtitle {\n  margin: 0;\n  font-size: 12px;\n  color: #8c8c8c;\n  line-height: 1.4;\n}\n\n.app-header__badges {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n}\n\n.app-header__badge {\n  background: #f6ffed;\n  color: #52c41a;\n  border: 1px solid #b7eb8f;\n  padding: 2px 12px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 600;\n  line-height: 1.5;\n  white-space: nowrap;\n}\n',
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
										var t = '',
											r = void 0 !== n[5];
										return (
											n[4] && (t += '@supports ('.concat(n[4], ') {')),
											n[2] && (t += '@media '.concat(n[2], ' {')),
											r && (t += '@layer'.concat(n[5].length > 0 ? ' '.concat(n[5]) : '', ' {')),
											(t += e(n)),
											r && (t += '}'),
											n[2] && (t += '}'),
											n[4] && (t += '}'),
											t
										);
									}).join('');
								}),
								(n.i = function (e, t, r, a, o) {
									'string' == typeof e &&
										(e = [
											[
												null,
												e,
												void 0,
											],
										]);
									var i = {};
									if (r)
										for (var s = 0; s < this.length; s++) {
											var p = this[s][0];
											null != p && (i[p] = !0);
										}
									for (var c = 0; c < e.length; c++) {
										var l = [].concat(e[c]);
										(r && i[l[0]]) ||
											(void 0 !== o &&
												(void 0 === l[5] ||
													(l[1] = '@layer'
														.concat(l[5].length > 0 ? ' '.concat(l[5]) : '', ' {')
														.concat(l[1], '}')),
												(l[5] = o)),
											t &&
												(l[2]
													? ((l[1] = '@media '.concat(l[2], ' {').concat(l[1], '}')), (l[2] = t))
													: (l[2] = t)),
											a &&
												(l[4]
													? ((l[1] = '@supports ('.concat(l[4], ') {').concat(l[1], '}')),
														(l[4] = a))
													: (l[4] = ''.concat(a))),
											n.push(l));
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
						var t = Symbol.for('react.transitional.element');
						function r(e, n, r) {
							var a = null;
							if ((void 0 !== r && (a = '' + r), void 0 !== n.key && (a = '' + n.key), 'key' in n))
								for (var o in ((r = {}), n)) 'key' !== o && (r[o] = n[o]);
							else r = n;
							return (
								(n = r.ref),
								{ $$typeof: t, type: e, key: a, ref: void 0 !== n ? n : null, props: r }
							);
						}
						(Symbol.for('react.fragment'), (n.jsx = r), (n.jsxs = r));
					},
					80(e, n, t) {
						e.exports = t(810);
					},
					599(e) {
						var n = [];
						function t(e) {
							for (var t = -1, r = 0; r < n.length; r++)
								if (n[r].identifier === e) {
									t = r;
									break;
								}
							return t;
						}
						function r(e, r) {
							for (var o = {}, i = [], s = 0; s < e.length; s++) {
								var p = e[s],
									c = r.base ? p[0] + r.base : p[0],
									l = o[c] || 0,
									d = ''.concat(c, ' ').concat(l);
								o[c] = l + 1;
								var u = t(d),
									f = { css: p[1], media: p[2], sourceMap: p[3], supports: p[4], layer: p[5] };
								if (-1 !== u) (n[u].references++, n[u].updater(f));
								else {
									var h = a(f, r);
									((r.byIndex = s), n.splice(s, 0, { identifier: d, updater: h, references: 1 }));
								}
								i.push(d);
							}
							return i;
						}
						function a(e, n) {
							var t = n.domAPI(n);
							return (
								t.update(e),
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
										t.update((e = n));
									} else t.remove();
								}
							);
						}
						e.exports = function (e, a) {
							var o = r((e = e || []), (a = a || {}));
							return function (e) {
								e = e || [];
								for (var i = 0; i < o.length; i++) {
									var s = t(o[i]);
									n[s].references--;
								}
								for (var p = r(e, a), c = 0; c < o.length; c++) {
									var l = t(o[c]);
									0 === n[l].references && (n[l].updater(), n.splice(l, 1));
								}
								o = p;
							};
						};
					},
					280(e) {
						var n = {};
						e.exports = function (e, t) {
							var r = (function (e) {
								if (void 0 === n[e]) {
									var t = document.querySelector(e);
									if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement)
										try {
											t = t.contentDocument.head;
										} catch (e) {
											t = null;
										}
									n[e] = t;
								}
								return n[e];
							})(e);
							if (!r)
								throw new Error(
									"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
								);
							r.appendChild(t);
						};
					},
					979(e) {
						e.exports = function (e) {
							var n = document.createElement('style');
							return (e.setAttributes(n, e.attributes), e.insert(n, e.options), n);
						};
					},
					575(e, n, t) {
						e.exports = function (e) {
							var n = t.nc;
							n && e.setAttribute('nonce', n);
						};
					},
					644(e) {
						e.exports = function (e) {
							if ('undefined' == typeof document)
								return { update: function () {}, remove: function () {} };
							var n = e.insertStyleElement(e);
							return {
								update: function (t) {
									!(function (e, n, t) {
										var r = '';
										(t.supports && (r += '@supports ('.concat(t.supports, ') {')),
											t.media && (r += '@media '.concat(t.media, ' {')));
										var a = void 0 !== t.layer;
										(a &&
											(r += '@layer'.concat(t.layer.length > 0 ? ' '.concat(t.layer) : '', ' {')),
											(r += t.css),
											a && (r += '}'),
											t.media && (r += '}'),
											t.supports && (r += '}'));
										var o = t.sourceMap;
										(o &&
											'undefined' != typeof btoa &&
											(r += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
												btoa(unescape(encodeURIComponent(JSON.stringify(o)))),
												' */',
											)),
											n.styleTagTransform(r, e, n.options));
									})(n, e, t);
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
			function r(t) {
				var a = n[t];
				if (void 0 !== a) return a.exports;
				var o = (n[t] = { id: t, exports: {} });
				return (e[t](o, o.exports, r), o.exports);
			}
			((r.n = (e) => {
				var n = e && e.__esModule ? () => e.default : () => e;
				return (r.d(n, { a: n }), n);
			}),
				(r.d = (e, n) => {
					for (var t in n)
						r.o(n, t) && !r.o(e, t) && Object.defineProperty(e, t, { enumerable: !0, get: n[t] });
				}),
				(r.g = (function () {
					if ('object' == typeof globalThis) return globalThis;
					try {
						return this || new Function('return this')();
					} catch (e) {
						if ('object' == typeof window) return window;
					}
				})()),
				(r.o = (e, n) => Object.prototype.hasOwnProperty.call(e, n)),
				(r.r = (e) => {
					('undefined' != typeof Symbol &&
						Symbol.toStringTag &&
						Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
						Object.defineProperty(e, '__esModule', { value: !0 }));
				}),
				(() => {
					var e;
					r.g.importScripts && (e = r.g.location + '');
					var n = r.g.document;
					if (
						!e &&
						n &&
						(n.currentScript &&
							'SCRIPT' === n.currentScript.tagName.toUpperCase() &&
							(e = n.currentScript.src),
						!e)
					) {
						var t = n.getElementsByTagName('script');
						if (t.length)
							for (var a = t.length - 1; a > -1 && (!e || !/^http(s?):/.test(e)); ) e = t[a--].src;
					}
					if (!e) throw new Error('Automatic publicPath is not supported in this browser');
					((e = e
						.replace(/^blob:/, '')
						.replace(/#.*$/, '')
						.replace(/\?.*$/, '')
						.replace(/\/[^\/]+$/, '/')),
						(r.p = e));
				})(),
				(r.nc = void 0));
			var a = {};
			(r.r(a), r.d(a, { default: () => _ }));
			var o = r(80);
			const i = r.p + '009cae99e044725f05bd.png';
			var s = r(599),
				p = r.n(s),
				c = r(644),
				l = r.n(c),
				d = r(280),
				u = r.n(d),
				f = r(575),
				h = r.n(f),
				m = r(979),
				v = r.n(m),
				g = r(160),
				x = r.n(g),
				b = r(166),
				y = {};
			((y.styleTagTransform = x()),
				(y.setAttributes = h()),
				(y.insert = u().bind(null, 'head')),
				(y.domAPI = l()),
				(y.insertStyleElement = v()),
				p()(b.A, y),
				b.A && b.A.locals && b.A.locals);
			const _ = () =>
				(0, o.jsxs)('header', {
					className: 'app-header',
					children: [
						(0, o.jsx)('div', {
							className: 'app-header__left',
							children: (0, o.jsx)('img', {
								src: i,
								alt: 'Demo asset',
								className: 'app-header__asset',
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
													children: 'v0.0.1',
												}),
											],
										}),
										(0, o.jsx)('p', {
											className: 'app-header__subtitle',
											children:
												'Demonstrates on‑demand bundle loading & asset path resolution in lazy‑loaded chunks.',
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
									],
								}),
							],
						}),
					],
				});
			var w = t;
			for (var j in a) w[j] = a[j];
			a.__esModule && Object.defineProperty(w, '__esModule', { value: !0 });
		})();
	}).call(t, e, n, t);
});
