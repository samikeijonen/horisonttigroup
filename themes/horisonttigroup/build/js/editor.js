(()=>{var e={258:()=>{wp.hooks.addFilter("blocks.registerBlockType","meom/alignwide",((e,o)=>"core/paragraph"===o?{...e,supports:{...e.supports,align:["wide"]}}:e))},893:()=>{wp.domReady((()=>{wp.blocks.registerBlockVariation("core/image",{name:"meom/icon-with-borders",title:"Ikoni reunaviivoilla",description:"Ikoni on hyvä olla 1:1, esim. 24px x 24px.",attributes:{className:"meom-icon-with-borders"}}),wp.blocks.registerBlockVariation("core/image",{name:"meom/icon-with-background",title:"Ikoni taustavärillä",description:"Ikoni on hyvä olla 1:1, esim. 800px x 800px.",attributes:{className:"meom-icon-with-background"}})}))},221:()=>{wp.domReady((()=>{wp.blocks.unregisterBlockStyle("core/button","squared"),wp.blocks.unregisterBlockStyle("core/button","fill"),wp.blocks.unregisterBlockStyle("core/quote","plain"),wp.blocks.unregisterBlockStyle("core/table","stripes"),wp.blocks.registerBlockStyle("core/list",{name:"list-reset",label:"Resetoi lista"}),wp.blocks.registerBlockStyle("core/list",{name:"list-checkmark",label:"Checkmark-lista"}),wp.blocks.registerBlockStyle("core/list",{name:"list-checkmark-center",label:"Checkmark-lista teksti keskellä"}),wp.blocks.registerBlockStyle("core/column",{name:"column-sticky",label:"Kiinnittyy yläreunaan"}),wp.blocks.registerBlockStyle("core/group",{name:"group-borders",label:"Reunaviivat"})}))}},o={};function r(t){var l=o[t];if(void 0!==l)return l.exports;var i=o[t]={exports:{}};return e[t](i,i.exports,r),i.exports}r.n=e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return r.d(o,{a:o}),o},r.d=(e,o)=>{for(var t in o)r.o(o,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},r.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),(()=>{"use strict";r(258),r(893),r(221)})()})();