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

/***/ "./js/components/animate-in-view.js":
/*!******************************************!*\
  !*** ./js/components/animate-in-view.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global IntersectionObserver */
/* https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API */
/**
 * Animate elements when they appear on view.
 *
 * Link 1: https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/
 * Link 2: https://www.hweaver.com/intersection-observer-single-page-navigation/
 *
 * Example CSS could look something like this for animated text:
 *
 * .text-and-image__content h2,
 * .text-and-image__content p  {
 *      animation-duration: $transition-duration-5;
 *      animation-fill-mode: both;
 *      opacity: 0;
 * }
 *
 * .is-animating .text-and-image__content h2,
 * .is-animating .text-and-image__content p {
 *      animation-name: fade-in-down;
 *}
 */
const animateInView = () => {
  // Add data attributes for animations.
  const siteAnimations = document.querySelectorAll('.iloq-animation > h1, .iloq-animation > h2, .iloq-animation > h3, .iloq-animation > p, .iloq-animation > div ');
  siteAnimations.forEach(siteAnimation => {
    siteAnimation.dataset.animated = 'animated';
  });

  // Start generating the animation trigger.
  const animations = document.querySelectorAll('[data-animated]');
  let prevYPosition = 0;
  let direction = 'up';

  /**
   * What to do when firing animation.
   *
   * @param {Object} target
   */
  function fireAnimation(target) {
    target.classList.add('is-animating');
  }

  /**
   * When to fire animation.
   *
   * @param {Object} entry Our entry.
   * @return {boolean}     true or false.
   */
  function shouldUpdate(entry) {
    // We don't really use down or up in here but might be useful for other projects.
    if (direction === 'down' && entry.isIntersecting) {
      return true;
    }
    if (direction === 'up' && entry.isIntersecting) {
      return true;
    }
    return false;
  }

  /**
   * Animation logic.
   *
   * @param {*} entries
   */
  function onIntersect(entries) {
    entries.forEach(entry => {
      if (window.scrollY > prevYPosition) {
        direction = 'down';
      } else {
        direction = 'up';
      }
      prevYPosition = window.scrollY;
      const target = entry.target;
      if (shouldUpdate(entry)) {
        fireAnimation(target);
      }
    });
  }

  /* Observe when 50% in view. */
  const options = {
    rootMargin: '0px',
    threshold: 0.5
  };
  const observer = new IntersectionObserver(onIntersect, options);

  /* Observe all sections which have `data-animatated` attribute. */
  animations.forEach(animation => {
    observer.observe(animation);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (animateInView);

/***/ }),

/***/ "./js/components/component-heights.js":
/*!********************************************!*\
  !*** ./js/components/component-heights.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ componentHeights)
/* harmony export */ });
function componentHeights() {
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const siteHeaderHeight = siteHeader.offsetHeight + 'px';
    document.documentElement.style.setProperty('--site-header-height', siteHeaderHeight);
  }
  const faultMessages = document.querySelector('.fault-messages-js');
  if (faultMessages) {
    const faultMessagesHeight = faultMessages.offsetHeight + 'px';
    document.documentElement.style.setProperty('--fault-messages-height', faultMessagesHeight);
  }
}

/***/ }),

/***/ "./js/components/photoswipe.js":
/*!*************************************!*\
  !*** ./js/components/photoswipe.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var photoswipe_lightbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! photoswipe/lightbox */ "../../node_modules/photoswipe/dist/photoswipe-lightbox.esm.js");
/* global */
 // eslint-disable-line

const photoSwipe = () => {
  // Add needed data attributes to images.
  const images = document.querySelectorAll('.wp-block-gallery a');
  for (const image of images) {
    // Get image height and width.
    const img = image.querySelector('img');
    const imgHeight = img.getAttribute('height');
    const imgWidth = img.getAttribute('width');
    image.setAttribute('data-pswp-height', imgHeight);
    image.setAttribute('data-pswp-width', imgWidth);
  }
  const lightbox = new photoswipe_lightbox__WEBPACK_IMPORTED_MODULE_0__["default"]({
    gallery: '.wp-block-gallery',
    children: 'a',
    pswpModule: () => __webpack_require__.e(/*! import() */ "vendors-node_modules_photoswipe_dist_photoswipe_esm_js").then(__webpack_require__.bind(__webpack_require__, /*! photoswipe */ "../../node_modules/photoswipe/dist/photoswipe.esm.js")) // eslint-disable-line
  });
  lightbox.init();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (photoSwipe);

/***/ }),

/***/ "./js/components/site-nav.js":
/*!***********************************!*\
  !*** ./js/components/site-nav.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _meom_navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @meom/navigation */ "../../node_modules/@meom/navigation/dist/index.esm.js");
/* global kalaData */

const siteNav = () => {
  // Mandatory elements.
  const navItems = document.querySelector('.js-site-nav-items');
  const navToggle = document.querySelector('.js-site-nav-toggle');

  // Bail if there is no nav nor toggle button.
  if (!navItems || !navToggle) {
    return;
  }
  new _meom_navigation__WEBPACK_IMPORTED_MODULE_0__.Navigation(navItems, navToggle, {
    subNavAnchors: '.js-site-nav-items .menu-item-has-children > a',
    subSubNavAnchors: '.js-site-nav-items .sub-menu > .menu-item-has-children > a',
    subToggleButtonClasses: 'site-nav__sub-toggle',
    subSubToggleButtonClasses: 'site-nav__sub-sub-toggle',
    // Set this to false because we manually add classes for animation.
    toggleNavClass: false,
    // Translatable string for sub menu text.
    // `kalaData` is located in `/includes/enqueue-assets.php`.
    expandChildNavText: kalaData.expandChildNavText,
    onOpenNav(element) {
      // Prevent scrolling on page.
      document.documentElement.classList.add('is-overflow-hidden');
      document.documentElement.classList.add('is-nav-opened');
      element.classList.add('is-opened');
      (0,_meom_navigation__WEBPACK_IMPORTED_MODULE_0__.animate)(element, 'fade-in');
    },
    onCloseNav(element) {
      // Allow scrolling on page.
      document.documentElement.classList.remove('is-overflow-hidden');
      document.documentElement.classList.remove('is-nav-opened');
      (0,_meom_navigation__WEBPACK_IMPORTED_MODULE_0__.animate)(element, 'fade-out', 'is-opened');
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (siteNav);

/***/ }),

/***/ "../../node_modules/photoswipe/dist/photoswipe-lightbox.esm.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/photoswipe/dist/photoswipe-lightbox.esm.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PhotoSwipeLightbox)
/* harmony export */ });
/*!
  * PhotoSwipe Lightbox 5.4.3 - https://photoswipe.com
  * (c) 2023 Dmytro Semenov
  */
/** @typedef {import('../photoswipe.js').Point} Point */

/**
 * @template {keyof HTMLElementTagNameMap} T
 * @param {string} className
 * @param {T} tagName
 * @param {Node} [appendToEl]
 * @returns {HTMLElementTagNameMap[T]}
 */
function createElement(className, tagName, appendToEl) {
  const el = document.createElement(tagName);

  if (className) {
    el.className = className;
  }

  if (appendToEl) {
    appendToEl.appendChild(el);
  }

  return el;
}
/**
 * Get transform string
 *
 * @param {number} x
 * @param {number} [y]
 * @param {number} [scale]
 * @returns {string}
 */

function toTransformString(x, y, scale) {
  let propValue = `translate3d(${x}px,${y || 0}px,0)`;

  if (scale !== undefined) {
    propValue += ` scale3d(${scale},${scale},1)`;
  }

  return propValue;
}
/**
 * Apply width and height CSS properties to element
 *
 * @param {HTMLElement} el
 * @param {string | number} w
 * @param {string | number} h
 */

function setWidthHeight(el, w, h) {
  el.style.width = typeof w === 'number' ? `${w}px` : w;
  el.style.height = typeof h === 'number' ? `${h}px` : h;
}
/** @typedef {LOAD_STATE[keyof LOAD_STATE]} LoadState */

/** @type {{ IDLE: 'idle'; LOADING: 'loading'; LOADED: 'loaded'; ERROR: 'error' }} */

const LOAD_STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error'
};
/**
 * Check if click or keydown event was dispatched
 * with a special key or via mouse wheel.
 *
 * @param {MouseEvent | KeyboardEvent} e
 * @returns {boolean}
 */

function specialKeyUsed(e) {
  return 'button' in e && e.button === 1 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
/**
 * Parse `gallery` or `children` options.
 *
 * @param {import('../photoswipe.js').ElementProvider} [option]
 * @param {string} [legacySelector]
 * @param {HTMLElement | Document} [parent]
 * @returns HTMLElement[]
 */

function getElementsFromOption(option, legacySelector, parent = document) {
  /** @type {HTMLElement[]} */
  let elements = [];

  if (option instanceof Element) {
    elements = [option];
  } else if (option instanceof NodeList || Array.isArray(option)) {
    elements = Array.from(option);
  } else {
    const selector = typeof option === 'string' ? option : legacySelector;

    if (selector) {
      elements = Array.from(parent.querySelectorAll(selector));
    }
  }

  return elements;
}
/**
 * Check if variable is PhotoSwipe class
 *
 * @param {any} fn
 * @returns {boolean}
 */

function isPswpClass(fn) {
  return typeof fn === 'function' && fn.prototype && fn.prototype.goTo;
}
/**
 * Check if browser is Safari
 *
 * @returns {boolean}
 */

function isSafari() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}

/** @typedef {import('../lightbox/lightbox.js').default} PhotoSwipeLightbox */

/** @typedef {import('../photoswipe.js').default} PhotoSwipe */

/** @typedef {import('../photoswipe.js').PhotoSwipeOptions} PhotoSwipeOptions */

/** @typedef {import('../photoswipe.js').DataSource} DataSource */

/** @typedef {import('../ui/ui-element.js').UIElementData} UIElementData */

/** @typedef {import('../slide/content.js').default} ContentDefault */

/** @typedef {import('../slide/slide.js').default} Slide */

/** @typedef {import('../slide/slide.js').SlideData} SlideData */

/** @typedef {import('../slide/zoom-level.js').default} ZoomLevel */

/** @typedef {import('../slide/get-thumb-bounds.js').Bounds} Bounds */

/**
 * Allow adding an arbitrary props to the Content
 * https://photoswipe.com/custom-content/#using-webp-image-format
 * @typedef {ContentDefault & Record<string, any>} Content
 */

/** @typedef {{ x?: number; y?: number }} Point */

/**
 * @typedef {Object} PhotoSwipeEventsMap https://photoswipe.com/events/
 *
 *
 * https://photoswipe.com/adding-ui-elements/
 *
 * @prop {undefined} uiRegister
 * @prop {{ data: UIElementData }} uiElementCreate
 *
 *
 * https://photoswipe.com/events/#initialization-events
 *
 * @prop {undefined} beforeOpen
 * @prop {undefined} firstUpdate
 * @prop {undefined} initialLayout
 * @prop {undefined} change
 * @prop {undefined} afterInit
 * @prop {undefined} bindEvents
 *
 *
 * https://photoswipe.com/events/#opening-or-closing-transition-events
 *
 * @prop {undefined} openingAnimationStart
 * @prop {undefined} openingAnimationEnd
 * @prop {undefined} closingAnimationStart
 * @prop {undefined} closingAnimationEnd
 *
 *
 * https://photoswipe.com/events/#closing-events
 *
 * @prop {undefined} close
 * @prop {undefined} destroy
 *
 *
 * https://photoswipe.com/events/#pointer-and-gesture-events
 *
 * @prop {{ originalEvent: PointerEvent }} pointerDown
 * @prop {{ originalEvent: PointerEvent }} pointerMove
 * @prop {{ originalEvent: PointerEvent }} pointerUp
 * @prop {{ bgOpacity: number }} pinchClose can be default prevented
 * @prop {{ panY: number }} verticalDrag can be default prevented
 *
 *
 * https://photoswipe.com/events/#slide-content-events
 *
 * @prop {{ content: Content }} contentInit
 * @prop {{ content: Content; isLazy: boolean }} contentLoad can be default prevented
 * @prop {{ content: Content; isLazy: boolean }} contentLoadImage can be default prevented
 * @prop {{ content: Content; slide: Slide; isError?: boolean }} loadComplete
 * @prop {{ content: Content; slide: Slide }} loadError
 * @prop {{ content: Content; width: number; height: number }} contentResize can be default prevented
 * @prop {{ content: Content; width: number; height: number; slide: Slide }} imageSizeChange
 * @prop {{ content: Content }} contentLazyLoad can be default prevented
 * @prop {{ content: Content }} contentAppend can be default prevented
 * @prop {{ content: Content }} contentActivate can be default prevented
 * @prop {{ content: Content }} contentDeactivate can be default prevented
 * @prop {{ content: Content }} contentRemove can be default prevented
 * @prop {{ content: Content }} contentDestroy can be default prevented
 *
 *
 * undocumented
 *
 * @prop {{ point: Point; originalEvent: PointerEvent }} imageClickAction can be default prevented
 * @prop {{ point: Point; originalEvent: PointerEvent }} bgClickAction can be default prevented
 * @prop {{ point: Point; originalEvent: PointerEvent }} tapAction can be default prevented
 * @prop {{ point: Point; originalEvent: PointerEvent }} doubleTapAction can be default prevented
 *
 * @prop {{ originalEvent: KeyboardEvent }} keydown can be default prevented
 * @prop {{ x: number; dragging: boolean }} moveMainScroll
 * @prop {{ slide: Slide }} firstZoomPan
 * @prop {{ slide: Slide | undefined, data: SlideData, index: number }} gettingData
 * @prop {undefined} beforeResize
 * @prop {undefined} resize
 * @prop {undefined} viewportSize
 * @prop {undefined} updateScrollOffset
 * @prop {{ slide: Slide }} slideInit
 * @prop {{ slide: Slide }} afterSetContent
 * @prop {{ slide: Slide }} slideLoad
 * @prop {{ slide: Slide }} appendHeavy can be default prevented
 * @prop {{ slide: Slide }} appendHeavyContent
 * @prop {{ slide: Slide }} slideActivate
 * @prop {{ slide: Slide }} slideDeactivate
 * @prop {{ slide: Slide }} slideDestroy
 * @prop {{ destZoomLevel: number, centerPoint: Point | undefined, transitionDuration: number | false | undefined }} beforeZoomTo
 * @prop {{ slide: Slide }} zoomPanUpdate
 * @prop {{ slide: Slide }} initialZoomPan
 * @prop {{ slide: Slide }} calcSlideSize
 * @prop {undefined} resolutionChanged
 * @prop {{ originalEvent: WheelEvent }} wheel can be default prevented
 * @prop {{ content: Content }} contentAppendImage can be default prevented
 * @prop {{ index: number; itemData: SlideData }} lazyLoadSlide can be default prevented
 * @prop {undefined} lazyLoad
 * @prop {{ slide: Slide }} calcBounds
 * @prop {{ zoomLevels: ZoomLevel, slideData: SlideData }} zoomLevelsUpdate
 *
 *
 * legacy
 *
 * @prop {undefined} init
 * @prop {undefined} initialZoomIn
 * @prop {undefined} initialZoomOut
 * @prop {undefined} initialZoomInEnd
 * @prop {undefined} initialZoomOutEnd
 * @prop {{ dataSource: DataSource | undefined, numItems: number }} numItems
 * @prop {{ itemData: SlideData; index: number }} itemData
 * @prop {{ index: number, itemData: SlideData, instance: PhotoSwipe }} thumbBounds
 */

/**
 * @typedef {Object} PhotoSwipeFiltersMap https://photoswipe.com/filters/
 *
 * @prop {(numItems: number, dataSource: DataSource | undefined) => number} numItems
 * Modify the total amount of slides. Example on Data sources page.
 * https://photoswipe.com/filters/#numitems
 *
 * @prop {(itemData: SlideData, index: number) => SlideData} itemData
 * Modify slide item data. Example on Data sources page.
 * https://photoswipe.com/filters/#itemdata
 *
 * @prop {(itemData: SlideData, element: HTMLElement, linkEl: HTMLAnchorElement) => SlideData} domItemData
 * Modify item data when it's parsed from DOM element. Example on Data sources page.
 * https://photoswipe.com/filters/#domitemdata
 *
 * @prop {(clickedIndex: number, e: MouseEvent, instance: PhotoSwipeLightbox) => number} clickedIndex
 * Modify clicked gallery item index.
 * https://photoswipe.com/filters/#clickedindex
 *
 * @prop {(placeholderSrc: string | false, content: Content) => string | false} placeholderSrc
 * Modify placeholder image source.
 * https://photoswipe.com/filters/#placeholdersrc
 *
 * @prop {(isContentLoading: boolean, content: Content) => boolean} isContentLoading
 * Modify if the content is currently loading.
 * https://photoswipe.com/filters/#iscontentloading
 *
 * @prop {(isContentZoomable: boolean, content: Content) => boolean} isContentZoomable
 * Modify if the content can be zoomed.
 * https://photoswipe.com/filters/#iscontentzoomable
 *
 * @prop {(useContentPlaceholder: boolean, content: Content) => boolean} useContentPlaceholder
 * Modify if the placeholder should be used for the content.
 * https://photoswipe.com/filters/#usecontentplaceholder
 *
 * @prop {(isKeepingPlaceholder: boolean, content: Content) => boolean} isKeepingPlaceholder
 * Modify if the placeholder should be kept after the content is loaded.
 * https://photoswipe.com/filters/#iskeepingplaceholder
 *
 *
 * @prop {(contentErrorElement: HTMLElement, content: Content) => HTMLElement} contentErrorElement
 * Modify an element when the content has error state (for example, if image cannot be loaded).
 * https://photoswipe.com/filters/#contenterrorelement
 *
 * @prop {(element: HTMLElement, data: UIElementData) => HTMLElement} uiElement
 * Modify a UI element that's being created.
 * https://photoswipe.com/filters/#uielement
 *
 * @prop {(thumbnail: HTMLElement | null | undefined, itemData: SlideData, index: number) => HTMLElement} thumbEl
 * Modify the thumbnail element from which opening zoom animation starts or ends.
 * https://photoswipe.com/filters/#thumbel
 *
 * @prop {(thumbBounds: Bounds | undefined, itemData: SlideData, index: number) => Bounds} thumbBounds
 * Modify the thumbnail bounds from which opening zoom animation starts or ends.
 * https://photoswipe.com/filters/#thumbbounds
 *
 * @prop {(srcsetSizesWidth: number, content: Content) => number} srcsetSizesWidth
 *
 * @prop {(preventPointerEvent: boolean, event: PointerEvent, pointerType: string) => boolean} preventPointerEvent
 *
 */

/**
 * @template {keyof PhotoSwipeFiltersMap} T
 * @typedef {{ fn: PhotoSwipeFiltersMap[T], priority: number }} Filter
 */

/**
 * @template {keyof PhotoSwipeEventsMap} T
 * @typedef {PhotoSwipeEventsMap[T] extends undefined ? PhotoSwipeEvent<T> : PhotoSwipeEvent<T> & PhotoSwipeEventsMap[T]} AugmentedEvent
 */

/**
 * @template {keyof PhotoSwipeEventsMap} T
 * @typedef {(event: AugmentedEvent<T>) => void} EventCallback
 */

/**
 * Base PhotoSwipe event object
 *
 * @template {keyof PhotoSwipeEventsMap} T
 */
class PhotoSwipeEvent {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(type, details) {
    this.type = type;
    this.defaultPrevented = false;

    if (details) {
      Object.assign(this, details);
    }
  }

  preventDefault() {
    this.defaultPrevented = true;
  }

}
/**
 * PhotoSwipe base class that can listen and dispatch for events.
 * Shared by PhotoSwipe Core and PhotoSwipe Lightbox, extended by base.js
 */


class Eventable {
  constructor() {
    /**
     * @type {{ [T in keyof PhotoSwipeEventsMap]?: ((event: AugmentedEvent<T>) => void)[] }}
     */
    this._listeners = {};
    /**
     * @type {{ [T in keyof PhotoSwipeFiltersMap]?: Filter<T>[] }}
     */

    this._filters = {};
    /** @type {PhotoSwipe | undefined} */

    this.pswp = undefined;
    /** @type {PhotoSwipeOptions | undefined} */

    this.options = undefined;
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   * @param {number} priority
   */


  addFilter(name, fn, priority = 100) {
    var _this$_filters$name, _this$_filters$name2, _this$pswp;

    if (!this._filters[name]) {
      this._filters[name] = [];
    }

    (_this$_filters$name = this._filters[name]) === null || _this$_filters$name === void 0 || _this$_filters$name.push({
      fn,
      priority
    });
    (_this$_filters$name2 = this._filters[name]) === null || _this$_filters$name2 === void 0 || _this$_filters$name2.sort((f1, f2) => f1.priority - f2.priority);
    (_this$pswp = this.pswp) === null || _this$pswp === void 0 || _this$pswp.addFilter(name, fn, priority);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */


  removeFilter(name, fn) {
    if (this._filters[name]) {
      // @ts-expect-error
      this._filters[name] = this._filters[name].filter(filter => filter.fn !== fn);
    }

    if (this.pswp) {
      this.pswp.removeFilter(name, fn);
    }
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */


  applyFilters(name, ...args) {
    var _this$_filters$name3;

    (_this$_filters$name3 = this._filters[name]) === null || _this$_filters$name3 === void 0 || _this$_filters$name3.forEach(filter => {
      // @ts-expect-error
      args[0] = filter.fn.apply(this, args);
    });
    return args[0];
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */


  on(name, fn) {
    var _this$_listeners$name, _this$pswp2;

    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }

    (_this$_listeners$name = this._listeners[name]) === null || _this$_listeners$name === void 0 || _this$_listeners$name.push(fn); // When binding events to lightbox,
    // also bind events to PhotoSwipe Core,
    // if it's open.

    (_this$pswp2 = this.pswp) === null || _this$pswp2 === void 0 || _this$pswp2.on(name, fn);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */


  off(name, fn) {
    var _this$pswp3;

    if (this._listeners[name]) {
      // @ts-expect-error
      this._listeners[name] = this._listeners[name].filter(listener => fn !== listener);
    }

    (_this$pswp3 = this.pswp) === null || _this$pswp3 === void 0 || _this$pswp3.off(name, fn);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */


  dispatch(name, details) {
    var _this$_listeners$name2;

    if (this.pswp) {
      return this.pswp.dispatch(name, details);
    }

    const event =
    /** @type {AugmentedEvent<T>} */
    new PhotoSwipeEvent(name, details);
    (_this$_listeners$name2 = this._listeners[name]) === null || _this$_listeners$name2 === void 0 || _this$_listeners$name2.forEach(listener => {
      listener.call(this, event);
    });
    return event;
  }

}

class Placeholder {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(imageSrc, container) {
    // Create placeholder
    // (stretched thumbnail or simple div behind the main image)

    /** @type {HTMLImageElement | HTMLDivElement | null} */
    this.element = createElement('pswp__img pswp__img--placeholder', imageSrc ? 'img' : 'div', container);

    if (imageSrc) {
      const imgEl =
      /** @type {HTMLImageElement} */
      this.element;
      imgEl.decoding = 'async';
      imgEl.alt = '';
      imgEl.src = imageSrc;
      imgEl.setAttribute('role', 'presentation');
    }

    this.element.setAttribute('aria-hidden', 'true');
  }
  /**
   * @param {number} width
   * @param {number} height
   */


  setDisplayedSize(width, height) {
    if (!this.element) {
      return;
    }

    if (this.element.tagName === 'IMG') {
      // Use transform scale() to modify img placeholder size
      // (instead of changing width/height directly).
      // This helps with performance, specifically in iOS15 Safari.
      setWidthHeight(this.element, 250, 'auto');
      this.element.style.transformOrigin = '0 0';
      this.element.style.transform = toTransformString(0, 0, width / 250);
    } else {
      setWidthHeight(this.element, width, height);
    }
  }

  destroy() {
    var _this$element;

    if ((_this$element = this.element) !== null && _this$element !== void 0 && _this$element.parentNode) {
      this.element.remove();
    }

    this.element = null;
  }

}

/** @typedef {import('./slide.js').default} Slide */

/** @typedef {import('./slide.js').SlideData} SlideData */

/** @typedef {import('../core/base.js').default} PhotoSwipeBase */

/** @typedef {import('../util/util.js').LoadState} LoadState */

class Content {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(itemData, instance, index) {
    this.instance = instance;
    this.data = itemData;
    this.index = index;
    /** @type {HTMLImageElement | HTMLDivElement | undefined} */

    this.element = undefined;
    /** @type {Placeholder | undefined} */

    this.placeholder = undefined;
    /** @type {Slide | undefined} */

    this.slide = undefined;
    this.displayedImageWidth = 0;
    this.displayedImageHeight = 0;
    this.width = Number(this.data.w) || Number(this.data.width) || 0;
    this.height = Number(this.data.h) || Number(this.data.height) || 0;
    this.isAttached = false;
    this.hasSlide = false;
    this.isDecoding = false;
    /** @type {LoadState} */

    this.state = LOAD_STATE.IDLE;

    if (this.data.type) {
      this.type = this.data.type;
    } else if (this.data.src) {
      this.type = 'image';
    } else {
      this.type = 'html';
    }

    this.instance.dispatch('contentInit', {
      content: this
    });
  }

  removePlaceholder() {
    if (this.placeholder && !this.keepPlaceholder()) {
      // With delay, as image might be loaded, but not rendered
      setTimeout(() => {
        if (this.placeholder) {
          this.placeholder.destroy();
          this.placeholder = undefined;
        }
      }, 1000);
    }
  }
  /**
   * Preload content
   *
   * @param {boolean} isLazy
   * @param {boolean} [reload]
   */


  load(isLazy, reload) {
    if (this.slide && this.usePlaceholder()) {
      if (!this.placeholder) {
        const placeholderSrc = this.instance.applyFilters('placeholderSrc', // use  image-based placeholder only for the first slide,
        // as rendering (even small stretched thumbnail) is an expensive operation
        this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : false, this);
        this.placeholder = new Placeholder(placeholderSrc, this.slide.container);
      } else {
        const placeholderEl = this.placeholder.element; // Add placeholder to DOM if it was already created

        if (placeholderEl && !placeholderEl.parentElement) {
          this.slide.container.prepend(placeholderEl);
        }
      }
    }

    if (this.element && !reload) {
      return;
    }

    if (this.instance.dispatch('contentLoad', {
      content: this,
      isLazy
    }).defaultPrevented) {
      return;
    }

    if (this.isImageContent()) {
      this.element = createElement('pswp__img', 'img'); // Start loading only after width is defined, as sizes might depend on it.
      // Due to Safari feature, we must define sizes before srcset.

      if (this.displayedImageWidth) {
        this.loadImage(isLazy);
      }
    } else {
      this.element = createElement('pswp__content', 'div');
      this.element.innerHTML = this.data.html || '';
    }

    if (reload && this.slide) {
      this.slide.updateContentSize(true);
    }
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */


  loadImage(isLazy) {
    var _this$data$src, _this$data$alt;

    if (!this.isImageContent() || !this.element || this.instance.dispatch('contentLoadImage', {
      content: this,
      isLazy
    }).defaultPrevented) {
      return;
    }

    const imageElement =
    /** @type HTMLImageElement */
    this.element;
    this.updateSrcsetSizes();

    if (this.data.srcset) {
      imageElement.srcset = this.data.srcset;
    }

    imageElement.src = (_this$data$src = this.data.src) !== null && _this$data$src !== void 0 ? _this$data$src : '';
    imageElement.alt = (_this$data$alt = this.data.alt) !== null && _this$data$alt !== void 0 ? _this$data$alt : '';
    this.state = LOAD_STATE.LOADING;

    if (imageElement.complete) {
      this.onLoaded();
    } else {
      imageElement.onload = () => {
        this.onLoaded();
      };

      imageElement.onerror = () => {
        this.onError();
      };
    }
  }
  /**
   * Assign slide to content
   *
   * @param {Slide} slide
   */


  setSlide(slide) {
    this.slide = slide;
    this.hasSlide = true;
    this.instance = slide.pswp; // todo: do we need to unset slide?
  }
  /**
   * Content load success handler
   */


  onLoaded() {
    this.state = LOAD_STATE.LOADED;

    if (this.slide && this.element) {
      this.instance.dispatch('loadComplete', {
        slide: this.slide,
        content: this
      }); // if content is reloaded

      if (this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode) {
        this.append();
        this.slide.updateContentSize(true);
      }

      if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
        this.removePlaceholder();
      }
    }
  }
  /**
   * Content load error handler
   */


  onError() {
    this.state = LOAD_STATE.ERROR;

    if (this.slide) {
      this.displayError();
      this.instance.dispatch('loadComplete', {
        slide: this.slide,
        isError: true,
        content: this
      });
      this.instance.dispatch('loadError', {
        slide: this.slide,
        content: this
      });
    }
  }
  /**
   * @returns {Boolean} If the content is currently loading
   */


  isLoading() {
    return this.instance.applyFilters('isContentLoading', this.state === LOAD_STATE.LOADING, this);
  }
  /**
   * @returns {Boolean} If the content is in error state
   */


  isError() {
    return this.state === LOAD_STATE.ERROR;
  }
  /**
   * @returns {boolean} If the content is image
   */


  isImageContent() {
    return this.type === 'image';
  }
  /**
   * Update content size
   *
   * @param {Number} width
   * @param {Number} height
   */


  setDisplayedSize(width, height) {
    if (!this.element) {
      return;
    }

    if (this.placeholder) {
      this.placeholder.setDisplayedSize(width, height);
    }

    if (this.instance.dispatch('contentResize', {
      content: this,
      width,
      height
    }).defaultPrevented) {
      return;
    }

    setWidthHeight(this.element, width, height);

    if (this.isImageContent() && !this.isError()) {
      const isInitialSizeUpdate = !this.displayedImageWidth && width;
      this.displayedImageWidth = width;
      this.displayedImageHeight = height;

      if (isInitialSizeUpdate) {
        this.loadImage(false);
      } else {
        this.updateSrcsetSizes();
      }

      if (this.slide) {
        this.instance.dispatch('imageSizeChange', {
          slide: this.slide,
          width,
          height,
          content: this
        });
      }
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */


  isZoomable() {
    return this.instance.applyFilters('isContentZoomable', this.isImageContent() && this.state !== LOAD_STATE.ERROR, this);
  }
  /**
   * Update image srcset sizes attribute based on width and height
   */


  updateSrcsetSizes() {
    // Handle srcset sizes attribute.
    //
    // Never lower quality, if it was increased previously.
    // Chrome does this automatically, Firefox and Safari do not,
    // so we store largest used size in dataset.
    if (!this.isImageContent() || !this.element || !this.data.srcset) {
      return;
    }

    const image =
    /** @type HTMLImageElement */
    this.element;
    const sizesWidth = this.instance.applyFilters('srcsetSizesWidth', this.displayedImageWidth, this);

    if (!image.dataset.largestUsedSize || sizesWidth > parseInt(image.dataset.largestUsedSize, 10)) {
      image.sizes = sizesWidth + 'px';
      image.dataset.largestUsedSize = String(sizesWidth);
    }
  }
  /**
   * @returns {boolean} If content should use a placeholder (from msrc by default)
   */


  usePlaceholder() {
    return this.instance.applyFilters('useContentPlaceholder', this.isImageContent(), this);
  }
  /**
   * Preload content with lazy-loading param
   */


  lazyLoad() {
    if (this.instance.dispatch('contentLazyLoad', {
      content: this
    }).defaultPrevented) {
      return;
    }

    this.load(true);
  }
  /**
   * @returns {boolean} If placeholder should be kept after content is loaded
   */


  keepPlaceholder() {
    return this.instance.applyFilters('isKeepingPlaceholder', this.isLoading(), this);
  }
  /**
   * Destroy the content
   */


  destroy() {
    this.hasSlide = false;
    this.slide = undefined;

    if (this.instance.dispatch('contentDestroy', {
      content: this
    }).defaultPrevented) {
      return;
    }

    this.remove();

    if (this.placeholder) {
      this.placeholder.destroy();
      this.placeholder = undefined;
    }

    if (this.isImageContent() && this.element) {
      this.element.onload = null;
      this.element.onerror = null;
      this.element = undefined;
    }
  }
  /**
   * Display error message
   */


  displayError() {
    if (this.slide) {
      var _this$instance$option, _this$instance$option2;

      let errorMsgEl = createElement('pswp__error-msg', 'div');
      errorMsgEl.innerText = (_this$instance$option = (_this$instance$option2 = this.instance.options) === null || _this$instance$option2 === void 0 ? void 0 : _this$instance$option2.errorMsg) !== null && _this$instance$option !== void 0 ? _this$instance$option : '';
      errorMsgEl =
      /** @type {HTMLDivElement} */
      this.instance.applyFilters('contentErrorElement', errorMsgEl, this);
      this.element = createElement('pswp__content pswp__error-msg-container', 'div');
      this.element.appendChild(errorMsgEl);
      this.slide.container.innerText = '';
      this.slide.container.appendChild(this.element);
      this.slide.updateContentSize(true);
      this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */


  append() {
    if (this.isAttached || !this.element) {
      return;
    }

    this.isAttached = true;

    if (this.state === LOAD_STATE.ERROR) {
      this.displayError();
      return;
    }

    if (this.instance.dispatch('contentAppend', {
      content: this
    }).defaultPrevented) {
      return;
    }

    const supportsDecode = ('decode' in this.element);

    if (this.isImageContent()) {
      // Use decode() on nearby slides
      //
      // Nearby slide images are in DOM and not hidden via display:none.
      // However, they are placed offscreen (to the left and right side).
      //
      // Some browsers do not composite the image until it's actually visible,
      // using decode() helps.
      //
      // You might ask "why dont you just decode() and then append all images",
      // that's because I want to show image before it's fully loaded,
      // as browser can render parts of image while it is loading.
      // We do not do this in Safari due to partial loading bug.
      if (supportsDecode && this.slide && (!this.slide.isActive || isSafari())) {
        this.isDecoding = true; // purposefully using finally instead of then,
        // as if srcset sizes changes dynamically - it may cause decode error

        /** @type {HTMLImageElement} */

        this.element.decode().catch(() => {}).finally(() => {
          this.isDecoding = false;
          this.appendImage();
        });
      } else {
        this.appendImage();
      }
    } else if (this.slide && !this.element.parentNode) {
      this.slide.container.appendChild(this.element);
    }
  }
  /**
   * Activate the slide,
   * active slide is generally the current one,
   * meaning the user can see it.
   */


  activate() {
    if (this.instance.dispatch('contentActivate', {
      content: this
    }).defaultPrevented || !this.slide) {
      return;
    }

    if (this.isImageContent() && this.isDecoding && !isSafari()) {
      // add image to slide when it becomes active,
      // even if it's not finished decoding
      this.appendImage();
    } else if (this.isError()) {
      this.load(false, true); // try to reload
    }

    if (this.slide.holderElement) {
      this.slide.holderElement.setAttribute('aria-hidden', 'false');
    }
  }
  /**
   * Deactivate the content
   */


  deactivate() {
    this.instance.dispatch('contentDeactivate', {
      content: this
    });

    if (this.slide && this.slide.holderElement) {
      this.slide.holderElement.setAttribute('aria-hidden', 'true');
    }
  }
  /**
   * Remove the content from DOM
   */


  remove() {
    this.isAttached = false;

    if (this.instance.dispatch('contentRemove', {
      content: this
    }).defaultPrevented) {
      return;
    }

    if (this.element && this.element.parentNode) {
      this.element.remove();
    }

    if (this.placeholder && this.placeholder.element) {
      this.placeholder.element.remove();
    }
  }
  /**
   * Append the image content to slide container
   */


  appendImage() {
    if (!this.isAttached) {
      return;
    }

    if (this.instance.dispatch('contentAppendImage', {
      content: this
    }).defaultPrevented) {
      return;
    } // ensure that element exists and is not already appended


    if (this.slide && this.element && !this.element.parentNode) {
      this.slide.container.appendChild(this.element);
    }

    if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
      this.removePlaceholder();
    }
  }

}

/** @typedef {import('../photoswipe.js').PhotoSwipeOptions} PhotoSwipeOptions */

/** @typedef {import('../core/base.js').default} PhotoSwipeBase */

/** @typedef {import('../photoswipe.js').Point} Point */

/** @typedef {import('../slide/slide.js').SlideData} SlideData */

/**
 * @param {PhotoSwipeOptions} options
 * @param {PhotoSwipeBase} pswp
 * @returns {Point}
 */
function getViewportSize(options, pswp) {
  if (options.getViewportSizeFn) {
    const newViewportSize = options.getViewportSizeFn(options, pswp);

    if (newViewportSize) {
      return newViewportSize;
    }
  }

  return {
    x: document.documentElement.clientWidth,
    // TODO: height on mobile is very incosistent due to toolbar
    // find a way to improve this
    //
    // document.documentElement.clientHeight - doesn't seem to work well
    y: window.innerHeight
  };
}
/**
 * Parses padding option.
 * Supported formats:
 *
 * // Object
 * padding: {
 *  top: 0,
 *  bottom: 0,
 *  left: 0,
 *  right: 0
 * }
 *
 * // A function that returns the object
 * paddingFn: (viewportSize, itemData, index) => {
 *  return {
 *    top: 0,
 *    bottom: 0,
 *    left: 0,
 *    right: 0
 *  };
 * }
 *
 * // Legacy variant
 * paddingLeft: 0,
 * paddingRight: 0,
 * paddingTop: 0,
 * paddingBottom: 0,
 *
 * @param {'left' | 'top' | 'bottom' | 'right'} prop
 * @param {PhotoSwipeOptions} options PhotoSwipe options
 * @param {Point} viewportSize PhotoSwipe viewport size, for example: { x:800, y:600 }
 * @param {SlideData} itemData Data about the slide
 * @param {number} index Slide index
 * @returns {number}
 */

function parsePaddingOption(prop, options, viewportSize, itemData, index) {
  let paddingValue = 0;

  if (options.paddingFn) {
    paddingValue = options.paddingFn(viewportSize, itemData, index)[prop];
  } else if (options.padding) {
    paddingValue = options.padding[prop];
  } else {
    const legacyPropName = 'padding' + prop[0].toUpperCase() + prop.slice(1); // @ts-expect-error

    if (options[legacyPropName]) {
      // @ts-expect-error
      paddingValue = options[legacyPropName];
    }
  }

  return Number(paddingValue) || 0;
}
/**
 * @param {PhotoSwipeOptions} options
 * @param {Point} viewportSize
 * @param {SlideData} itemData
 * @param {number} index
 * @returns {Point}
 */

function getPanAreaSize(options, viewportSize, itemData, index) {
  return {
    x: viewportSize.x - parsePaddingOption('left', options, viewportSize, itemData, index) - parsePaddingOption('right', options, viewportSize, itemData, index),
    y: viewportSize.y - parsePaddingOption('top', options, viewportSize, itemData, index) - parsePaddingOption('bottom', options, viewportSize, itemData, index)
  };
}

const MAX_IMAGE_WIDTH = 4000;
/** @typedef {import('../photoswipe.js').default} PhotoSwipe */

/** @typedef {import('../photoswipe.js').PhotoSwipeOptions} PhotoSwipeOptions */

/** @typedef {import('../photoswipe.js').Point} Point */

/** @typedef {import('../slide/slide.js').SlideData} SlideData */

/** @typedef {'fit' | 'fill' | number | ((zoomLevelObject: ZoomLevel) => number)} ZoomLevelOption */

/**
 * Calculates zoom levels for specific slide.
 * Depends on viewport size and image size.
 */

class ZoomLevel {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(options, itemData, index, pswp) {
    this.pswp = pswp;
    this.options = options;
    this.itemData = itemData;
    this.index = index;
    /** @type { Point | null } */

    this.panAreaSize = null;
    /** @type { Point | null } */

    this.elementSize = null;
    this.fit = 1;
    this.fill = 1;
    this.vFill = 1;
    this.initial = 1;
    this.secondary = 1;
    this.max = 1;
    this.min = 1;
  }
  /**
   * Calculate initial, secondary and maximum zoom level for the specified slide.
   *
   * It should be called when either image or viewport size changes.
   *
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @param {Point} panAreaSize
   */


  update(maxWidth, maxHeight, panAreaSize) {
    /** @type {Point} */
    const elementSize = {
      x: maxWidth,
      y: maxHeight
    };
    this.elementSize = elementSize;
    this.panAreaSize = panAreaSize;
    const hRatio = panAreaSize.x / elementSize.x;
    const vRatio = panAreaSize.y / elementSize.y;
    this.fit = Math.min(1, hRatio < vRatio ? hRatio : vRatio);
    this.fill = Math.min(1, hRatio > vRatio ? hRatio : vRatio); // zoom.vFill defines zoom level of the image
    // when it has 100% of viewport vertical space (height)

    this.vFill = Math.min(1, vRatio);
    this.initial = this._getInitial();
    this.secondary = this._getSecondary();
    this.max = Math.max(this.initial, this.secondary, this._getMax());
    this.min = Math.min(this.fit, this.initial, this.secondary);

    if (this.pswp) {
      this.pswp.dispatch('zoomLevelsUpdate', {
        zoomLevels: this,
        slideData: this.itemData
      });
    }
  }
  /**
   * Parses user-defined zoom option.
   *
   * @private
   * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)
   * @returns { number | undefined }
   */


  _parseZoomLevelOption(optionPrefix) {
    const optionName =
    /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
    optionPrefix + 'ZoomLevel';
    const optionValue = this.options[optionName];

    if (!optionValue) {
      return;
    }

    if (typeof optionValue === 'function') {
      return optionValue(this);
    }

    if (optionValue === 'fill') {
      return this.fill;
    }

    if (optionValue === 'fit') {
      return this.fit;
    }

    return Number(optionValue);
  }
  /**
   * Get zoom level to which image will be zoomed after double-tap gesture,
   * or when user clicks on zoom icon,
   * or mouse-click on image itself.
   * If you return 1 image will be zoomed to its original size.
   *
   * @private
   * @return {number}
   */


  _getSecondary() {
    let currZoomLevel = this._parseZoomLevelOption('secondary');

    if (currZoomLevel) {
      return currZoomLevel;
    } // 3x of "fit" state, but not larger than original


    currZoomLevel = Math.min(1, this.fit * 3);

    if (this.elementSize && currZoomLevel * this.elementSize.x > MAX_IMAGE_WIDTH) {
      currZoomLevel = MAX_IMAGE_WIDTH / this.elementSize.x;
    }

    return currZoomLevel;
  }
  /**
   * Get initial image zoom level.
   *
   * @private
   * @return {number}
   */


  _getInitial() {
    return this._parseZoomLevelOption('initial') || this.fit;
  }
  /**
   * Maximum zoom level when user zooms
   * via zoom/pinch gesture,
   * via cmd/ctrl-wheel or via trackpad.
   *
   * @private
   * @return {number}
   */


  _getMax() {
    // max zoom level is x4 from "fit state",
    // used for zoom gesture and ctrl/trackpad zoom
    return this._parseZoomLevelOption('max') || Math.max(1, this.fit * 4);
  }

}

/**
 * Lazy-load an image
 * This function is used both by Lightbox and PhotoSwipe core,
 * thus it can be called before dialog is opened.
 *
 * @param {SlideData} itemData Data about the slide
 * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
 * @param {number} index
 * @returns {Content} Image that is being decoded or false.
 */

function lazyLoadData(itemData, instance, index) {
  const content = instance.createContentFromData(itemData, index);
  /** @type {ZoomLevel | undefined} */

  let zoomLevel;
  const {
    options
  } = instance; // We need to know dimensions of the image to preload it,
  // as it might use srcset, and we need to define sizes

  if (options) {
    zoomLevel = new ZoomLevel(options, itemData, -1);
    let viewportSize;

    if (instance.pswp) {
      viewportSize = instance.pswp.viewportSize;
    } else {
      viewportSize = getViewportSize(options, instance);
    }

    const panAreaSize = getPanAreaSize(options, viewportSize, itemData, index);
    zoomLevel.update(content.width, content.height, panAreaSize);
  }

  content.lazyLoad();

  if (zoomLevel) {
    content.setDisplayedSize(Math.ceil(content.width * zoomLevel.initial), Math.ceil(content.height * zoomLevel.initial));
  }

  return content;
}
/**
 * Lazy-loads specific slide.
 * This function is used both by Lightbox and PhotoSwipe core,
 * thus it can be called before dialog is opened.
 *
 * By default, it loads image based on viewport size and initial zoom level.
 *
 * @param {number} index Slide index
 * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox eventable instance
 * @returns {Content | undefined}
 */

function lazyLoadSlide(index, instance) {
  const itemData = instance.getItemData(index);

  if (instance.dispatch('lazyLoadSlide', {
    index,
    itemData
  }).defaultPrevented) {
    return;
  }

  return lazyLoadData(itemData, instance, index);
}

/** @typedef {import("../photoswipe.js").default} PhotoSwipe */

/** @typedef {import("../slide/slide.js").SlideData} SlideData */

/**
 * PhotoSwipe base class that can retrieve data about every slide.
 * Shared by PhotoSwipe Core and PhotoSwipe Lightbox
 */

class PhotoSwipeBase extends Eventable {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var _this$options;

    let numItems = 0;
    const dataSource = (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.dataSource;

    if (dataSource && 'length' in dataSource) {
      // may be an array or just object with length property
      numItems = dataSource.length;
    } else if (dataSource && 'gallery' in dataSource) {
      // query DOM elements
      if (!dataSource.items) {
        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
      }

      if (dataSource.items) {
        numItems = dataSource.items.length;
      }
    } // legacy event, before filters were introduced


    const event = this.dispatch('numItems', {
      dataSource,
      numItems
    });
    return this.applyFilters('numItems', event.numItems, dataSource);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */


  createContentFromData(slideData, index) {
    return new Content(slideData, this, index);
  }
  /**
   * Get item data by index.
   *
   * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
   * For example, it may contain properties like
   * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
   *
   * @param {number} index
   * @returns {SlideData}
   */


  getItemData(index) {
    var _this$options2;

    const dataSource = (_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.dataSource;
    /** @type {SlideData | HTMLElement} */

    let dataSourceItem = {};

    if (Array.isArray(dataSource)) {
      // Datasource is an array of elements
      dataSourceItem = dataSource[index];
    } else if (dataSource && 'gallery' in dataSource) {
      // dataSource has gallery property,
      // thus it was created by Lightbox, based on
      // gallery and children options
      // query DOM elements
      if (!dataSource.items) {
        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
      }

      dataSourceItem = dataSource.items[index];
    }

    let itemData = dataSourceItem;

    if (itemData instanceof Element) {
      itemData = this._domElementToItemData(itemData);
    } // Dispatching the itemData event,
    // it's a legacy verion before filters were introduced


    const event = this.dispatch('itemData', {
      itemData: itemData || {},
      index
    });
    return this.applyFilters('itemData', event.itemData, index);
  }
  /**
   * Get array of gallery DOM elements,
   * based on childSelector and gallery element.
   *
   * @param {HTMLElement} galleryElement
   * @returns {HTMLElement[]}
   */


  _getGalleryDOMElements(galleryElement) {
    var _this$options3, _this$options4;

    if ((_this$options3 = this.options) !== null && _this$options3 !== void 0 && _this$options3.children || (_this$options4 = this.options) !== null && _this$options4 !== void 0 && _this$options4.childSelector) {
      return getElementsFromOption(this.options.children, this.options.childSelector, galleryElement) || [];
    }

    return [galleryElement];
  }
  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   * @returns {SlideData}
   */


  _domElementToItemData(element) {
    /** @type {SlideData} */
    const itemData = {
      element
    };
    const linkEl =
    /** @type {HTMLAnchorElement} */
    element.tagName === 'A' ? element : element.querySelector('a');

    if (linkEl) {
      // src comes from data-pswp-src attribute,
      // if it's empty link href is used
      itemData.src = linkEl.dataset.pswpSrc || linkEl.href;

      if (linkEl.dataset.pswpSrcset) {
        itemData.srcset = linkEl.dataset.pswpSrcset;
      }

      itemData.width = linkEl.dataset.pswpWidth ? parseInt(linkEl.dataset.pswpWidth, 10) : 0;
      itemData.height = linkEl.dataset.pswpHeight ? parseInt(linkEl.dataset.pswpHeight, 10) : 0; // support legacy w & h properties

      itemData.w = itemData.width;
      itemData.h = itemData.height;

      if (linkEl.dataset.pswpType) {
        itemData.type = linkEl.dataset.pswpType;
      }

      const thumbnailEl = element.querySelector('img');

      if (thumbnailEl) {
        var _thumbnailEl$getAttri;

        // msrc is URL to placeholder image that's displayed before large image is loaded
        // by default it's displayed only for the first slide
        itemData.msrc = thumbnailEl.currentSrc || thumbnailEl.src;
        itemData.alt = (_thumbnailEl$getAttri = thumbnailEl.getAttribute('alt')) !== null && _thumbnailEl$getAttri !== void 0 ? _thumbnailEl$getAttri : '';
      }

      if (linkEl.dataset.pswpCropped || linkEl.dataset.cropped) {
        itemData.thumbCropped = true;
      }
    }

    return this.applyFilters('domItemData', itemData, element, linkEl);
  }
  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns {Content} Image that is being decoded or false.
   */


  lazyLoadData(itemData, index) {
    return lazyLoadData(itemData, this, index);
  }

}

/**
 * @template T
 * @typedef {import('../types.js').Type<T>} Type<T>
 */

/** @typedef {import('../photoswipe.js').default} PhotoSwipe */

/** @typedef {import('../photoswipe.js').PhotoSwipeOptions} PhotoSwipeOptions */

/** @typedef {import('../photoswipe.js').DataSource} DataSource */

/** @typedef {import('../photoswipe.js').Point} Point */

/** @typedef {import('../slide/content.js').default} Content */

/** @typedef {import('../core/eventable.js').PhotoSwipeEventsMap} PhotoSwipeEventsMap */

/** @typedef {import('../core/eventable.js').PhotoSwipeFiltersMap} PhotoSwipeFiltersMap */

/**
 * @template {keyof PhotoSwipeEventsMap} T
 * @typedef {import('../core/eventable.js').EventCallback<T>} EventCallback<T>
 */

/**
 * PhotoSwipe Lightbox
 *
 * - If user has unsupported browser it falls back to default browser action (just opens URL)
 * - Binds click event to links that should open PhotoSwipe
 * - parses DOM strcture for PhotoSwipe (retrieves large image URLs and sizes)
 * - Initializes PhotoSwipe
 *
 *
 * Loader options use the same object as PhotoSwipe, and supports such options:
 *
 * gallery - Element | Element[] | NodeList | string selector for the gallery element
 * children - Element | Element[] | NodeList | string selector for the gallery children
 *
 */

class PhotoSwipeLightbox extends PhotoSwipeBase {
  /**
   * @param {PhotoSwipeOptions} [options]
   */
  constructor(options) {
    super();
    /** @type {PhotoSwipeOptions} */

    this.options = options || {};
    this._uid = 0;
    this.shouldOpen = false;
    /**
     * @private
     * @type {Content | undefined}
     */

    this._preloadedContent = undefined;
    this.onThumbnailsClick = this.onThumbnailsClick.bind(this);
  }
  /**
   * Initialize lightbox, should be called only once.
   * It's not included in the main constructor, so you may bind events before it.
   */


  init() {
    // Bind click events to each gallery
    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach(galleryElement => {
      galleryElement.addEventListener('click', this.onThumbnailsClick, false);
    });
  }
  /**
   * @param {MouseEvent} e
   */


  onThumbnailsClick(e) {
    // Exit and allow default browser action if:
    if (specialKeyUsed(e) // ... if clicked with a special key (ctrl/cmd...)
    || window.pswp) {
      // ... if PhotoSwipe is already open
      return;
    } // If both clientX and clientY are 0 or not defined,
    // the event is likely triggered by keyboard,
    // so we do not pass the initialPoint
    //
    // Note that some screen readers emulate the mouse position,
    // so it's not the ideal way to detect them.
    //

    /** @type {Point | null} */


    let initialPoint = {
      x: e.clientX,
      y: e.clientY
    };

    if (!initialPoint.x && !initialPoint.y) {
      initialPoint = null;
    }

    let clickedIndex = this.getClickedIndex(e);
    clickedIndex = this.applyFilters('clickedIndex', clickedIndex, e, this);
    /** @type {DataSource} */

    const dataSource = {
      gallery:
      /** @type {HTMLElement} */
      e.currentTarget
    };

    if (clickedIndex >= 0) {
      e.preventDefault();
      this.loadAndOpen(clickedIndex, dataSource, initialPoint);
    }
  }
  /**
   * Get index of gallery item that was clicked.
   *
   * @param {MouseEvent} e click event
   * @returns {number}
   */


  getClickedIndex(e) {
    // legacy option
    if (this.options.getClickedIndexFn) {
      return this.options.getClickedIndexFn.call(this, e);
    }

    const clickedTarget =
    /** @type {HTMLElement} */
    e.target;
    const childElements = getElementsFromOption(this.options.children, this.options.childSelector,
    /** @type {HTMLElement} */
    e.currentTarget);
    const clickedChildIndex = childElements.findIndex(child => child === clickedTarget || child.contains(clickedTarget));

    if (clickedChildIndex !== -1) {
      return clickedChildIndex;
    } else if (this.options.children || this.options.childSelector) {
      // click wasn't on a child element
      return -1;
    } // There is only one item (which is the gallery)


    return 0;
  }
  /**
   * Load and open PhotoSwipe
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   * @param {Point | null} [initialPoint]
   * @returns {boolean}
   */


  loadAndOpen(index, dataSource, initialPoint) {
    // Check if the gallery is already open
    if (window.pswp || !this.options) {
      return false;
    } // Use the first gallery element if dataSource is not provided


    if (!dataSource && this.options.gallery && this.options.children) {
      const galleryElements = getElementsFromOption(this.options.gallery);

      if (galleryElements[0]) {
        dataSource = {
          gallery: galleryElements[0]
        };
      }
    } // set initial index


    this.options.index = index; // define options for PhotoSwipe constructor

    this.options.initialPointerPos = initialPoint;
    this.shouldOpen = true;
    this.preload(index, dataSource);
    return true;
  }
  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */


  preload(index, dataSource) {
    const {
      options
    } = this;

    if (dataSource) {
      options.dataSource = dataSource;
    } // Add the main module

    /** @type {Promise<Type<PhotoSwipe>>[]} */


    const promiseArray = [];
    const pswpModuleType = typeof options.pswpModule;

    if (isPswpClass(options.pswpModule)) {
      promiseArray.push(Promise.resolve(
      /** @type {Type<PhotoSwipe>} */
      options.pswpModule));
    } else if (pswpModuleType === 'string') {
      throw new Error('pswpModule as string is no longer supported');
    } else if (pswpModuleType === 'function') {
      promiseArray.push(
      /** @type {() => Promise<Type<PhotoSwipe>>} */
      options.pswpModule());
    } else {
      throw new Error('pswpModule is not valid');
    } // Add custom-defined promise, if any


    if (typeof options.openPromise === 'function') {
      // allow developers to perform some task before opening
      promiseArray.push(options.openPromise());
    }

    if (options.preloadFirstSlide !== false && index >= 0) {
      this._preloadedContent = lazyLoadSlide(index, this);
    } // Wait till all promises resolve and open PhotoSwipe


    const uid = ++this._uid;
    Promise.all(promiseArray).then(iterableModules => {
      if (this.shouldOpen) {
        const mainModule = iterableModules[0];

        this._openPhotoswipe(mainModule, uid);
      }
    });
  }
  /**
   * @private
   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
   * @param {number} uid
   */


  _openPhotoswipe(module, uid) {
    // Cancel opening if UID doesn't match the current one
    // (if user clicked on another gallery item before current was loaded).
    //
    // Or if shouldOpen flag is set to false
    // (developer may modify it via public API)
    if (uid !== this._uid && this.shouldOpen) {
      return;
    }

    this.shouldOpen = false; // PhotoSwipe is already open

    if (window.pswp) {
      return;
    }
    /**
     * Pass data to PhotoSwipe and open init
     *
     * @type {PhotoSwipe}
     */


    const pswp = typeof module === 'object' ? new module.default(this.options) // eslint-disable-line
    : new module(this.options); // eslint-disable-line

    this.pswp = pswp;
    window.pswp = pswp; // map listeners from Lightbox to PhotoSwipe Core

    /** @type {(keyof PhotoSwipeEventsMap)[]} */

    Object.keys(this._listeners).forEach(name => {
      var _this$_listeners$name;

      (_this$_listeners$name = this._listeners[name]) === null || _this$_listeners$name === void 0 || _this$_listeners$name.forEach(fn => {
        pswp.on(name,
        /** @type {EventCallback<typeof name>} */
        fn);
      });
    }); // same with filters

    /** @type {(keyof PhotoSwipeFiltersMap)[]} */

    Object.keys(this._filters).forEach(name => {
      var _this$_filters$name;

      (_this$_filters$name = this._filters[name]) === null || _this$_filters$name === void 0 || _this$_filters$name.forEach(filter => {
        pswp.addFilter(name, filter.fn, filter.priority);
      });
    });

    if (this._preloadedContent) {
      pswp.contentLoader.addToCache(this._preloadedContent);
      this._preloadedContent = undefined;
    }

    pswp.on('destroy', () => {
      // clean up public variables
      this.pswp = undefined;
      delete window.pswp;
    });
    pswp.init();
  }
  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */


  destroy() {
    var _this$pswp;

    (_this$pswp = this.pswp) === null || _this$pswp === void 0 || _this$pswp.destroy();
    this.shouldOpen = false;
    this._listeners = {};
    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach(galleryElement => {
      galleryElement.removeEventListener('click', this.onThumbnailsClick, false);
    });
  }

}


//# sourceMappingURL=photoswipe-lightbox.esm.js.map


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "horisonttigroup:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"js/main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkhorisonttigroup"] = globalThis["webpackChunkhorisonttigroup"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_animate_in_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/animate-in-view */ "./js/components/animate-in-view.js");
/* harmony import */ var _components_component_heights__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/component-heights */ "./js/components/component-heights.js");
/* harmony import */ var _components_photoswipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/photoswipe */ "./js/components/photoswipe.js");
/* harmony import */ var _components_site_nav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/site-nav */ "./js/components/site-nav.js");
/* global */




(0,_components_animate_in_view__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_components_component_heights__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_components_photoswipe__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_components_site_nav__WEBPACK_IMPORTED_MODULE_3__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map