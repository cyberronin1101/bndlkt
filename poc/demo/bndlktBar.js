/**
 * Creates an environment switcher widget, isolated in Shadow DOM.
 *
 * @param {Object} config - widget configuration
 * @param {string[]} config.scopes - list of available environments (strings)
 * @param {function} config.onSelect - callback when an environment is selected (receives the selected value string)
 * @param {'bottom'|'top'} [config.position='bottom'] - snap to bottom or top edge of the screen
 * @param {string} [config.initialValue] - initial value (defaults to the first element of scopes)
 * @param {string} [config.resetValue] - value for reset (if not set, resets to the first scope)
 * @param {string} [config.adminHref='#'] - link to the admin panel
 * @param {string} [config.customStyles] - additional CSS string (will be added to the Shadow DOM)
 * @returns {{ element: HTMLElement, destroy: Function, updateScopes: Function }}
 */
const bndlktBar = (config) => {
	const {
		scopes,
		onSelect,
		position = 'bottom',
		initialValue,
		resetValue,
		adminHref = '#',
		customStyles = '',
	} = config;

	// Host (empty, without styles)
	const host = document.createElement('div');
	document.body.appendChild(host);
	const shadow = host.attachShadow({
		mode: 'open',
	});

	// Styles
	const styles = `
    .widget {
      position: fixed;
      left: 20%;
      z-index: 9999;
      user-select: none;
      -webkit-user-select: none;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      min-width: 280px;
      max-width: 60%;
      background: #ffffff;
      border: 1px solid #d9d9d9;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      box-sizing: border-box;
    }

    .widget.position-bottom {
      bottom: 0;
      border-radius: 8px 8px 0 0;
      border-bottom: none;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
    }
    .widget.position-top {
      top: 0;
      border-radius: 0 0 8px 8px;
      border-top: none;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    .logo-link, .logo {
      display: flex;
      text-decoration: none;
      flex-shrink: 0;
    }
    .logo-link {
      border-radius: 4px;
    }
    .logo-link:focus-visible {
      outline: 1px solid #7642E8;
      outline-offset: 1px;
      box-shadow: 0 0 0 4px rgba(118, 66, 232, 0.15);
    }
    .logo {
      width: 22px;
      height: 22px;
      line-height: 22px;
      background: linear-gradient(135deg, #7642E8, #374DD9);
      border-radius: 4px;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 700;
      font-size: 13px;
    }

    .reset-btn {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #7642E8, #374DD9);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      line-height: 1;
      padding: 0;
      transition: opacity 0.15s, transform 0.1s;
      flex-shrink: 0;
    }
    .reset-btn:hover { opacity: 0.92; }
    .reset-btn:active { transform: scale(0.96); }
    .reset-btn:focus-visible {
      outline: 1px solid #7642E8;
      outline-offset: 1px;
      box-shadow: 0 0 0 4px rgba(118, 66, 232, 0.15);
    }

    .custom-select {
      position: relative;
      flex-grow: 1;
      height: 22px;
    }

    .select-trigger {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
    }

    .select-input {
      width: 100%;
      height: 100%;
      padding: 0 24px 0 8px;
      font-size: 12px;
      line-height: normal;
      color: #1a1a2e;
      background: #ffffff;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      outline: none;
      box-sizing: border-box;
      cursor: pointer;
      transition: border-color 0.15s, box-shadow 0.15s;
      font-family: inherit;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .select-input:hover {
      border-color: #b9b9b9;
    }
    .custom-select.open .select-input {
      border-color: #7642E8;
      box-shadow: 0 0 0 2px rgba(118, 66, 232, 0.15);
    }
    .select-input:focus-visible {
      border-color: #7642E8;
      box-shadow: 0 0 0 2px rgba(118, 66, 232, 0.15);
    }

    .arrow {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      width: 10px;
      height: 10px;
      background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23374DD9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>") center/contain no-repeat;
    }

    .dropdown {
      position: absolute;
      left: 0;
      right: 0;
      background: #ffffff;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      display: none;
      z-index: 10;
      padding: 4px 0;
      bottom: calc(100% + 2px);
      top: auto;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
    }
    .dropdown.down {
      top: calc(100% + 2px);
      bottom: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    .custom-select.open .dropdown { display: flex; flex-direction: column; }

    .options-list {
      list-style: none;
      margin: 0;
      padding: 0;
      max-height: 160px;
      overflow-y: auto;
    }

    .option {
      padding: 5px 8px;
      font-size: 12px;
      color: #1a1a2e;
      cursor: pointer;
    }
    
    .option.highlighted { 
      background: linear-gradient(150deg, #c5b5e7, #cfd2e2); 
    }
    .option.selected {
      font-weight: 500;
      color: #eeeeee;
      background: linear-gradient(150deg, #9571e6, #596ad6);
    }
    .option.selected.highlighted {
      background: linear-gradient(150deg, #7642e8, #374dd9);
    }
    .option.hidden { display: none; }

    .not-found {
      padding: 5px 8px;
      font-size: 12px;
      line-height: normal;
      color: #999;
      margin: 0;
      display: none;
    }
    .not-found.visible { display: block; }

    ${customStyles}
  `;

	// Generate options
	const buildOptionsHTML = (list) =>
		list.map((s) => `<li class="option" data-value="${s}">${s}</li>`).join('');

	const markup = `
    <div class="widget position-${position}">
      <a class="logo-link" href="${adminHref}" target="_blank" title="Admin panel">
        <div class="logo">B</div>
      </a>
      <div class="custom-select">
        <div class="select-trigger">
          <input type="text" class="select-input" autocomplete="off" readonly >
          <span class="arrow"></span>
        </div>
        <div class="dropdown">
          <ul class="options-list">
            ${buildOptionsHTML(scopes)}
          </ul>
          <div class="not-found">Not found</div>
        </div>
      </div>
      <button class="reset-btn" title="Reset to the first scope">🗙</button>
    </div>
  `;

	shadow.innerHTML = `<style>${styles}</style>${markup}`;

	// Elements
	const widget = shadow.querySelector('.widget');
	const resetBtn = shadow.querySelector('.reset-btn');

	const input = shadow.querySelector('.select-input');
	const customSelect = shadow.querySelector('.custom-select');
	const dropdown = shadow.querySelector('.dropdown');
	const optionsList = shadow.querySelector('.options-list');
	const notFoundEl = shadow.querySelector('.not-found');
	let optionItems = optionsList.querySelectorAll('.option');

	// State
	const defaultVal = initialValue && scopes.includes(initialValue) ? initialValue : scopes[0];
	let currentValue = defaultVal;
	let highlightedIndex = 0;
	let mouseDownInside = false;

	// Prevent text selection inside widget
	widget.addEventListener('selectstart', (e) => e.preventDefault());

	// Utilities
	const getVisibleOptions = () =>
		Array.from(optionItems).filter((opt) => !opt.classList.contains('hidden'));

	const removeHighlight = () => optionItems.forEach((opt) => opt.classList.remove('highlighted'));

	const highlightOptionByElement = (optionElement) => {
		removeHighlight();
		if (optionElement) {
			optionElement.classList.add('highlighted');
			const visible = getVisibleOptions();
			highlightedIndex = visible.indexOf(optionElement);
			if (highlightedIndex < 0) {
				highlightedIndex = 0;
			}
		}
	};

	const highlightOptionByIndex = (index) => {
		const visible = getVisibleOptions();
		if (visible.length === 0) {
			removeHighlight();
			return;
		}
		if (index < 0) {
			index = visible.length - 1;
		}
		if (index >= visible.length) {
			index = 0;
		}
		removeHighlight();
		visible[index].classList.add('highlighted');
		highlightedIndex = index;
	};

	const updateNotFound = () => {
		const visibleCount = getVisibleOptions().length;
		notFoundEl.classList.toggle('visible', visibleCount === 0);
	};

	const filterOptions = (query) => {
		const lowerQuery = query.toLowerCase();
		optionItems.forEach((opt) => {
			const text = opt.getAttribute('data-value').toLowerCase();
			if (text.includes(lowerQuery)) {
				opt.classList.remove('hidden');
			} else {
				opt.classList.add('hidden');
				opt.classList.remove('highlighted');
			}
		});
		updateNotFound();
		removeHighlight();
		const visible = getVisibleOptions();
		if (visible.length > 0) {
			highlightOptionByIndex(0);
		}
	};

	const setCurrentValue = (value, focus = true) => {
		currentValue = value;
		input.value = value;
		if (focus) {
			input.focus();
		}
		input.placeholder = value;
		optionItems.forEach((opt) => {
			opt.classList.remove('selected');
			if (opt.getAttribute('data-value') === value) {
				opt.classList.add('selected');
			}
		});
		filterOptions('');
		input.setAttribute('readonly', true);
		dropdown.classList.remove('down');
	};

	const updateDropdownDirection = () => {
		const widgetRect = widget.getBoundingClientRect();
		const estimatedDropdownHeight = 168;
		const dropDownClass = dropdown.classList;
		dropDownClass.remove('down');

		if (position === 'bottom') {
			const spaceAbove = widgetRect.top;
			if (spaceAbove < estimatedDropdownHeight) {
				const spaceBelow = window.innerHeight - widgetRect.bottom;
				if (spaceBelow >= estimatedDropdownHeight) {
					dropDownClass.add('down');
				}
			}
		} else {
			const spaceBelow = window.innerHeight - widgetRect.bottom;
			if (spaceBelow >= estimatedDropdownHeight) {
				dropDownClass.add('down');
			}
		}
	};

	// Global mouse handlers (persistent)
	const onDocMouseDown = (e) => {
		if (customSelect.classList.contains('open') && !host.contains(e.target)) {
			closeDropdown();
		}
	};

	const onDocMouseUp = () => {
		mouseDownInside = false;
	};

	const openDropdown = () => {
		if (customSelect.classList.contains('open')) {
			return;
		}

		document.addEventListener('mousedown', onDocMouseDown, true);
		document.addEventListener('mouseup', onDocMouseUp, true);
		document.addEventListener('keydown', docListeners);

		customSelect.classList.add('open');
		input.removeAttribute('readonly');
		input.focus();
		input.select();
		updateDropdownDirection();
		filterOptions('');
		const visible = getVisibleOptions();
		const idx = visible.findIndex((opt) => opt.getAttribute('data-value') === currentValue);
		if (idx !== -1) {
			highlightOptionByIndex(idx);
		} else if (visible.length > 0) {
			highlightOptionByIndex(0);
		}
	};

	const closeDropdown = () => {
		if (!customSelect.classList.contains('open')) {
			return;
		}

		document.removeEventListener('mousedown', onDocMouseDown);
		document.removeEventListener('mouseup', onDocMouseUp);
		document.removeEventListener('keydown', docListeners);
		customSelect.classList.remove('open');
		input.setAttribute('readonly', true);
		if (input.value !== currentValue) {
			input.value = currentValue;
		}
		filterOptions('');
		notFoundEl.classList.remove('visible');
		dropdown.classList.remove('down');
	};

	// Handlers on dropdown and input
	dropdown.addEventListener('mousedown', (e) => {
		e.stopPropagation();
		mouseDownInside = true;
	});

	input.addEventListener('blur', () => {
		if (!mouseDownInside) {
			closeDropdown();
		}
		mouseDownInside = false;
	});

	const docListeners = (e) => {
		const visible = getVisibleOptions();
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			highlightOptionByIndex(highlightedIndex + 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			highlightOptionByIndex(highlightedIndex - 1);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (visible.length > 0) {
				selectOptionElement(visible[highlightedIndex]);
			}
		} else if (e.key === 'Escape') {
			e.preventDefault();
			closeDropdown();
		}
	};

	// Keyboard navigation and actions — entirely on input
	input.addEventListener('keydown', (e) => {
		e.stopPropagation();

		if (!customSelect.classList.contains('open')) {
			if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				e.preventDefault();
				openDropdown();
			}
			return;
		}

		const visible = getVisibleOptions();
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			highlightOptionByIndex(highlightedIndex + 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			highlightOptionByIndex(highlightedIndex - 1);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (visible.length > 0) {
				selectOptionElement(visible[highlightedIndex]);
			}
		} else if (e.key === 'Escape') {
			e.preventDefault();
			closeDropdown();
		}
	});

	const selectOptionElement = (optionElement) => {
		const value = optionElement.getAttribute('data-value');
		setCurrentValue(value);
		if (typeof onSelect === 'function') {
			onSelect(value);
		}
		closeDropdown();
	};

	// ========== Other handlers ==========
	input.addEventListener('click', () => {
		if (customSelect.classList.contains('open')) {
			closeDropdown();
		} else {
			openDropdown();
		}
	});

	input.addEventListener('input', () => {
		filterOptions(input.value);
	});

	optionsList.addEventListener('mouseover', (e) => {
		const option = e.target.closest('.option');
		if (option) {
			highlightOptionByElement(option);
		}
	});

	optionsList.addEventListener('click', (e) => {
		const option = e.target.closest('.option');
		if (option) {
			selectOptionElement(option);
		}
	});

	resetBtn.addEventListener('click', () => {
		const resetScope = resetValue && scopes.includes(resetValue) ? resetValue : scopes[0];
		setCurrentValue(resetScope);
		if (typeof onSelect === 'function') {
			onSelect(resetScope);
		}
		closeDropdown();
	});

	// Initialization
	setCurrentValue(defaultVal, false);

	return {
		element: host,
		destroy() {
			document.removeEventListener('mousedown', onDocMouseDown);
			document.removeEventListener('mouseup', onDocMouseUp);
			host.remove();
		},
		updateScopes(newScopes) {
			const newDefault =
				currentValue && newScopes.includes(currentValue) ? currentValue : newScopes[0];
			optionsList.innerHTML = buildOptionsHTML(newScopes);
			optionItems = optionsList.querySelectorAll('.option');
			setCurrentValue(newDefault);
			closeDropdown();
		},
	};
};

window.bndlktUi = ({ adminPanelUrl, url, onReady }) => {
	const setCookie = (name, value) => {
		const date = new Date();
		date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
		document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}; SameSite=Lax`;
	};

	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) {
			return parts.pop().split(';').shift();
		}
		return null;
	}

	// Read the current page URL using the browser's built-in parser
	const urlParams = new URLSearchParams(window.location.search);

	// Extract our query parameter (e.g. ?bndlkt-scope=test1)
	const scopeFromUrl = urlParams.get('bndlkt-scope');

	function selectScope(scope) {
		setCookie('bndlkt-scope', scope);
		updateQuery('bndlkt-scope', scope);
		console.log(`🔄 Switching to ${scope}, reloading...`);
		window.location.reload();
	}

	// 🎯 UNIVERSAL FUNCTION TO UPDATE URL WITHOUT RELOADING
	const updateQuery = (key, value) => {
		const urlParams = new URLSearchParams(window.location.search);

		if (value === null || value === undefined) {
			// If no value is provided — completely remove the key from the URL
			urlParams.delete(key);
			console.log(`🧹 [bndlkt-url] Query parameter "${key}" successfully removed from URL.`);
		} else {
			// If a value is provided — update or add it to the URL
			urlParams.set(key, value);
			console.log(`📝 [bndlkt-url] URL updated: ?${key}=${value}`);
		}

		// Build the clean URL path
		const newQuery = urlParams.toString();
		const newUrl =
			window.location.pathname + (newQuery ? `?${newQuery}` : '') + window.location.hash;

		// Seamlessly replace the URL in browser history (page does NOT reload)
		window.history.replaceState(
			{
				path: newUrl,
			},
			'',
			newUrl,
		);
	};

	fetch(url)
		.then((data) => data.json())
		.then(({ scopes, resetScope }) => {
			const initialScope = (() => {
				if (scopeFromUrl) {
					if (scopes.includes(scopeFromUrl)) {
						setCookie('bndlkt-scope', scopeFromUrl);
						return scopeFromUrl;
					}
					setCookie('bndlkt-scope', resetScope);
					updateQuery('bndlkt-scope', resetScope);
					return resetScope;
				}

				const currentScope = getCookie('bndlkt-scope');
				if (currentScope && scopes.includes(currentScope)) {
					updateQuery('bndlkt-scope', currentScope);
					return currentScope;
				}

				setCookie('bndlkt-scope', resetScope);
				updateQuery('bndlkt-scope', resetScope);
				return resetScope;
			})();

			bndlktBar({
				scopes,
				onSelect: selectScope,
				initialValue: initialScope,
				resetValue: resetScope,
				adminHref: adminPanelUrl,
			});

			onReady();
		});
};
