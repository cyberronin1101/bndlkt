/*! For license information please see bundle.js.LICENSE.txt */
window.bndlkt.register('@poc/app-main@0.0.1', function (n, e, t) {
	(function (n, e, t) {
		(() => {
			var e,
				r,
				o,
				a,
				i = {
					166(n, e, t) {
						'use strict';
						t.d(e, { A: () => s });
						var r = t(946),
							o = t.n(r),
							a = t(339),
							i = t.n(a)()(o());
						i.push([
							n.id,
							":root {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n  'Helvetica Neue', Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.85);\n  background-color: #f0f2f5;\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n}\n\nbody {\n  margin: 0;\n  display: flex;\n  place-items: center;\n  min-width: 320px;\n  min-height: 100vh;\n  justify-content: center;\n}\n\n#root {\n  max-width: 720px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n\n.dashboard {\n  background: #ffffff;\n  border-radius: 8px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),\n  0 1px 6px -1px rgba(0, 0, 0, 0.02),\n  0 2px 4px 0 rgba(0, 0, 0, 0.02);\n  padding: 24px;\n}\n\n.remote-block {\n  text-align: center;\n  margin-bottom: 24px;\n}\n\n.ant-btn {\n  display: inline-block;\n  height: 32px;\n  padding: 4px 15px;\n  font-size: 14px;\n  border-radius: 6px;\n  border: 1px solid #d9d9d9;\n  background: #ffffff;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.ant-btn-primary {\n  color: #fff;\n  background: #1890ff;\n  border-color: #1890ff;\n}\n\n.ant-btn-primary:hover {\n  background: #40a9ff;\n  border-color: #40a9ff;\n}\n\n.loading-placeholder {\n  padding: 16px;\n  text-align: center;\n  color: #8c8c8c;\n  background: #fafafa;\n  border-radius: 6px;\n  border: 1px dashed #d9d9d9;\n  margin: 16px 0;\n}\n\n/* Environment table */\n.env-section {\n  background: #fafafa;\n  border: 1px solid #f0f0f0;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 24px;\n}\n\n.env-section h3 {\n  margin: 0 0 12px;\n  font-size: 16px;\n  color: rgba(0, 0, 0, 0.85);\n}\n\n.env-table {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  gap: 8px 16px;\n  font-size: 14px;\n}\n\n.env-key {\n  font-weight: 600;\n  color: rgba(0, 0, 0, 0.65);\n}\n\n.env-value {\n  font-family: monospace;\n  background: #ffffff;\n  padding: 2px 8px;\n  border: 1px solid #d9d9d9;\n  border-radius: 4px;\n}\n\n.env-type {\n  font-size: 12px;\n  color: #8c8c8c;\n}\n\n/* Demo sections */\n.demo-section {\n  background: #fafafa;\n  border: 1px solid #f0f0f0;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 24px;\n}\n\n.demo-section h3 {\n  margin: 0 0 12px;\n  font-size: 16px;\n  color: rgba(0, 0, 0, 0.85);\n}\n\n.demo-content {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 12px;\n}\n\n.demo-counter {\n  font-weight: 600;\n  font-size: 1rem;\n  color: #1890ff;\n}\n\n.demo-description {\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 0.9rem;\n  line-height: 1.5;\n  margin: 0;\n}\n\n.demo-description code {\n  background: rgba(0, 0, 0, 0.06);\n  padding: 1px 5px;\n  border-radius: 3px;\n  font-family: monospace;\n}\n\n/* Info block */\n.info-block {\n  margin-top: 24px;\n  padding-top: 24px;\n  border-top: 1px solid #f0f0f0;\n  text-align: center;\n}\n\n.badge {\n  display: inline-block;\n  background: rgba(24, 144, 255, 0.1);\n  color: #1890ff;\n  padding: 2px 12px;\n  border-radius: 20px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  margin-bottom: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\nh1 {\n  font-size: 2rem;\n  line-height: 1.2;\n  margin: 0 0 12px;\n  color: rgba(0, 0, 0, 0.85);\n  font-weight: 600;\n}\n\n.description {\n  color: rgba(0, 0, 0, 0.45);\n  font-size: 1rem;\n  margin: 0 0 24px;\n}\n\n.status-grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 12px;\n}\n\n.status-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #fafafa;\n  padding: 10px 16px;\n  border-radius: 6px;\n  border: 1px solid #f0f0f0;\n}\n\n.status-label {\n  color: rgba(0, 0, 0, 0.65);\n}\n\n.status-value {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;\n  font-size: 0.9rem;\n  color: #52c41a;\n  font-weight: 600;\n}\n\n.app-version {\n  font-size: 13px;\n  color: #8c8c8c;\n  text-align: right;\n  margin-bottom: 8px;\n}\n\n.demo-debounce {\n  font-size: 0.9rem;\n  color: #8c8c8c;\n  margin-left: 8px;\n}\n",
							'',
						]);
						const s = i;
					},
					339(n) {
						'use strict';
						n.exports = function (n) {
							var e = [];
							return (
								(e.toString = function () {
									return this.map(function (e) {
										var t = '',
											r = void 0 !== e[5];
										return (
											e[4] && (t += '@supports ('.concat(e[4], ') {')),
											e[2] && (t += '@media '.concat(e[2], ' {')),
											r && (t += '@layer'.concat(e[5].length > 0 ? ' '.concat(e[5]) : '', ' {')),
											(t += n(e)),
											r && (t += '}'),
											e[2] && (t += '}'),
											e[4] && (t += '}'),
											t
										);
									}).join('');
								}),
								(e.i = function (n, t, r, o, a) {
									'string' == typeof n &&
										(n = [
											[
												null,
												n,
												void 0,
											],
										]);
									var i = {};
									if (r)
										for (var s = 0; s < this.length; s++) {
											var c = this[s][0];
											null != c && (i[c] = !0);
										}
									for (var l = 0; l < n.length; l++) {
										var d = [].concat(n[l]);
										(r && i[d[0]]) ||
											(void 0 !== a &&
												(void 0 === d[5] ||
													(d[1] = '@layer'
														.concat(d[5].length > 0 ? ' '.concat(d[5]) : '', ' {')
														.concat(d[1], '}')),
												(d[5] = a)),
											t &&
												(d[2]
													? ((d[1] = '@media '.concat(d[2], ' {').concat(d[1], '}')), (d[2] = t))
													: (d[2] = t)),
											o &&
												(d[4]
													? ((d[1] = '@supports ('.concat(d[4], ') {').concat(d[1], '}')),
														(d[4] = o))
													: (d[4] = ''.concat(o))),
											e.push(d));
									}
								}),
								e
							);
						};
					},
					946(n) {
						'use strict';
						n.exports = function (n) {
							return n[1];
						};
					},
					759(n, e, t) {
						var r = t(907).Symbol;
						n.exports = r;
					},
					490(n, e, t) {
						var r = t(759),
							o = t(817),
							a = t(748),
							i = r ? r.toStringTag : void 0;
						n.exports = function (n) {
							return null == n
								? void 0 === n
									? '[object Undefined]'
									: '[object Null]'
								: i && i in Object(n)
									? o(n)
									: a(n);
						};
					},
					6(n, e, t) {
						var r = t(82),
							o = /^\s+/;
						n.exports = function (n) {
							return n ? n.slice(0, r(n) + 1).replace(o, '') : n;
						};
					},
					710(n, e, t) {
						var r = 'object' == typeof t.g && t.g && t.g.Object === Object && t.g;
						n.exports = r;
					},
					817(n, e, t) {
						var r = t(759),
							o = Object.prototype,
							a = o.hasOwnProperty,
							i = o.toString,
							s = r ? r.toStringTag : void 0;
						n.exports = function (n) {
							var e = a.call(n, s),
								t = n[s];
							try {
								n[s] = void 0;
								var r = !0;
							} catch (n) {}
							var o = i.call(n);
							return (r && (e ? (n[s] = t) : delete n[s]), o);
						};
					},
					748(n) {
						var e = Object.prototype.toString;
						n.exports = function (n) {
							return e.call(n);
						};
					},
					907(n, e, t) {
						var r = t(710),
							o = 'object' == typeof self && self && self.Object === Object && self,
							a = r || o || Function('return this')();
						n.exports = a;
					},
					82(n) {
						var e = /\s/;
						n.exports = function (n) {
							for (var t = n.length; t-- && e.test(n.charAt(t)); );
							return t;
						};
					},
					671(n, e, t) {
						var r = t(323),
							o = t(62),
							a = t(480),
							i = Math.max,
							s = Math.min;
						n.exports = function (n, e, t) {
							var c,
								l,
								d,
								p,
								u,
								f,
								m = 0,
								h = !1,
								v = !1,
								b = !0;
							if ('function' != typeof n) throw new TypeError('Expected a function');
							function x(e) {
								var t = c,
									r = l;
								return ((c = l = void 0), (m = e), (p = n.apply(r, t)));
							}
							function g(n) {
								var t = n - f;
								return void 0 === f || t >= e || t < 0 || (v && n - m >= d);
							}
							function y() {
								var n = o();
								if (g(n)) return j(n);
								u = setTimeout(
									y,
									(function (n) {
										var t = e - (n - f);
										return v ? s(t, d - (n - m)) : t;
									})(n),
								);
							}
							function j(n) {
								return ((u = void 0), b && c ? x(n) : ((c = l = void 0), p));
							}
							function k() {
								var n = o(),
									t = g(n);
								if (((c = arguments), (l = this), (f = n), t)) {
									if (void 0 === u)
										return (function (n) {
											return ((m = n), (u = setTimeout(y, e)), h ? x(n) : p);
										})(f);
									if (v) return (clearTimeout(u), (u = setTimeout(y, e)), x(f));
								}
								return (void 0 === u && (u = setTimeout(y, e)), p);
							}
							return (
								(e = a(e) || 0),
								r(t) &&
									((h = !!t.leading),
									(d = (v = 'maxWait' in t) ? i(a(t.maxWait) || 0, e) : d),
									(b = 'trailing' in t ? !!t.trailing : b)),
								(k.cancel = function () {
									(void 0 !== u && clearTimeout(u), (m = 0), (c = f = l = u = void 0));
								}),
								(k.flush = function () {
									return void 0 === u ? p : j(o());
								}),
								k
							);
						};
					},
					323(n) {
						n.exports = function (n) {
							var e = typeof n;
							return null != n && ('object' == e || 'function' == e);
						};
					},
					292(n) {
						n.exports = function (n) {
							return null != n && 'object' == typeof n;
						};
					},
					964(n, e, t) {
						var r = t(490),
							o = t(292);
						n.exports = function (n) {
							return 'symbol' == typeof n || (o(n) && '[object Symbol]' == r(n));
						};
					},
					62(n, e, t) {
						var r = t(907);
						n.exports = function () {
							return r.Date.now();
						};
					},
					480(n, e, t) {
						var r = t(6),
							o = t(323),
							a = t(964),
							i = /^[-+]0x[0-9a-f]+$/i,
							s = /^0b[01]+$/i,
							c = /^0o[0-7]+$/i,
							l = parseInt;
						n.exports = function (n) {
							if ('number' == typeof n) return n;
							if (a(n)) return NaN;
							if (o(n)) {
								var e = 'function' == typeof n.valueOf ? n.valueOf() : n;
								n = o(e) ? e + '' : e;
							}
							if ('string' != typeof n) return 0 === n ? n : +n;
							n = r(n);
							var t = s.test(n);
							return t || c.test(n) ? l(n.slice(2), t ? 2 : 8) : i.test(n) ? NaN : +n;
						};
					},
					810(n, e) {
						'use strict';
						var t = Symbol.for('react.transitional.element');
						function r(n, e, r) {
							var o = null;
							if ((void 0 !== r && (o = '' + r), void 0 !== e.key && (o = '' + e.key), 'key' in e))
								for (var a in ((r = {}), e)) 'key' !== a && (r[a] = e[a]);
							else r = e;
							return (
								(e = r.ref),
								{ $$typeof: t, type: n, key: o, ref: void 0 !== e ? e : null, props: r }
							);
						}
						(Symbol.for('react.fragment'), (e.jsx = r), (e.jsxs = r));
					},
					80(n, e, t) {
						'use strict';
						n.exports = t(810);
					},
					599(n) {
						'use strict';
						var e = [];
						function t(n) {
							for (var t = -1, r = 0; r < e.length; r++)
								if (e[r].identifier === n) {
									t = r;
									break;
								}
							return t;
						}
						function r(n, r) {
							for (var a = {}, i = [], s = 0; s < n.length; s++) {
								var c = n[s],
									l = r.base ? c[0] + r.base : c[0],
									d = a[l] || 0,
									p = ''.concat(l, ' ').concat(d);
								a[l] = d + 1;
								var u = t(p),
									f = { css: c[1], media: c[2], sourceMap: c[3], supports: c[4], layer: c[5] };
								if (-1 !== u) (e[u].references++, e[u].updater(f));
								else {
									var m = o(f, r);
									((r.byIndex = s), e.splice(s, 0, { identifier: p, updater: m, references: 1 }));
								}
								i.push(p);
							}
							return i;
						}
						function o(n, e) {
							var t = e.domAPI(e);
							return (
								t.update(n),
								function (e) {
									if (e) {
										if (
											e.css === n.css &&
											e.media === n.media &&
											e.sourceMap === n.sourceMap &&
											e.supports === n.supports &&
											e.layer === n.layer
										)
											return;
										t.update((n = e));
									} else t.remove();
								}
							);
						}
						n.exports = function (n, o) {
							var a = r((n = n || []), (o = o || {}));
							return function (n) {
								n = n || [];
								for (var i = 0; i < a.length; i++) {
									var s = t(a[i]);
									e[s].references--;
								}
								for (var c = r(n, o), l = 0; l < a.length; l++) {
									var d = t(a[l]);
									0 === e[d].references && (e[d].updater(), e.splice(d, 1));
								}
								a = c;
							};
						};
					},
					280(n) {
						'use strict';
						var e = {};
						n.exports = function (n, t) {
							var r = (function (n) {
								if (void 0 === e[n]) {
									var t = document.querySelector(n);
									if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement)
										try {
											t = t.contentDocument.head;
										} catch (n) {
											t = null;
										}
									e[n] = t;
								}
								return e[n];
							})(n);
							if (!r)
								throw new Error(
									"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
								);
							r.appendChild(t);
						};
					},
					979(n) {
						'use strict';
						n.exports = function (n) {
							var e = document.createElement('style');
							return (n.setAttributes(e, n.attributes), n.insert(e, n.options), e);
						};
					},
					575(n, e, t) {
						'use strict';
						n.exports = function (n) {
							var e = t.nc;
							e && n.setAttribute('nonce', e);
						};
					},
					644(n) {
						'use strict';
						n.exports = function (n) {
							if ('undefined' == typeof document)
								return { update: function () {}, remove: function () {} };
							var e = n.insertStyleElement(n);
							return {
								update: function (t) {
									!(function (n, e, t) {
										var r = '';
										(t.supports && (r += '@supports ('.concat(t.supports, ') {')),
											t.media && (r += '@media '.concat(t.media, ' {')));
										var o = void 0 !== t.layer;
										(o &&
											(r += '@layer'.concat(t.layer.length > 0 ? ' '.concat(t.layer) : '', ' {')),
											(r += t.css),
											o && (r += '}'),
											t.media && (r += '}'),
											t.supports && (r += '}'));
										var a = t.sourceMap;
										(a &&
											'undefined' != typeof btoa &&
											(r += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
												btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
												' */',
											)),
											e.styleTagTransform(r, n, e.options));
									})(e, n, t);
								},
								remove: function () {
									!(function (n) {
										if (null === n.parentNode) return !1;
										n.parentNode.removeChild(n);
									})(e);
								},
							};
						};
					},
					160(n) {
						'use strict';
						n.exports = function (n, e) {
							if (e.styleSheet) e.styleSheet.cssText = n;
							else {
								for (; e.firstChild; ) e.removeChild(e.firstChild);
								e.appendChild(document.createTextNode(n));
							}
						};
					},
					34(n) {
						'use strict';
						n.exports = new Promise(function (n, e) {
							if (!window.bndlkt) return e(new Error('[bndlkt] Runtime missing'));
							window.bndlkt.requireLazy('@poc/app-main@0.0.1', '@poc/app-header').then(n).catch(e);
						});
					},
				},
				s = {};
			function c(n) {
				var e = s[n];
				if (void 0 !== e) return e.exports;
				var t = (s[n] = { id: n, exports: {} });
				return (i[n](t, t.exports, c), t.exports);
			}
			((c.m = i),
				(c.n = (n) => {
					var e = n && n.__esModule ? () => n.default : () => n;
					return (c.d(e, { a: e }), e);
				}),
				(r = Object.getPrototypeOf ? (n) => Object.getPrototypeOf(n) : (n) => n.__proto__),
				(c.t = function (n, t) {
					if ((1 & t && (n = this(n)), 8 & t)) return n;
					if ('object' == typeof n && n) {
						if (4 & t && n.__esModule) return n;
						if (16 & t && 'function' == typeof n.then) return n;
					}
					var o = Object.create(null);
					c.r(o);
					var a = {};
					e = e || [
						null,
						r({}),
						r([]),
						r(r),
					];
					for (
						var i = 2 & t && n;
						('object' == typeof i || 'function' == typeof i) && !~e.indexOf(i);
						i = r(i)
					)
						Object.getOwnPropertyNames(i).forEach((e) => (a[e] = () => n[e]));
					return ((a.default = () => n), c.d(o, a), o);
				}),
				(c.d = (n, e) => {
					for (var t in e)
						c.o(e, t) && !c.o(n, t) && Object.defineProperty(n, t, { enumerable: !0, get: e[t] });
				}),
				(c.f = {}),
				(c.e = (n) => Promise.all(Object.keys(c.f).reduce((e, t) => (c.f[t](n, e), e), []))),
				(c.u = (n) => 'chunks/' + n + '.9acff1d9.js'),
				(c.g = (function () {
					if ('object' == typeof globalThis) return globalThis;
					try {
						return this || new Function('return this')();
					} catch (n) {
						if ('object' == typeof window) return window;
					}
				})()),
				(c.o = (n, e) => Object.prototype.hasOwnProperty.call(n, e)),
				(o = {}),
				(a = '@poc/app-main:'),
				(c.l = (n, e, t, r) => {
					if (o[n]) o[n].push(e);
					else {
						var i, s;
						if (void 0 !== t)
							for (var l = document.getElementsByTagName('script'), d = 0; d < l.length; d++) {
								var p = l[d];
								if (p.getAttribute('src') == n || p.getAttribute('data-webpack') == a + t) {
									i = p;
									break;
								}
							}
						(i ||
							((s = !0),
							((i = document.createElement('script')).charset = 'utf-8'),
							c.nc && i.setAttribute('nonce', c.nc),
							i.setAttribute('data-webpack', a + t),
							(i.src = n)),
							(o[n] = [e]));
						var u = (e, t) => {
								((i.onerror = i.onload = null), clearTimeout(f));
								var r = o[n];
								if (
									(delete o[n],
									i.parentNode && i.parentNode.removeChild(i),
									r && r.forEach((n) => n(t)),
									e)
								)
									return e(t);
							},
							f = setTimeout(u.bind(null, void 0, { type: 'timeout', target: i }), 12e4);
						((i.onerror = u.bind(null, i.onerror)),
							(i.onload = u.bind(null, i.onload)),
							s && document.head.appendChild(i));
					}
				}),
				(c.r = (n) => {
					('undefined' != typeof Symbol &&
						Symbol.toStringTag &&
						Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }),
						Object.defineProperty(n, '__esModule', { value: !0 }));
				}),
				(() => {
					var n;
					c.g.importScripts && (n = c.g.location + '');
					var e = c.g.document;
					if (
						!n &&
						e &&
						(e.currentScript &&
							'SCRIPT' === e.currentScript.tagName.toUpperCase() &&
							(n = e.currentScript.src),
						!n)
					) {
						var t = e.getElementsByTagName('script');
						if (t.length)
							for (var r = t.length - 1; r > -1 && (!n || !/^http(s?):/.test(n)); ) n = t[r--].src;
					}
					if (!n) throw new Error('Automatic publicPath is not supported in this browser');
					((n = n
						.replace(/^blob:/, '')
						.replace(/#.*$/, '')
						.replace(/\?.*$/, '')
						.replace(/\/[^\/]+$/, '/')),
						(c.p = n));
				})(),
				(() => {
					var n = { 792: 0 };
					c.f.j = (e, t) => {
						var r = c.o(n, e) ? n[e] : void 0;
						if (0 !== r)
							if (r) t.push(r[2]);
							else {
								var o = new Promise(
									(t, o) =>
										(r = n[e] =
											[
												t,
												o,
											]),
								);
								t.push((r[2] = o));
								var a = c.p + c.u(e),
									i = new Error();
								c.l(
									a,
									(t) => {
										if (c.o(n, e) && (0 !== (r = n[e]) && (n[e] = void 0), r)) {
											var o = t && ('load' === t.type ? 'missing' : t.type),
												a = t && t.target && t.target.src;
											((i.message = 'Loading chunk ' + e + ' failed.\n(' + o + ': ' + a + ')'),
												(i.name = 'ChunkLoadError'),
												(i.type = o),
												(i.request = a),
												r[1](i));
										}
									},
									'chunk-' + e,
									e,
								);
							}
					};
					var e = (e, t) => {
							var r,
								o,
								[
									a,
									i,
									s,
								] = t,
								l = 0;
							if (a.some((e) => 0 !== n[e])) {
								for (r in i) c.o(i, r) && (c.m[r] = i[r]);
								s && s(c);
							}
							for (e && e(t); l < a.length; l++)
								((o = a[l]), c.o(n, o) && n[o] && n[o][0](), (n[o] = 0));
						},
						t = (self.webpackChunk_poc_app_main = self.webpackChunk_poc_app_main || []);
					(t.forEach(e.bind(null, 0)), (t.push = e.bind(null, t.push.bind(t))));
				})(),
				(c.nc = void 0));
			var l = {};
			(() => {
				'use strict';
				(c.r(l), c.d(l, { Dashboard: () => w, LazyAppHeader: () => k }));
				var e = c(80),
					t = c(671),
					r = c.n(t);
				const o = n('react'),
					a = n('react-dom/client');
				var i = c(599),
					s = c.n(i),
					d = c(644),
					p = c.n(d),
					u = c(280),
					f = c.n(u),
					m = c(575),
					h = c.n(m),
					v = c(979),
					b = c.n(v),
					x = c(160),
					g = c.n(x),
					y = c(166),
					j = {};
				((j.styleTagTransform = g()),
					(j.setAttributes = h()),
					(j.insert = f().bind(null, 'head')),
					(j.domAPI = p()),
					(j.insertStyleElement = b()),
					s()(y.A, j),
					y.A && y.A.locals && y.A.locals);
				const k = (0, o.lazy)(() =>
						Promise.resolve()
							.then(c.bind(c, 34))
							.then((n) => c.t(n, 22)),
					),
					N = (0, o.lazy)(() =>
						c
							.e(583)
							.then(c.bind(c, 583))
							.then(({ Banner: n }) => ({ default: n })),
					),
					w = () => {
						const [
								n,
								t,
							] = (0, o.useState)(!1),
							[
								a,
								i,
							] = (0, o.useState)(0),
							s = r()(() => {
								i((n) => n + 1);
							}, 300);
						return (0, e.jsxs)('div', {
							className: 'dashboard',
							children: [
								(0, e.jsx)('div', { className: 'app-version', children: 'app-main v0.0.1' }),
								(0, e.jsxs)('div', {
									className: 'remote-block',
									children: [
										n
											? null
											: (0, e.jsx)('button', {
													className: 'ant-btn ant-btn-primary',
													onClick: () => t(!0),
													children: 'Load AppHeader lazily',
												}),
										n
											? (0, e.jsx)(o.Suspense, {
													fallback: (0, e.jsx)('div', {
														className: 'loading-placeholder',
														children: 'Loading microfrontend header…',
													}),
													children: (0, e.jsx)(k, {}),
												})
											: null,
									],
								}),
								(0, e.jsxs)('div', {
									className: 'env-section',
									children: [
										(0, e.jsx)('h3', { children: 'Environment (bndlkt.env)' }),
										(0, e.jsxs)('div', {
											className: 'env-table',
											children: [
												(0, e.jsx)('span', { className: 'env-key', children: '__SOME_VAR__' }),
												(0, e.jsx)('span', {
													className: 'env-value',
													children: window.bndlkt.env.__SOME_VAR__,
												}),
												(0, e.jsx)('span', { className: 'env-type', children: 'string' }),
												(0, e.jsx)('span', { className: 'env-key', children: '_BOOL_' }),
												(0, e.jsx)('span', {
													className: 'env-value',
													children: String(window.bndlkt.env._BOOL_),
												}),
												(0, e.jsx)('span', { className: 'env-type', children: 'boolean' }),
												(0, e.jsx)('span', { className: 'env-key', children: 'API_TIMEOUT_MS' }),
												(0, e.jsx)('span', {
													className: 'env-value',
													children: window.bndlkt.env.API_TIMEOUT_MS,
												}),
												(0, e.jsx)('span', { className: 'env-type', children: 'number' }),
											],
										}),
									],
								}),
								(0, e.jsx)(o.Suspense, {
									fallback: (0, e.jsx)('div', {
										className: 'loading-placeholder',
										children: 'Loading chunk…',
									}),
									children: (0, e.jsx)(N, {}),
								}),
								(0, e.jsxs)('div', {
									className: 'demo-section',
									children: [
										(0, e.jsx)('h3', { children: 'Tree shaking demo: lodash' }),
										(0, e.jsxs)('div', {
											className: 'demo-content',
											children: [
												(0, e.jsx)('button', {
													className: 'ant-btn',
													onClick: s,
													children: 'Increase counter',
												}),
												(0, e.jsxs)('span', {
													className: 'demo-counter',
													children: [
														'Counter: ',
														a,
													],
												}),
												(0, e.jsx)('span', {
													className: 'demo-debounce',
													children: 'debounce: 300ms',
												}),
											],
										}),
										(0, e.jsxs)('p', {
											className: 'demo-description',
											children: [
												'Uses ',
												(0, e.jsx)('code', { children: "import debounce from 'lodash/debounce'" }),
												'. Thanks to bndlkt, only the ',
												(0, e.jsx)('code', { children: 'debounce' }),
												' function is included in the bundle, not the whole lodash. Package‑level tree shaking works even with CommonJS modules.',
											],
										}),
									],
								}),
								(0, e.jsxs)('div', {
									className: 'demo-section',
									children: [
										(0, e.jsx)('h3', { children: 'Externals demo: react-dom' }),
										(0, e.jsxs)('p', {
											className: 'demo-description',
											children: [
												(0, e.jsx)('code', { children: 'react-dom' }),
												' is not used in the code, so it is completely excluded from the bundle. The required ',
												(0, e.jsx)('code', { children: 'react-dom/client' }),
												' is provided as an external dependency via bndlkt and loaded separately. This avoids duplication and reduces bundle size.',
											],
										}),
									],
								}),
								(0, e.jsxs)('div', {
									className: 'info-block',
									children: [
										(0, e.jsxs)('span', {
											className: 'badge',
											children: [
												'Ecosystem Environment ',
												a,
											],
										}),
										(0, e.jsx)('h1', { children: 'bndlkt Core Orchestrator' }),
										(0, e.jsxs)('p', {
											className: 'description',
											children: [
												(0, e.jsx)('strong', { children: 'Proof of Concept (PoC)' }),
												' — validating the concept: parallel dependency loading, scope switching without rebuild, runtime env injection, package‑level tree shaking, and centralised versioning via backend.',
											],
										}),
										(0, e.jsxs)('div', {
											className: 'status-grid',
											children: [
												(0, e.jsxs)('div', {
													className: 'status-item',
													children: [
														(0, e.jsx)('span', {
															className: 'status-label',
															children: 'Runtime Engine',
														}),
														(0, e.jsx)('span', { className: 'status-value', children: 'Webpack' }),
													],
												}),
												(0, e.jsxs)('div', {
													className: 'status-item',
													children: [
														(0, e.jsx)('span', {
															className: 'status-label',
															children: 'Render Core',
														}),
														(0, e.jsx)('span', {
															className: 'status-value',
															children: 'React v19.2',
														}),
													],
												}),
												(0, e.jsxs)('div', {
													className: 'status-item',
													children: [
														(0, e.jsx)('span', {
															className: 'status-label',
															children: 'Sandbox Node',
														}),
														(0, e.jsx)('span', { className: 'status-value', children: 'app-main' }),
													],
												}),
												(0, e.jsxs)('div', {
													className: 'status-item',
													children: [
														(0, e.jsx)('span', {
															className: 'status-label',
															children: 'Orchestration Layer',
														}),
														(0, e.jsx)('span', {
															className: 'status-value',
															style: { color: '#ff9800' },
															children: 'CommonJS (PoC)',
														}),
													],
												}),
											],
										}),
									],
								}),
							],
						});
					},
					S = document.getElementById('root');
				null !== S &&
					(0, a.createRoot)(S).render((0, e.jsx)(o.StrictMode, { children: (0, e.jsx)(w, {}) }));
			})();
			var d = t;
			for (var p in l) d[p] = l[p];
			l.__esModule && Object.defineProperty(d, '__esModule', { value: !0 });
		})();
	}).call(t, n, e, t);
});
