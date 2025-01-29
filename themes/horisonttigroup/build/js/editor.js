/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/block-filters/index.js":
/*!***********************************!*\
  !*** ./js/block-filters/index.js ***!
  \***********************************/
/***/ (() => {

wp.hooks.addFilter('blocks.registerBlockType', 'meom/alignwide', (settings, name) => {
  if (name === 'core/paragraph') {
    return {
      ...settings,
      supports: {
        ...settings.supports,
        align: ['wide']
      }
    };
  }
  return settings;
});

/***/ }),

/***/ "./js/block-variations/index.js":
/*!**************************************!*\
  !*** ./js/block-variations/index.js ***!
  \**************************************/
/***/ (() => {

wp.domReady(() => {
  // Register block variations.
  wp.blocks.registerBlockVariation('core/image', {
    name: 'meom/icon-with-borders',
    title: 'Ikoni reunaviivoilla',
    description: 'Ikoni on hyvä olla 1:1, esim. 24px x 24px.',
    attributes: {
      className: 'meom-icon-with-borders'
    }
  });
  wp.blocks.registerBlockVariation('core/image', {
    name: 'meom/icon-with-background',
    title: 'Ikoni taustavärillä',
    description: 'Ikoni on hyvä olla 1:1, esim. 800px x 800px.',
    attributes: {
      className: 'meom-icon-with-background'
    }
  });
});

/***/ }),

/***/ "./js/style-variations/index.js":
/*!**************************************!*\
  !*** ./js/style-variations/index.js ***!
  \**************************************/
/***/ (() => {

wp.domReady(() => {
  // Unregister button style
  wp.blocks.unregisterBlockStyle('core/button', 'squared');
  wp.blocks.unregisterBlockStyle('core/button', 'fill');

  // Unregister quote styles.
  wp.blocks.unregisterBlockStyle('core/quote', 'plain');

  // Unregister table styles.
  wp.blocks.unregisterBlockStyle('core/table', 'stripes');

  // Register button styles.
  wp.blocks.registerBlockStyle('core/button', {
    name: 'button-gradient',
    label: 'Gradientti'
  });

  // Register list styles.
  wp.blocks.registerBlockStyle('core/list', {
    name: 'list-reset',
    label: 'Resetoi lista'
  });

  // Register list styles.
  wp.blocks.registerBlockStyle('core/list', {
    name: 'list-checkmark',
    label: 'Checkmark-lista'
  });
  wp.blocks.registerBlockStyle('core/list', {
    name: 'list-checkmark-center',
    label: 'Checkmark-lista teksti keskellä'
  });

  // Register columns styles.
  wp.blocks.registerBlockStyle('core/column', {
    name: 'column-sticky',
    label: 'Kiinnittyy yläreunaan'
  });

  // Register group styles.
  wp.blocks.registerBlockStyle('core/group', {
    name: 'group-borders',
    label: 'Reunaviivat'
  });
});

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/editor.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_filters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block-filters */ "./js/block-filters/index.js");
/* harmony import */ var _block_filters__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_block_filters__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_variations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block-variations */ "./js/block-variations/index.js");
/* harmony import */ var _block_variations__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_block_variations__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_variations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style-variations */ "./js/style-variations/index.js");
/* harmony import */ var _style_variations__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_variations__WEBPACK_IMPORTED_MODULE_2__);



// import './components/fault-message-meta';
})();

/******/ })()
;
//# sourceMappingURL=editor.js.map