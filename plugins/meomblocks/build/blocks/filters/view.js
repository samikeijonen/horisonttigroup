/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@meom/navigation/dist/index.esm.js":
/*!*************************************************************!*\
  !*** ../../node_modules/@meom/navigation/dist/index.esm.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Navigation: () => (/* binding */ Navigation),
/* harmony export */   animate: () => (/* binding */ animate),
/* harmony export */   updateAria: () => (/* binding */ updateAria)
/* harmony export */ });
/**
 * Apply a CSS animation to an element
 *
 * @param {Node}    elem      The element to animate.
 * @param {string}  animation Class name for animation.
 * @param {boolean} hide      Class name for hiding animated element.
 */
function animate( elem, animation, hide ) {
    // If there's no element or animation, do nothing.
    if ( ! elem || ! animation ) {
        return;
    }

    // Apply the animation.
    elem.classList.add( animation );

    // Detect when the animation ends.
    elem.addEventListener(
        'animationend',
        function endAnimation() {
            // Remove the animation class.
            elem.classList.remove( animation );

            // If the element should be hidden, hide it.
            if ( hide ) {
                elem.classList.remove( hide );
            }

            // Remove this event listener.
            elem.removeEventListener( 'animationend', endAnimation, false );
        },
        false
    );
}

/**
 * Update ARIA.
 *
 * @param {Object} el Element.
 * @param {string} aria ARIA to change.
 */
function updateAria( el, aria ) {
    if ( 'undefined' === typeof el || 0 >= aria.length ) {
        return;
    }

    const hiddenEl =
        'true' === el.getAttribute( `aria-${ aria }` ) ? 'false' : 'true';
    el.setAttribute( `aria-${ aria }`, hiddenEl );
}

/* Import internal depedencies. */

const TAB_KEY = 9;
const ESCAPE_KEY = 27;

/**
 * Define the constructor to instantiate a navigation.
 *
 * @class
 * @param {Object} element Navigation element.
 * @param {Object} toggle  Navigation toggle element.
 * @param {Object} options The settings and options for this instance.
 */
function Navigation(element, toggle, options = {}) {
    // Default settings.
    const defaults = {
        action: 'click',
        subNavAnchors: '.js-site-nav-items > .menu-item-has-children > a',
        subSubNavAnchors:
            '.js-site-nav-items .sub-menu > .menu-item-has-children > a',
        toggleNavClass: true,
        toggleNavClassValue: 'is-opened',
        toggleSubNavClassValue: 'is-opened',
        closeNavOnEscKey: true,
        closeNavOnLastTab: false,
        subNavClass: '.sub-menu',
        subToggleButtonClasses: '',
        subSubToggleButtonClasses: '',
        animateSubNav: false,
        animateSubNavClass: '',
        visuallyHiddenClass: 'screen-reader-text',
        expandChildNavText: 'Sub menu',
        dropDownIcon:
            '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg>',
        onCreate: null,
        onOpenNav: null,
        onCloseNav: null,
        onOpenSubNav: null,
        onCloseSubNav: null,
    };

    // Bind methods.
    this._handleNav = this.handleNav.bind(this);
    this._handleSubNav = this.handleSubNav.bind(this);
    this._handleCloseNav = this.handleCloseNav.bind(this);
    this._handleCloseSubNav = this.handleCloseSubNav.bind(this);
    this._closeAllSubMenus = this.closeAllSubMenus.bind(this);
    this._closeAllSubSubMenus = this.closeAllSubSubMenus.bind(this);
    this._setSubMenu = this.setSubMenu.bind(this);
    this._closeAllSubMenuToggles = this.closeAllSubMenuToggles.bind(this);
    this._closeAllSubSubMenuToggles = this.closeAllSubSubMenuToggles.bind(this);
    this._handleDocClick = this.handleDocClick.bind(this);
    this._handleFocus = this.handleFocus.bind(this);

    // Merge options to defaults.
    const settings = { ...defaults, ...options };

    // Set elements and settings.
    this.$element = element;
    this.$toggle = toggle;
    this.settings = settings;
    this.navOpened = false;

    // Set all sub and sub sub navigations.
    this.$subNavs = this.$element.querySelectorAll(this.settings.subNavAnchors);
    this.$subSubNavs = this.$element.querySelectorAll(
        this.settings.subSubNavAnchors
    );

    // Initialise everything needed for the navigation.
    this.create();
}

/**
 * Setup navigation.
 */
Navigation.prototype.create = function () {
    // Set ARIA for navigation toggle button.
    this.$toggle.setAttribute('aria-expanded', 'false');

    // Set data value for nav element. This is for targeting without a class name.
    this.$element.setAttribute('data-meom-nav', 'navigation');

    // Setup sub navs toggle buttons.
    this.$subNavs.forEach(function (subNav) {
        // Hide link in JS to avoid cumulative layout shift (CLS).
        if (this.settings.action === 'click') {
            subNav.setAttribute('hidden', '');
        }

        const subToggleButton = document.createElement('button');
        subToggleButton.setAttribute('data-meom-nav', 'sub-toggle');
        subToggleButton.setAttribute('aria-expanded', 'false');

        subToggleButton.className = `${this.settings.subToggleButtonClasses}`;
        subToggleButton.type = 'button';

        if (this.settings.action === 'click') {
            subToggleButton.innerHTML = `${subNav.textContent}${this.settings.dropDownIcon}`;
        }

        if (this.settings.action === 'hover') {
            subToggleButton.innerHTML = `<span class="${this.settings.visuallyHiddenClass}">${this.settings.expandChildNavText}</span>${this.settings.dropDownIcon}`;
        }

        // Add toggle button after anchor.
        subNav.after(subToggleButton);
    }, this);

    // Setup sub sub navs toggle buttons.
    this.$subSubNavs.forEach(function (subSubNav, index) {
        const subToggleButton = document.createElement('button');
        subToggleButton.setAttribute('data-meom-nav', 'sub-sub-toggle');
        subToggleButton.setAttribute('aria-expanded', 'false');

        subToggleButton.setAttribute('aria-controls', `sub-sub-menu-${index}`);
        // Add matching id for next sub-sub-menu.
        if (subSubNav.nextElementSibling) {
            subSubNav.nextElementSibling.id = `sub-sub-menu-${index}`;
        }

        subToggleButton.className = `${this.settings.subSubToggleButtonClasses}`;
        subToggleButton.type = 'button';

        subToggleButton.innerHTML = `<span class="${this.settings.visuallyHiddenClass}">${this.settings.expandChildNavText}</span>${this.settings.dropDownIcon}`;

        // Add toggle button after anchor.
        subSubNav.after(subToggleButton);
    }, this);

    // Set event listeners.
    this.$toggle.addEventListener('click', this._handleNav, false);
    this.$element.addEventListener('click', this._handleSubNav, false);
    document.addEventListener('keydown', this._handleCloseNav, false);
    this.$element.addEventListener('keydown', this._handleCloseSubNav, false);
    this.$element.addEventListener('keydown', this._handleFocus, false);
    document.addEventListener('click', this._handleDocClick, false);

    /**
     * Called after the component is initialized.
     *
     * @callback onCreate
     */
    if (
        this.settings.onCreate &&
        typeof this.settings.onCreate === 'function'
    ) {
        this.settings.onCreate(this.$element, this.$toggle);
    }

    return this;
};

/**
 * Handle navigation opening and closing.
 *
 * @param {Event} event
 * @return {this} this
 */
Navigation.prototype.handleNav = function (event) {
    // If navigation is closed and we want to open it.
    if (!this.navOpened) {
        updateAria(this.$toggle, 'expanded');

        if (this.settings.toggleNavClass) {
            this.$element.classList.add(this.settings.toggleNavClassValue);
        }

        // Set navigation as opened.
        this.navOpened = true;

        /**
         * Called after the nav is opened.
         *
         * @callback onOpenNav
         */
        if (
            this.settings.onOpenNav &&
            typeof this.settings.onOpenNav === 'function'
        ) {
            this.settings.onOpenNav(this.$element, this.$toggle, event);
        }
    } else {
        updateAria(this.$toggle, 'expanded');

        if (this.settings.toggleNavClass) {
            this.$element.classList.remove(this.settings.toggleNavClassValue);
        }

        // Set focus back to toggle button.
        if (this.$toggle) {
            this.$toggle.focus();
        }

        // Set navigation as closed.
        this.navOpened = false;

        this._closeAllSubMenus();
        this._closeAllSubMenuToggles();

        /**
         * Called after the nav is closed.
         *
         * @callback onCloseNav
         */
        if (
            this.settings.onCloseNav &&
            typeof this.settings.onCloseNav === 'function'
        ) {
            this.settings.onCloseNav(this.$element, this.$toggle, event);
        }
    }

    return this;
};

/**
 * Handle sub navigation opening and closing.
 *
 * @param {Event} event
 * @return {this} this
 */
Navigation.prototype.handleSubNav = function (event) {
    const target = event.target;
    // Use .closest because there can be SVG inside the button.
    const closestSubButton = target.closest('[data-meom-nav="sub-toggle"]');
    const closestSubSubButton = target.closest(
        '[data-meom-nav="sub-sub-toggle"]'
    );

    // If the clicked element doesn't have the correct data attribute, bail.
    if (!closestSubButton && !closestSubSubButton) {
        return this;
    }

    // Close other sub menus first.
    // If toggle <button> next element (sub-menu) is already open, skip this.
    // Or we are clicking sub sub toggle.
    if (
        !target.nextElementSibling.classList.contains(
            this.settings.toggleSubNavClassValue
        ) &&
        !target.matches('[data-meom-nav="sub-sub-toggle"]')
    ) {
        this._closeAllSubMenus();
        this._closeAllSubMenuToggles();
    }

    // Then again, close all sub sub menus when trying to open any other sub sub menu that is not already open.
    // So that only one sub sub menu can be open at current time.
    if (
        !target.nextElementSibling.classList.contains(
            this.settings.toggleSubNavClassValue
        ) &&
        target.matches('[data-meom-nav="sub-sub-toggle"]')
    ) {
        this._closeAllSubSubMenus(target);
        this._closeAllSubSubMenuToggles(target);
    }

    // Update sub toggle ARIA.
    updateAria(target, 'expanded');

    // Toggle class for next <ul> element (sub-menu).
    if (target.nextElementSibling) {
        this._setSubMenu(target.nextElementSibling, event);
    }

    return this;
};

/**
 * Handle closing nav with Esc key.
 *
 * @param {Object} event Event triggered.
 * @return {this} this
 */
Navigation.prototype.handleCloseNav = function (event) {
    // Close nav on Esc key if nav is open.
    if (
        this.navOpened &&
        this.settings.closeNavOnEscKey &&
        ESCAPE_KEY === event.keyCode
    ) {
        this._handleNav(event);
    }

    return this;
};

/**
 * Handle closing sub-nav with Tab or Esc key.
 *
 * @param {Object} event Event triggered.
 * @return {this} this
 */
Navigation.prototype.handleCloseSubNav = function (event) {
    // Set focusable elements inside sub-menu element.
    const openSubMenu = document.querySelector(
        `${this.settings.subNavClass}.${this.settings.toggleSubNavClassValue}`
    );

    if (openSubMenu) {
        // Focusable elements.
        const focusableElements = openSubMenu.querySelectorAll([
            'a[href]',
            'area[href]',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'button:not([disabled])',
        ]);

        const lastFocusableElement =
            focusableElements[focusableElements.length - 1];

        // Last Tab closes sub-menu.
        if (
            TAB_KEY === event.keyCode &&
            !event.shiftKey &&
            event.target === lastFocusableElement
        ) {
            this._closeAllSubMenus();
            this._closeAllSubMenuToggles();
        }

        const subMenuToggle = openSubMenu.previousElementSibling;

        // Shift+Tab from sub-menu toggle closes sub-menu.
        if (
            subMenuToggle &&
            TAB_KEY === event.keyCode &&
            event.shiftKey &&
            event.target === subMenuToggle
        ) {
            this._closeAllSubMenus();
            this._closeAllSubMenuToggles();
        }
    }

    // Close sub-menu on Esc key.
    if (ESCAPE_KEY === event.keyCode) {
        // If we are on the sub-menu toggle itself.
        if (
            event.target.matches(
                '[data-meom-nav="sub-toggle"][aria-expanded="true"]'
            )
        ) {
            this._handleSubNav(event);
            this._closeAllSubMenus();
            this._closeAllSubMenuToggles();
            return this;
        }

        // Previous sub-menu toggle.
        const parentSubMenu = event.target.closest(
            `${this.settings.subNavClass}.${this.settings.toggleSubNavClassValue}`
        );

        // Set focus to sub menu toggle.
        if (parentSubMenu) {
            // sub-menu toggle.
            const subMenuToggle = parentSubMenu.previousElementSibling;

            // Set focus back to sub-menu toggle.
            if (subMenuToggle) {
                subMenuToggle.focus();
            }
        }

        this._closeAllSubMenus();
        this._closeAllSubMenuToggles();
    }

    return this;
};

/**
 * Handle focus when nav is open.
 *
 * @param {Object} event Event triggered.
 * @return {this} this
 */
Navigation.prototype.handleFocus = function (event) {
    // Bail if menu is not open.
    if (!this.navOpened) {
        return this;
    }

    // Bail if `closeNavOnLastTab` setting is not set to true.
    if (!this.settings.closeNavOnLastTab) {
        return this;
    }

    // Set focusable elements inside element.
    const focusableElements = this.$element.querySelectorAll([
        'a[href]',
        'area[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
    ]);

    const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

    // Close nav on last Tab.
    if (
        TAB_KEY === event.keyCode &&
        !event.shiftKey &&
        event.target === lastFocusableElement
    ) {
        event.preventDefault();
        // Close nav.
        this._handleNav(event);
    }

    return this;
};

/**
 * Handle closing sub-navs when clicking outside of nav.
 *
 * @param {Object} event Event triggered.
 * @return {this} this
 */
Navigation.prototype.handleDocClick = function (event) {
    // Bail if clicking inside the nav.
    if (event.target.closest('[data-meom-nav="navigation"]')) {
        return this;
    }

    this._closeAllSubMenus();
    this._closeAllSubMenuToggles();

    return this;
};

/**
 * Close all sub menus.
 *
 * @return {this} this
 */
Navigation.prototype.closeAllSubMenus = function () {
    const openSubMenus = document.querySelectorAll(
        `${this.settings.subNavClass}.${this.settings.toggleSubNavClassValue}`
    );

    openSubMenus.forEach(function (openSubMenu) {
        this._setSubMenu(openSubMenu);
    }, this);

    return this;
};

/**
 * Close only same level sub sub menus.
 *
 * @param {Object} target Target triggered.
 * @return {this} this
 */
Navigation.prototype.closeAllSubSubMenus = function (target) {
    const sameLevelParentSubMenu = target.closest(
        `${this.settings.subNavClass}.${this.settings.toggleSubNavClassValue}`
    );

    // Get same level sub sub menus
    const openSubSubMenus = sameLevelParentSubMenu.querySelectorAll(
        `${this.settings.subNavClass}.${this.settings.toggleSubNavClassValue}`
    );

    openSubSubMenus.forEach(function (openSubSubMenu) {
        this._setSubMenu(openSubSubMenu);
    }, this);

    return this;
};

/**
 * Set classes and animate for sub-menu.
 *
 * @param {Node}   submenu Sub menu node.
 * @param {Object} event   Event.
 * @return {this} this
 */
Navigation.prototype.setSubMenu = function (submenu, event) {
    if (!submenu) {
        return this;
    }

    if (!submenu.classList.contains(this.settings.toggleSubNavClassValue)) {
        submenu.classList.add(this.settings.toggleSubNavClassValue);

        // Base animation with class.
        if (this.settings.animateSubNav) {
            animate(submenu, this.settings.animateSubNavClass);
        }

        /**
         * Called after the sub nav is opened.
         *
         * @callback onOpenSubNav
         */
        if (
            this.settings.onOpenSubNav &&
            typeof this.settings.onOpenSubNav === 'function'
        ) {
            this.settings.onOpenSubNav(
                this.$element,
                this.$toggle,
                submenu,
                event
            );
        }
    } else {
        submenu.classList.remove(this.settings.toggleSubNavClassValue);

        /**
         * Called after the sub nav is closed.
         *
         * @callback onCloseSubNav
         */
        if (
            this.settings.onCloseSubNav &&
            typeof this.settings.onCloseSubNav === 'function'
        ) {
            this.settings.onCloseSubNav(
                this.$element,
                this.$toggle,
                submenu,
                event
            );
        }
    }

    return this;
};

/**
 * Close all sub menu toggles.
 *
 * @return {this} this
 */
Navigation.prototype.closeAllSubMenuToggles = function () {
    const openSubMenuToggles = document.querySelectorAll(
        '[data-meom-nav="sub-toggle"][aria-expanded="true"]'
    );

    openSubMenuToggles.forEach(function (openSubMenuToggle) {
        updateAria(openSubMenuToggle, 'expanded');
    });

    const openSubSubMenuToggles = document.querySelectorAll(
        '[data-meom-nav="sub-sub-toggle"][aria-expanded="true"]'
    );

    openSubSubMenuToggles.forEach(function (openSubSubMenuToggle) {
        updateAria(openSubSubMenuToggle, 'expanded');
    });

    return this;
};

/**
 * Close all same level sub sub menu toggles.
 *
 * @param {Object} target Target.
 * @return {this} this
 */
Navigation.prototype.closeAllSubSubMenuToggles = function (target) {
    const sameLevelParentSubMenu = target.closest(
        `${this.settings.subNavClass}.${this.settings.toggleSubNavClassValue}`
    );

    const openSubSubMenuToggles = sameLevelParentSubMenu.querySelectorAll(
        '[data-meom-nav="sub-sub-toggle"][aria-expanded="true"]'
    );

    openSubSubMenuToggles.forEach(function (openSubSubMenuToggle) {
        updateAria(openSubSubMenuToggle, 'expanded');
    });

    return this;
};




/***/ }),

/***/ "./src/blocks/filters/helpers/buildQueryString.js":
/*!********************************************************!*\
  !*** ./src/blocks/filters/helpers/buildQueryString.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 * Build a query string from an object of data
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com/how-to-build-a-query-string-from-an-object-of-data-with-vanilla-js/
 * @param  {Object} data The data to turn into a query string
 * @return {String}      The query string
 */
function buildQueryString(data) {
  return new URLSearchParams(data).toString();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildQueryString);

/***/ }),

/***/ "./src/blocks/filters/helpers/calcCount.js":
/*!*************************************************!*\
  !*** ./src/blocks/filters/helpers/calcCount.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getCheckedCheckboxes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCheckedCheckboxes */ "./src/blocks/filters/helpers/getCheckedCheckboxes.js");


/**
 * Count all checked checkboxes for different filters.
 *
 * @param {Object} element Element.
 */
function calcCount(element) {
  // Count wrapper.
  const filtersCount = document.querySelector('.js-filters-count');

  // Bails early.
  if (filtersCount) {
    // Get all checkboxes.
    const checkboxesCount = (0,_getCheckedCheckboxes__WEBPACK_IMPORTED_MODULE_0__["default"])(element);

    // Set count.
    filtersCount.innerHTML = checkboxesCount.length;
  }

  // Calculate count for each fieldset. Do not use for now.
  /*
  const fieldsetToggles = document.querySelectorAll(
      '[data-meom-filters="fieldset-toggle"]'
  );
   for ( const fieldsetToggle of fieldsetToggles ) {
      // Fieldset is the next sibling of the button.
      const fieldsetWrapper = fieldsetToggle.nextElementSibling;
      const checkboxesCount = getCheckedCheckboxes( fieldsetWrapper );
       // Update count.
      const fieldsetCount = fieldsetToggle.querySelector(
          '.filters__fieldset-toggle-count'
      );
       if ( fieldsetCount ) {
          fieldsetCount.innerHTML = `(${ checkboxesCount.length })`;
      }
  }
  */
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calcCount);

/***/ }),

/***/ "./src/blocks/filters/helpers/fetchPosts.js":
/*!**************************************************!*\
  !*** ./src/blocks/filters/helpers/fetchPosts.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/a11y */ "@wordpress/a11y");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_a11y__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _loadMoreMarkup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loadMoreMarkup */ "./src/blocks/filters/helpers/loadMoreMarkup.js");
/* global */
/* eslint-disable @wordpress/no-unused-vars-before-return */

/* Import external depedencies. */



/* Import internal depedencies. */


/**
 * Fetch data based on args.
 *
 * @param {Object}  args   Arguments for query.
 * @param {boolean} append Append markup or not.
 */
function fetchPosts(args, append = false) {
  // Where to populate markup.
  const filtersItems = document.querySelector('[data-meom-filters="items-content"]');

  // Bail if there is no filters nor markup wrapper.
  if (!filtersItems) {
    return;
  }

  // Spinner.
  const spinner = document.querySelector('[data-meom-filters="spinner"]');

  // Load more button.
  const loadMore = document.querySelector('[data-meom-filters="load-more"]');
  if (!args) {
    return;
  }

  // Animations.
  filtersItems.classList.add('is-loading');

  // Start showing spinner.
  if (spinner) {
    spinner.removeAttribute('hidden');
  }

  // Fetch the data based on args.
  fetch((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)('/wp-json/wp_query/args/', args)).then(function (response) {
    // The API call was succesful.
    if (response.ok) {
      // Add total amount of pages to the state.
      const pages = parseInt(response.headers.get('x-wp-totalpages'), 10);
      args.pages = pages;

      // Add total count of results to the state.
      const count = parseInt(response.headers.get('x-wp-total'), 10);
      args.count = count;

      // And to HTML.
      const countWrapper = document.querySelector('[data-meom-filters="submit-count"]');
      if (countWrapper) {
        countWrapper.innerHTML = `&nbsp;(${count})`;
      }

      // Handle load more button visibility.
      (0,_loadMoreMarkup__WEBPACK_IMPORTED_MODULE_2__["default"])(pages, loadMore, args);
      return response.json();
    }
    return Promise.reject(response);
  }).then(function (data) {
    // `data.html` has markup already.
    const markup = data.html ? data.html : `<p>${data.messages.empty}</p>`;

    // Append to existing markup if we are loading more content.
    if (append) {
      filtersItems.innerHTML += markup;
    } else {
      // Reset content first.
      filtersItems.innerHTML = '';
      filtersItems.innerHTML = markup;
    }

    // End animation and hide the spinner.
    filtersItems.classList.remove('is-loading');
    if (spinner) {
      spinner.setAttribute('hidden', '');
    }

    // Announce screen readers and other AT base info on the fly.
    const announceText = data.html ? data.messages.success : data.messages.empty;
    (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_0__.speak)(announceText);
  }).catch(function (err) {
    // There was an error.
    console.warn('Something went wrong.', err); // eslint-disable-line

    filtersItems.classList.remove('is-loading');
    if (spinner) {
      spinner.setAttribute('hidden', '');
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchPosts);

/***/ }),

/***/ "./src/blocks/filters/helpers/getCheckedCheckboxes.js":
/*!************************************************************!*\
  !*** ./src/blocks/filters/helpers/getCheckedCheckboxes.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Get all checked checkboxes for different filters.
 *
 * @param {Object} element Elements to loop.
 */
function getCheckedCheckboxes(element) {
  // Get all checkboxes.
  const checkboxes = element.querySelectorAll('input[type="checkbox"]');

  // Collect checked ones in array.
  const allChecked = [];

  // Collect checked ones and add value (taxonomy slug) to array.
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      allChecked.push(checkbox.value);
    }
  });

  // Return checked ones.
  return allChecked;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCheckedCheckboxes);

/***/ }),

/***/ "./src/blocks/filters/helpers/handleFetch.js":
/*!***************************************************!*\
  !*** ./src/blocks/filters/helpers/handleFetch.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _buildQueryString__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildQueryString */ "./src/blocks/filters/helpers/buildQueryString.js");
/* harmony import */ var _fetchPosts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetchPosts */ "./src/blocks/filters/helpers/fetchPosts.js");
/* harmony import */ var _showSelectedFilters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./showSelectedFilters */ "./src/blocks/filters/helpers/showSelectedFilters.js");
/* harmony import */ var _serializeForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./serializeForm */ "./src/blocks/filters/helpers/serializeForm.js");
/* harmony import */ var _calcCount__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./calcCount */ "./src/blocks/filters/helpers/calcCount.js");
/* global history, location */

/* Import internal depedencies. */






/**
 * Handle fetching data.
 *
 * @param {boolean} append      Append to markup or not.
 * @param {Object}  args        Arguments.
 * @param {Object}  urlObject   URL object, what to show in URL.
 * @param {string}  postType    Which post type.
 * @param {Object}  filtersForm Which form.
 * @param {Object}  config      JSON-config for filters.
 */
function handleFetch(append = false, args, urlObject, postType, filtersForm, config) {
  // Reset filter state at first.
  args.tax_query = [];
  args.meta_query = [];

  // Reset urlObject first.
  urlObject = {};

  // Query for `customer` post type.
  if (postType === 'house') {
    // Get data from form.
    const formData = new FormData(filtersForm);
    const dataValues = (0,_serializeForm__WEBPACK_IMPORTED_MODULE_3__["default"])(formData);

    // Loop tax_query from config.
    const taxQueries = config[postType].tax_query;
    if (taxQueries) {
      for (const taxQuery of taxQueries) {
        if (dataValues[taxQuery.name] && dataValues[taxQuery.name].length > 0) {
          args.tax_query.push({
            taxonomy: taxQuery.taxonomy,
            field: 'slug',
            terms: dataValues[taxQuery.name]
          });

          // Add URL query parameter.
          urlObject[taxQuery.urlKey] = dataValues[taxQuery.name];
        }
      }
    }

    // Handle order.
    const orderName = config[postType].order.name;
    if (dataValues[orderName]) {
      // Latest first.
      if (dataValues[orderName] === 'newest-first') {
        args.orderby = 'date';
        args.order = 'DESC';
      }

      // Oldest first.
      if (dataValues[orderName] === 'oldest-first') {
        args.orderby = 'date';
        args.order = 'ASC';
      }

      // By title asc.
      if (dataValues[orderName] === 'title-asc') {
        args.orderby = 'post_title';
        args.order = 'ASC';
      }

      // By title desc.
      if (dataValues[orderName] === 'title-desc') {
        args.orderby = 'post_title';
        args.order = 'DESC';
      }

      // Default is the newest, we don't need any order for that.
      if (dataValues[orderName] !== 'newest-first') {
        urlObject[config.post.order.urlKey] = dataValues[orderName];
      }
    }

    // Reset search (args.s) before setting new one so that old value is not there.
    args.s = '';

    // Add search if there is value.
    if (dataValues[config.search.name]) {
      args.s = dataValues[config.search.name];
      urlObject[config.search.urlKey] = dataValues[config.search.name];
    }
  }

  // Language code to show right string translations.
  const languageCode = document.querySelector('input[name="language_code"]');
  if (languageCode) {
    args.language_code = languageCode.value;
  }

  // Language slug to get items only from current language.
  const lang = document.querySelector('input[name="lang"]');
  if (lang) {
    args.lang = lang.value;
  }

  // Add page number to fetch or reset to back to 1.
  if (append) {
    args.paged = 1 + args.paged;
  } else {
    args.paged = 1;
  }

  // Fetch posts based on args.
  (0,_fetchPosts__WEBPACK_IMPORTED_MODULE_1__["default"])(args, append, filtersForm);

  // Add buttons which match the selected filters.
  // By clicking them it will remove that filter.
  (0,_showSelectedFilters__WEBPACK_IMPORTED_MODULE_2__["default"])(append, args, urlObject, postType, filtersForm, config);

  // Update count.
  (0,_calcCount__WEBPACK_IMPORTED_MODULE_4__["default"])(filtersForm);

  // Build query string if we have urlObject. Else remove query string from the URL.
  const updatedUrl = Object.entries(urlObject).length > 0 ? '?' + (0,_buildQueryString__WEBPACK_IMPORTED_MODULE_0__["default"])(urlObject) : `${location.protocol}//${location.host}${location.pathname}`;

  // Add state to the history and update URL.
  history.replaceState(args, document.title, updatedUrl);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleFetch);

/***/ }),

/***/ "./src/blocks/filters/helpers/loadMoreMarkup.js":
/*!******************************************************!*\
  !*** ./src/blocks/filters/helpers/loadMoreMarkup.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * When to hide or show the load more button.
 *
 * @param {number} pages    Total count of pages.
 * @param {Object} loadMore Loadmore element.
 * @param {Object} args     Arguments.
 */
function loadMoreMarkup(pages, loadMore, args) {
  if (!loadMore) {
    return;
  }
  if (args.paged >= pages) {
    loadMore.setAttribute('hidden', '');
  } else {
    loadMore.removeAttribute('hidden');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadMoreMarkup);

/***/ }),

/***/ "./src/blocks/filters/helpers/selectedFilterButton.js":
/*!************************************************************!*\
  !*** ./src/blocks/filters/helpers/selectedFilterButton.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Markup for the button holding the selected filter.
 *
 * @param {string} key   Name for the key.
 * @param {string} value Name for the value
 */
function selectedFilterButton(key, value) {
  // Value is weird for number value 0.
  if (!key || !value && value !== 0) {
    return;
  }
  const selectedFilter = document.querySelector(`input[data-meom-filters="${key}"][value="${value}"]`);
  if (!selectedFilter) {
    return;
  }
  const label = selectedFilter.getAttribute('data-meom-filters-label');
  if (!label) {
    return;
  }
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('data-meom-filters', 'remove-filter');
  button.setAttribute('data-meom-filters-key', key);
  button.setAttribute('data-meom-filters-value', value);
  button.className = 'filters__remove-filter';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z" /></svg>' + label;
  return button;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selectedFilterButton);

/***/ }),

/***/ "./src/blocks/filters/helpers/serializeForm.js":
/*!*****************************************************!*\
  !*** ./src/blocks/filters/helpers/serializeForm.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * When to hide or show the load more button.
 *
 * https://gomakethings.com/serializing-form-data-with-the-vanilla-js-formdata-object/
 * https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json?rq=1
 *
 * @param {Object} formData Form data.
 */
function serializeForm(formData) {
  const dataValues = {};
  formData.forEach((value, key) => {
    // Reflect.has in favor of dataValues.hasOwnProperty(key).
    if (!Reflect.has(dataValues, key)) {
      dataValues[key] = value;
      return;
    }

    // Checkboxes etc. where you can get multiple values, set them as array.
    if (!Array.isArray(dataValues[key])) {
      dataValues[key] = [dataValues[key]];
    }

    // And push to array.
    dataValues[key].push(value);
  });
  return dataValues;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (serializeForm);

/***/ }),

/***/ "./src/blocks/filters/helpers/showSelectedFilters.js":
/*!***********************************************************!*\
  !*** ./src/blocks/filters/helpers/showSelectedFilters.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _selectedFilterButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selectedFilterButton */ "./src/blocks/filters/helpers/selectedFilterButton.js");
/* harmony import */ var _handleFetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handleFetch */ "./src/blocks/filters/helpers/handleFetch.js");



/**
 * Show selected filters.
 *
 * @param {boolean} append      Append to markup or not.
 * @param {Object}  args        Arguments.
 * @param {Object}  urlObject   URL object, what to show in URL.
 * @param {string}  postType    Which post type.
 * @param {Object}  filtersForm Which form.
 * @param {Object}  config      JSON-config for filters.
 */
function showSelectedFilters(append = false, args, urlObject, postType, filtersForm, config) {
  // Where to populate the selected items.
  const filtersSelected = document.querySelector('[data-meom-filters="selected"]');

  // Bail if there is no filters nor markup wrapper.
  if (!filtersSelected) {
    return;
  }
  filtersSelected.innerHTML = '';

  // Taxonomies.
  if (args.tax_query.length > 0) {
    const taxArgs = args.tax_query;
    for (const taxKey of taxArgs) {
      // If we have array of terms, let's loop them over.
      // And create a button to remote the same filter.
      if (Array.isArray(taxKey.terms)) {
        for (const taxValue of taxKey.terms) {
          const buttonMarkup = (0,_selectedFilterButton__WEBPACK_IMPORTED_MODULE_0__["default"])(taxKey.taxonomy, taxValue);
          if (buttonMarkup) {
            filtersSelected.appendChild(buttonMarkup);
          }
        }
      } else {
        const buttonMarkup = (0,_selectedFilterButton__WEBPACK_IMPORTED_MODULE_0__["default"])(taxKey.taxonomy, taxKey.terms);
        if (buttonMarkup) {
          filtersSelected.appendChild(buttonMarkup);
        }
      }
    }

    // Create clear selected filters button.
    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.setAttribute('data-meom-filters', 'reset');
    resetButton.className = 'filters__reset';
    resetButton.innerHTML = 'Poista kaikki valinnat';
    filtersSelected.appendChild(resetButton);
  }

  /**
   * Handle selected filter button click.
   *
   * @param {Object} event
   */
  function handleSelectedFilters(event) {
    const target = event.target;
    // Use .closest because there can be SVG inside the button.
    const removeFilterButton = target.closest('[data-meom-filters="remove-filter"]');

    // If the clicked element doesn't have the correct data attribute, bail.
    if (!removeFilterButton) {
      return;
    }
    const key = removeFilterButton.getAttribute('data-meom-filters-key');
    const value = removeFilterButton.getAttribute('data-meom-filters-value');
    const selectedFilter = document.querySelector('input[data-meom-filters="' + key + '"][value="' + value + '"]');
    if (selectedFilter) {
      selectedFilter.checked = false;

      // Do the fetch.
      (0,_handleFetch__WEBPACK_IMPORTED_MODULE_1__["default"])(append, args, urlObject, postType, filtersForm, config);
    }
  }

  // Listen remove filter chips click.
  document.addEventListener('click', handleSelectedFilters, false);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showSelectedFilters);

/***/ }),

/***/ "@wordpress/a11y":
/*!******************************!*\
  !*** external ["wp","a11y"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["a11y"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

module.exports = window["wp"]["url"];

/***/ }),

/***/ "../meom-filters/filters-config.json":
/*!*******************************************!*\
  !*** ../meom-filters/filters-config.json ***!
  \*******************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"house":{"tax_query":[{"taxonomy":"house-price-category","name":"tax-house-price-category","urlKey":"hinta"},{"taxonomy":"house-cash-flow","name":"tax-house-cash-flow","urlKey":"kassavirta"},{"taxonomy":"house-rental-income","name":"tax-house-rental-income","urlKey":"vuokratuotto"},{"taxonomy":"house-type","name":"tax-house-type","urlKey":"huoneita"},{"taxonomy":"house-city","name":"tax-house-city","urlKey":"sijainti"},{"taxonomy":"house-status","name":"tax-house-status","urlKey":"status"}],"meta_query":[],"order":{"name":"order","urlKey":"orderBy","options":[{"value":"title-asc","label":"By title asc","default":true},{"value":"title-desc","label":"By title desc"},{"value":"newest-first","label":"Newest first"},{"value":"oldest-first","label":"Oldest first"}]}},"search":{"name":"s","urlKey":"searchBy"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./src/blocks/filters/view.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _meom_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @meom/navigation */ "../../node_modules/@meom/navigation/dist/index.esm.js");
/* harmony import */ var _helpers_handleFetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/handleFetch */ "./src/blocks/filters/helpers/handleFetch.js");
/* harmony import */ var _meom_filters_filters_config_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../../meom-filters/filters-config.json */ "../meom-filters/filters-config.json");
/* Import external depedencies. */

 // eslint-disable-line

/* Import internal depedencies. */



/**
 * Filters.
 */
const filters = () => {
  // Filters form.
  const filtersForm = document.querySelector('[data-meom-filters="form"]');

  // Bail if there is no filters nor markup wrapper.
  if (!filtersForm) {
    return;
  }

  // Filters wrapper
  const filtersWrapper = document.querySelector('[data-meom-filters="filters-wrapper"]');

  // Load more button.
  const loadMore = document.querySelector('[data-meom-filters="load-more"]');

  // Filters toggle button.
  const filtersToggle = document.querySelector('[data-meom-filters="filters-toggle"]');

  // Filters close button.
  const filtersClose = document.querySelector('[data-meom-filters="close"]');

  // Overlay.
  const filtersOverlay = document.querySelector('[data-meom-filters="overlay"]');

  // Filters submit button.
  const filtersSubmit = document.querySelector('[data-meom-filters="submit"]');

  // Filters reset button.
  const filtersReset = document.querySelector('[data-meom-filters="reset"]');

  // Post type from data attribute `data-meom-filters-post-type`.
  const postType = filtersForm.getAttribute('data-meom-filters-post-type') ? filtersForm.getAttribute('data-meom-filters-post-type') : 'customer';

  // Default filter arguments.
  const args = {
    post_type: postType,
    posts_per_page: 12,
    paged: 1
  };

  // Let's pick what we put in to the URL.
  const urlObject = {};

  /**
   * Handle changes on form.
   *
   * @param {Object} event Event object.
   */
  function handleChange(event) {
    event.preventDefault();
    (0,_helpers_handleFetch__WEBPACK_IMPORTED_MODULE_2__["default"])(false, args, urlObject, postType, filtersForm, _meom_filters_filters_config_json__WEBPACK_IMPORTED_MODULE_3__);
  }

  /**
   * Handle load more button click.
   *
   */
  function handleLoadMore() {
    // Do the fetch and append to existing posts.
    (0,_helpers_handleFetch__WEBPACK_IMPORTED_MODULE_2__["default"])(true, args, urlObject, postType, filtersForm, _meom_filters_filters_config_json__WEBPACK_IMPORTED_MODULE_3__);
  }

  /**
   * Handle filter toggle button click.
   *
   */
  function handleFilterToggle() {
    filtersWrapper.classList.toggle('is-opened');
    (0,_meom_navigation__WEBPACK_IMPORTED_MODULE_1__.updateAria)(filtersToggle, 'expanded');
    document.querySelector('html').classList.toggle('filters-scroll-stop');
  }

  /**
   * Handle filter reset button click.
   *
   * @param {Object} event Event object.
   */
  function handleFilterReset(event) {
    // Bail if not clicking reset button (several same buttons).
    if (!event.target.closest('[data-meom-filters="reset"]')) {
      return;
    }
    filtersForm.reset();

    // And then handle fetch.
    (0,_helpers_handleFetch__WEBPACK_IMPORTED_MODULE_2__["default"])(false, args, urlObject, postType, filtersForm, _meom_filters_filters_config_json__WEBPACK_IMPORTED_MODULE_3__);
  }

  /**
   * Handle filter reset button click.
   *
   * @param {Object} event Event object.
   */
  function handleFilterFieldsetToggle(event) {
    // Bail if not clicking fieldset toggle button (several same buttons).
    if (!event.target.closest('[data-meom-filters="fieldset-toggle"]')) {
      return;
    }
    (0,_meom_navigation__WEBPACK_IMPORTED_MODULE_1__.updateAria)(event.target, 'expanded');
  }

  /**
   * Close filters when clicking outside.
   *
   * @param {Object} event
   */
  function handleDocClick(event) {
    // Bail if clicking inside the filters.
    if (event.target.closest('[data-meom-filters="filters-wrapper"]')) {
      return;
    }

    // Or clicking inside the form.
    if (event.target.closest('[data-meom-filters="form"]')) {
      return;
    }

    // Close filters if they are open.
    if (filtersWrapper && filtersWrapper.classList.contains('is-opened')) {
      handleFilterToggle();
    }
  }

  /**
   * Init filters and load filters from URL query vars.
   */
  function initFilters() {
    // Clear all fields.
    filtersForm.reset();

    // Get state from the URL.
    const getStateFromUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.getQueryArgs)(document.location.href);

    // Check all checkboxes which match the URL query vars.
    // This way we can send the link to someone else or refresh the page.
    if (Object.entries(getStateFromUrl).length > 0) {
      // Loop tax_query from config.
      const taxQueries = _meom_filters_filters_config_json__WEBPACK_IMPORTED_MODULE_3__[postType].tax_query;
      if (taxQueries) {
        for (const taxQuery of taxQueries) {
          const statesFromUrl = getStateFromUrl[taxQuery.urlKey];
          if (statesFromUrl && statesFromUrl.length > 0) {
            // Get all checkboxes based on name.
            const allTaxCheckboxes = filtersForm.querySelectorAll(`[name="${taxQuery.name}"]`);

            // Loop them over and check them if URL query parameter array includes the value.
            const statesFromUrlValues = statesFromUrl.split(',');
            allTaxCheckboxes.forEach(checkbox => {
              if (statesFromUrlValues.includes(checkbox.value)) {
                checkbox.checked = true;
              }
            });
          }
        }
      }

      // Select correct order.
      if (getStateFromUrl[_meom_filters_filters_config_json__WEBPACK_IMPORTED_MODULE_3__[postType].order.urlKey]) {
        const selectOrder = document.querySelector(`[name="${_meom_filters_filters_config_json__WEBPACK_IMPORTED_MODULE_3__[postType].order.name}"] option[value="${getStateFromUrl[_meom_filters_filters_config_json__WEBPACK_IMPORTED_MODULE_3__[postType].order.urlKey]}"]`);
        if (selectOrder) {
          selectOrder.selected = true;
        }
      }

      // Output search value.
      if (getStateFromUrl[_meom_filters_filters_config_json__WEBPACK_IMPORTED_MODULE_3__.search.urlKey]) {
        const search = document.querySelector(`[name="${_meom_filters_filters_config_json__WEBPACK_IMPORTED_MODULE_3__.search.name}"]`);
        if (search) {
          search.value = getStateFromUrl[_meom_filters_filters_config_json__WEBPACK_IMPORTED_MODULE_3__.search.urlKey];
        }
      }
    }

    // Do the fetch.
    (0,_helpers_handleFetch__WEBPACK_IMPORTED_MODULE_2__["default"])(false, args, urlObject, postType, filtersForm, _meom_filters_filters_config_json__WEBPACK_IMPORTED_MODULE_3__);
  }

  // Listen change and submit events on filters form.
  filtersForm.addEventListener('change', handleChange, false);
  filtersForm.addEventListener('submit', handleChange, false);

  // Listen load more clicks.
  if (loadMore) {
    loadMore.addEventListener('click', handleLoadMore, false);
  }

  // Listen filter toggle clicks.
  if (filtersToggle) {
    filtersToggle.addEventListener('click', handleFilterToggle, false);
  }

  // Listen filter close clicks.
  if (filtersClose) {
    filtersClose.addEventListener('click', handleFilterToggle, false);
  }

  // Listen filter overlay clicks.
  if (filtersOverlay) {
    filtersOverlay.addEventListener('click', handleFilterToggle, false);
  }

  // Listen filter submit clicks.
  if (filtersSubmit) {
    filtersSubmit.addEventListener('click', handleFilterToggle, false);
  }

  // Listen filter reset clicks.
  if (filtersReset) {
    document.addEventListener('click', handleFilterReset, false);
  }

  // Listen filter fieldset clicks.
  filtersForm.addEventListener('click', handleFilterFieldsetToggle, false);

  // Handle clicking outside of filters.
  document.addEventListener('click', handleDocClick, false);

  // Listen history changes (browser back and forward button).
  // popstate have event.state which we could use but let's use the URL as source of truth.
  window.addEventListener('popstate', initFilters);

  // Init filters.
  initFilters();
};
filters();
})();

/******/ })()
;
//# sourceMappingURL=view.js.map