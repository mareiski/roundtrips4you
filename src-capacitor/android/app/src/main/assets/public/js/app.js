/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		var prefetchChunks = data[3] || [];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		deferredPrefetch.push.apply(deferredPrefetch, prefetchChunks);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		if(deferredModules.length === 0) {
/******/ 			// chunk prefetching for javascript
/******/ 			deferredPrefetch.forEach(function(chunkId) {
/******/ 				if(installedChunks[chunkId] === undefined) {
/******/ 					installedChunks[chunkId] = null;
/******/ 					var link = document.createElement('link');
/******/
/******/ 					if (__webpack_require__.nc) {
/******/ 						link.setAttribute("nonce", __webpack_require__.nc);
/******/ 					}
/******/ 					link.rel = "prefetch";
/******/ 					link.as = "script";
/******/ 					link.href = jsonpScriptSrc(chunkId);
/******/ 					document.head.appendChild(link);
/******/ 				}
/******/ 			});
/******/ 			deferredPrefetch.length = 0;
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		6: 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		6: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [], deferredPrefetch = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"1":"chunk-common","7":"blog","8":"faq","9":"legal","10":"publicUser","11":"roundtrips"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"1":1,"2":1,"3":1,"4":1,"12":1,"13":1,"14":1,"15":1,"16":1,"17":1,"18":1,"19":1,"20":1,"21":1,"22":1,"23":1,"24":1,"25":1,"26":1,"39":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "css/" + ({"1":"chunk-common","7":"blog","8":"faq","9":"legal","10":"publicUser","11":"roundtrips"}[chunkId]||chunkId) + "." + {"1":"58147255","2":"ed397c14","3":"be4909b6","4":"7855ee88","5":"31d6cfe0","7":"31d6cfe0","8":"31d6cfe0","9":"31d6cfe0","10":"31d6cfe0","11":"31d6cfe0","12":"7d71d445","13":"7a10fd6a","14":"d059ff7c","15":"bedee216","16":"8cbd9a39","17":"1eb9a616","18":"7e73ab78","19":"d8f4ed89","20":"587b7407","21":"9700f243","22":"4fda0c5c","23":"b7f4c729","24":"5ed9b291","25":"0eb6c4f2","26":"b85e6242","27":"31d6cfe0","28":"31d6cfe0","29":"31d6cfe0","30":"31d6cfe0","31":"31d6cfe0","32":"31d6cfe0","33":"31d6cfe0","34":"31d6cfe0","35":"31d6cfe0","36":"31d6cfe0","37":"31d6cfe0","38":"31d6cfe0","39":"50111c75"}[chunkId] + ".css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("2f39");


/***/ }),

/***/ "1261":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return auth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return db; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return storage; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2b0e");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("8aa5");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuefire__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("0ff2");



vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].config.productionTip = false;
vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].use(vuefire__WEBPACK_IMPORTED_MODULE_2__[/* firestorePlugin */ "a"]);
const config = {
  apiKey: 'AIzaSyBVkBCl3dY49g3lyX8ns1SYsErNdkCO8sc',
  authDomain: 'roundtrips4you.firebaseapp.com',
  databaseURL: 'https://roundtrips4you.firebaseio.com',
  projectId: 'roundtrips4you',
  storageBucket: 'gs://roundtrips4you.appspot.com',
  messagingSenderId: '295257024914',
  appId: '1:295257024914:web:11432138a1faf186'
};
let db = null;
let storage = null;
const auth = {
  context: null,
  uiConfig: null,
  ui: null,

  init(context, store, router) {
    this.context = context;
    firebase__WEBPACK_IMPORTED_MODULE_1___default.a.initializeApp(config);
    this.uiConfig = {
      signInSuccessUrl: '/#/meine-rundreisen',
      signInOptions: [firebase__WEBPACK_IMPORTED_MODULE_1___default.a.auth.GoogleAuthProvider.PROVIDER_ID, firebase__WEBPACK_IMPORTED_MODULE_1___default.a.auth.EmailAuthProvider.PROVIDER_ID]
    };
    db = firebase__WEBPACK_IMPORTED_MODULE_1___default.a.firestore();
    storage = firebase__WEBPACK_IMPORTED_MODULE_1___default.a.storage();
    firebase__WEBPACK_IMPORTED_MODULE_1___default.a.auth().onAuthStateChanged(user => {
      store.dispatch('user/setCurrentUser');

      if (this.context.$route) {
        let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth);
        let guestOnly = this.context.$route.matched.some(record => record.meta.guestOnly);
        if (requireAuth && !user) router.push('/login');else if (guestOnly && user) router.push('/meine-rundreisen');
      }
    });
  },

  user() {
    return this.context ? firebase__WEBPACK_IMPORTED_MODULE_1___default.a.auth().currentUser : null;
  },

  logout(router, store) {
    firebase__WEBPACK_IMPORTED_MODULE_1___default.a.auth().signOut().then(r => {
      store.dispatch('roundtrips/resetAllRoundtrips');
      router.push('/');
    });
  },

  authRef() {
    return firebase__WEBPACK_IMPORTED_MODULE_1___default.a.auth();
  }

};


/***/ }),

/***/ "2f39":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@quasar/extras/roboto-font/roboto-font.css
var roboto_font = __webpack_require__("7d6e");

// EXTERNAL MODULE: ./node_modules/@quasar/extras/material-icons/material-icons.css
var material_icons = __webpack_require__("e54f");

// EXTERNAL MODULE: ./node_modules/quasar/dist/quasar.styl
var quasar = __webpack_require__("62f2");

// EXTERNAL MODULE: ./src/css/app.styl
var css_app = __webpack_require__("7e6d");

// EXTERNAL MODULE: ./src/css/site.less
var site = __webpack_require__("9c65");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/quasar/lang/de.js
var de = __webpack_require__("215a");

// EXTERNAL MODULE: ./node_modules/quasar/src/vue-plugin.js + 7 modules
var vue_plugin = __webpack_require__("b05d");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/layout/QLayout.js
var QLayout = __webpack_require__("4d5a");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/page/QPageContainer.js
var QPageContainer = __webpack_require__("09e3");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/page/QPage.js
var QPage = __webpack_require__("9989");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/btn/QBtn.js
var QBtn = __webpack_require__("9c40");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/icon/QIcon.js
var QIcon = __webpack_require__("0016");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/item/QList.js
var QList = __webpack_require__("1c1c");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/item/QItem.js
var QItem = __webpack_require__("66e5");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/item/QItemSection.js
var QItemSection = __webpack_require__("4074");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/item/QItemLabel.js
var QItemLabel = __webpack_require__("0170");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/date/QDate.js
var QDate = __webpack_require__("52ee");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/input/QInput.js + 1 modules
var QInput = __webpack_require__("27f9");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/popup-proxy/QPopupProxy.js
var QPopupProxy = __webpack_require__("7cbe");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/range/QRange.js + 1 modules
var QRange = __webpack_require__("7bbf");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/expansion-item/QExpansionItem.js
var QExpansionItem = __webpack_require__("3b73");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/select/QSelect.js + 2 modules
var QSelect = __webpack_require__("ddd8");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/rating/QRating.js
var QRating = __webpack_require__("daf4");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/checkbox/QCheckbox.js
var QCheckbox = __webpack_require__("8f8e");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/tooltip/QTooltip.js
var QTooltip = __webpack_require__("05c0");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/avatar/QAvatar.js
var QAvatar = __webpack_require__("cb32");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/menu/QMenu.js + 1 modules
var QMenu = __webpack_require__("4e73");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/inner-loading/QInnerLoading.js
var QInnerLoading = __webpack_require__("74f7");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/spinner/QSpinner.js + 1 modules
var QSpinner = __webpack_require__("0d59");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/timeline/QTimeline.js
var QTimeline = __webpack_require__("05eb");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/timeline/QTimelineEntry.js
var QTimelineEntry = __webpack_require__("74af");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/editor/QEditor.js + 4 modules
var QEditor = __webpack_require__("d66b");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/popup-edit/QPopupEdit.js + 1 modules
var QPopupEdit = __webpack_require__("42a1");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/dialog/QDialog.js
var QDialog = __webpack_require__("24e8");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/form/QForm.js
var QForm = __webpack_require__("0378");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/toggle/QToggle.js
var QToggle = __webpack_require__("9564");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/card/QCard.js
var QCard = __webpack_require__("f09f");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/card/QCardSection.js
var QCardSection = __webpack_require__("a370");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/card/QCardActions.js
var QCardActions = __webpack_require__("4b7e");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/uploader/QUploader.js + 3 modules
var QUploader = __webpack_require__("ee89");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/carousel/QCarousel.js
var QCarousel = __webpack_require__("880c");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/carousel/QCarouselControl.js
var QCarouselControl = __webpack_require__("32a7");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/carousel/QCarouselSlide.js
var QCarouselSlide = __webpack_require__("62cd");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/img/QImg.js + 1 modules
var QImg = __webpack_require__("068f");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/time/QTime.js
var QTime = __webpack_require__("ca78");

// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/Loading.js
var Loading = __webpack_require__("f508");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/chip/QChip.js
var QChip = __webpack_require__("b047");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/tabs/QTabs.js
var QTabs = __webpack_require__("429b");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/tabs/QTab.js
var QTab = __webpack_require__("7460");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/tabs/QRouteTab.js + 1 modules
var QRouteTab = __webpack_require__("7867");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/tab-panels/QTabPanels.js
var QTabPanels = __webpack_require__("adad");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/tab-panels/QTabPanel.js
var QTabPanel = __webpack_require__("823b");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/separator/QSeparator.js
var QSeparator = __webpack_require__("eb85");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/chat/QChatMessage.js
var QChatMessage = __webpack_require__("8169");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/pagination/QPagination.js
var QPagination = __webpack_require__("3b16");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/badge/QBadge.js
var QBadge = __webpack_require__("58a8");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/stepper/QStepper.js
var QStepper = __webpack_require__("f531");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/stepper/QStep.js
var QStep = __webpack_require__("87fe");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/stepper/QStepperNavigation.js
var QStepperNavigation = __webpack_require__("b19c");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/skeleton/QSkeleton.js
var QSkeleton = __webpack_require__("293e");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/drawer/QDrawer.js
var QDrawer = __webpack_require__("9404");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/toolbar/QToolbar.js
var QToolbar = __webpack_require__("65c6");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/toolbar/QToolbarTitle.js
var QToolbarTitle = __webpack_require__("6ac5");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/scroll-area/QScrollArea.js
var QScrollArea = __webpack_require__("4983");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/intersection/QIntersection.js + 1 modules
var QIntersection = __webpack_require__("ad56");

// EXTERNAL MODULE: ./node_modules/quasar/src/directives/Ripple.js
var Ripple = __webpack_require__("714f");

// EXTERNAL MODULE: ./node_modules/quasar/src/directives/ClosePopup.js
var ClosePopup = __webpack_require__("7f67");

// EXTERNAL MODULE: ./node_modules/quasar/src/directives/TouchPan.js
var TouchPan = __webpack_require__("75c3");

// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/Notify.js
var Notify = __webpack_require__("2a19");

// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/AddressbarColor.js
var AddressbarColor = __webpack_require__("696d");

// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/Cookies.js
var Cookies = __webpack_require__("515f");

// EXTERNAL MODULE: ./node_modules/quasar/src/plugins/Meta.js
var Meta = __webpack_require__("9c64");

// CONCATENATED MODULE: ./.quasar/import-quasar.js
/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/




































































vue_runtime_esm["a" /* default */].use(vue_plugin["a" /* default */], {
  config: {},
  lang: de["a" /* default */],
  components: {
    QLayout: QLayout["a" /* default */],
    QPageContainer: QPageContainer["a" /* default */],
    QPage: QPage["a" /* default */],
    QBtn: QBtn["a" /* default */],
    QIcon: QIcon["a" /* default */],
    QList: QList["a" /* default */],
    QItem: QItem["a" /* default */],
    QItemSection: QItemSection["a" /* default */],
    QItemLabel: QItemLabel["a" /* default */],
    QDate: QDate["a" /* default */],
    QInput: QInput["a" /* default */],
    QPopupProxy: QPopupProxy["a" /* default */],
    QRange: QRange["a" /* default */],
    QExpansionItem: QExpansionItem["a" /* default */],
    QSelect: QSelect["a" /* default */],
    QRating: QRating["a" /* default */],
    QCheckbox: QCheckbox["a" /* default */],
    QTooltip: QTooltip["a" /* default */],
    QAvatar: QAvatar["a" /* default */],
    QMenu: QMenu["a" /* default */],
    QInnerLoading: QInnerLoading["a" /* default */],
    QSpinner: QSpinner["a" /* default */],
    QTimeline: QTimeline["a" /* default */],
    QTimelineEntry: QTimelineEntry["a" /* default */],
    QEditor: QEditor["a" /* default */],
    QPopupEdit: QPopupEdit["a" /* default */],
    QDialog: QDialog["a" /* default */],
    QForm: QForm["a" /* default */],
    QToggle: QToggle["a" /* default */],
    QCard: QCard["a" /* default */],
    QCardSection: QCardSection["a" /* default */],
    QCardActions: QCardActions["a" /* default */],
    QUploader: QUploader["a" /* default */],
    QCarousel: QCarousel["a" /* default */],
    QCarouselControl: QCarouselControl["a" /* default */],
    QCarouselSlide: QCarouselSlide["a" /* default */],
    QImg: QImg["a" /* default */],
    QTime: QTime["a" /* default */],
    Loading: Loading["a" /* default */],
    QChip: QChip["a" /* default */],
    QTabs: QTabs["a" /* default */],
    QTab: QTab["a" /* default */],
    QRouteTab: QRouteTab["a" /* default */],
    QTabPanels: QTabPanels["a" /* default */],
    QTabPanel: QTabPanel["a" /* default */],
    QSeparator: QSeparator["a" /* default */],
    QChatMessage: QChatMessage["a" /* default */],
    QPagination: QPagination["a" /* default */],
    QBadge: QBadge["a" /* default */],
    QStepper: QStepper["a" /* default */],
    QStep: QStep["a" /* default */],
    QStepperNavigation: QStepperNavigation["a" /* default */],
    QSkeleton: QSkeleton["a" /* default */],
    QDrawer: QDrawer["a" /* default */],
    QToolbar: QToolbar["a" /* default */],
    QToolbarTitle: QToolbarTitle["a" /* default */],
    QScrollArea: QScrollArea["a" /* default */],
    QIntersection: QIntersection["a" /* default */]
  },
  directives: {
    Ripple: Ripple["a" /* default */],
    ClosePopup: ClosePopup["a" /* default */],
    TouchPan: TouchPan["a" /* default */]
  },
  plugins: {
    Notify: Notify["a" /* default */],
    AddressbarColor: AddressbarColor["a" /* default */],
    Cookies: Cookies["a" /* default */],
    Meta: Meta["a" /* default */]
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=1c093227&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"q-app"}},[_c('router-view')],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=1c093227&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js&
//
//
//
//
//
//
// eslint-disable-next-line no-useless-escape
const supportedBrowsers = /((CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(12[_\.]2|12[_\.]([3-9]|\d{2,})|12[_\.]4|12[_\.]([5-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})[_\.]\d+|13[_\.]0|13[_\.]([1-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})[_\.]\d+)(?:[_\.]\d+)?)|(Opera Mini(?:\/att)?\/?(\d+)?(?:\.\d+)?(?:\.\d+)?)|(Opera\/.+Opera Mobi.+Version\/(46\.0|46\.([1-9]|\d{2,})|(4[7-9]|[5-9]\d|\d{3,})\.\d+))|(Opera\/(46\.0|46\.([1-9]|\d{2,})|(4[7-9]|[5-9]\d|\d{3,})\.\d+).+Opera Mobi)|(Opera Mobi.+Opera(?:\/|\s+)(46\.0|46\.([1-9]|\d{2,})|(4[7-9]|[5-9]\d|\d{3,})\.\d+))|(SamsungBrowser\/(9\.2|9\.([3-9]|\d{2,})|([1-9]\d|\d{3,})\.\d+|10\.1|10\.([2-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})\.\d+))|(Edge\/(18(?:\.0)?|18(?:\.([1-9]|\d{2,}))?|(19|[2-9]\d|\d{3,})(?:\.\d+)?|79(?:\.0)?|79(?:\.([1-9]|\d{2,}))?|([8-9]\d|\d{3,})(?:\.\d+)?))|((Chromium|Chrome)\/(49\.0|49\.([1-9]|\d{2,})|([5-9]\d|\d{3,})\.\d+|78\.0|78\.([1-9]|\d{2,})|(79|[8-9]\d|\d{3,})\.\d+)(?:\.\d+)?([\d.]+$|.*Safari\/(?![\d.]+ Edge\/[\d.]+$)))|(Version\/(12\.1|12\.([2-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})\.\d+|13\.0|13\.([1-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})\.\d+)(?:\.\d+)? Safari\/)|(Trident\/7\.0)|(Firefox\/(68\.0|68\.([1-9]|\d{2,})|(69|[7-9]\d|\d{3,})\.\d+|71\.0|71\.([1-9]|\d{2,})|(7[2-9]|[8-9]\d|\d{3,})\.\d+)\.\d+)|(Firefox\/(68\.0|68\.([1-9]|\d{2,})|(69|[7-9]\d|\d{3,})\.\d+|71\.0|71\.([1-9]|\d{2,})|(7[2-9]|[8-9]\d|\d{3,})\.\d+)(pre|[ab]\d+[a-z]*)?)|(([MS]?IE) (11\.0|11\.([1-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+))/;

if (!supportedBrowsers.test(navigator.userAgent)) {
  alert('Dein browser wird leider nicht nicht unterstützt.');
}

/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  name: 'App'
});
// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/App.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_Appvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (component.exports);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./src/store/user/state.js
/* harmony default export */ var user_state = ({
  user: null
});
// EXTERNAL MODULE: ./src/firebaseInit.js
var firebaseInit = __webpack_require__("1261");

// CONCATENATED MODULE: ./src/store/user/index.js


/* harmony default export */ var user = ({
  namespaced: true,
  state: user_state,
  getters: {
    user: state => state.user,
    isLogged: state => state.user !== null
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    }
  },
  actions: {
    setCurrentUser: ({
      commit
    }) => {
      commit('setUser', firebaseInit["a" /* auth */].user());
    }
  }
});
// CONCATENATED MODULE: ./src/store/roundtrips/index.js

/* harmony default export */ var roundtrips = ({
  namespaced: true,
  state: {
    roundtrips: null,
    titleImages: null
  },
  getters: {
    getAllRoundtrips: state => state.roundtrips,
    getTitleImages: state => state.titleImages,
    getSingleRoundtrip: state => roundtripId => {
      return state.roundtrips[state.roundtrips.findIndex(x => x.RTId === roundtripId)];
    }
  },
  mutations: {
    setRoundtrips: (state, roundtrips) => {
      state.roundtrips = roundtrips;
    },
    setTitleImages: (state, images) => {
      state.titleImages = images;
    },
    addRoundtrip: (state, newRoundtripObject) => {
      if (state.roundtrips === null) state.roundtrips = [];
      state.roundtrips.push(newRoundtripObject);
    },
    removeRoundtrip: (state, roundtripDocId) => {
      if (state.roundtrips) {
        let index = state.roundtrips.findIndex(x => x.docId === roundtripDocId);
        state.roundtrips.splice(index, 1);
        state.titleImages.splice(index, 1);
      }
    }
  },
  actions: {
    fetchSingleRoundtrip({
      commit,
      getters
    }, RTId) {
      return new Promise((resolve, reject) => {
        if (getters.getAllRoundtrips && getters.getAllRoundtrips.findIndex(x => x.RTId === RTId) !== -1) {
          resolve(getters.getAllRoundtrips[getters.getAllRoundtrips.findIndex(x => x.RTId === RTId)]);
        } else {
          let roundtripsRef = firebaseInit["b" /* db */].collection('Roundtrips').where('RTId', '==', RTId).limit(1);
          roundtripsRef.get().then(snapshot => {
            snapshot.forEach(doc => {
              if (snapshot.empty) resolve(null);
              let roundtrip = doc.data();
              roundtrip.docId = doc.id;
              if (firebaseInit["a" /* auth */].user() && roundtrip.UserId === firebaseInit["a" /* auth */].user().uid) commit('addRoundtrip', roundtrip);
              resolve(roundtrip);
            });
          }).catch(function (error) {
            console.log('Error ' + error);
            resolve(null);
          });
        }
      });
    },

    fetchAllRoundtrips({
      commit,
      getters
    }, userUid) {
      return new Promise(resolve => {
        if (getters.getAllRoundtrips && getters.getTitleImages) resolve({
          roundtrips: getters.getAllRoundtrips,
          titleImages: getters.getTitleImages
        });
        let roundtripArr = [];
        let roundtripDocIds = [];
        let titleImages = [];
        let roundtripsRef = firebaseInit["b" /* db */].collection('Roundtrips').where('UserId', '==', userUid).orderBy('createdAt').limit(20);
        roundtripsRef.get().then(snapshot => {
          let index = 0;
          if (snapshot.size === 0) resolve(null);
          snapshot.forEach(doc => {
            roundtripArr.push(doc.data());
            let i = roundtripArr.findIndex(x => x.RTId === doc.data().RTId); // add doc id to roundtrip array

            roundtripArr[i].docId = doc.id;
            roundtripDocIds.splice(i, 0, doc.id);
            var fileRef = firebaseInit["c" /* storage */].ref().child('Images/Roundtrips/' + doc.id + '/Title/titleImg');
            fileRef.getDownloadURL().then(function (url) {
              titleImages.splice(roundtripDocIds.indexOf(doc.id), 0, {
                src: url,
                RTId: doc.data().RTId
              });

              if (index >= snapshot.size - 1) {
                commit('setTitleImages', titleImages);
                resolve({
                  roundtrips: getters.getAllRoundtrips,
                  titleImages: getters.getTitleImages
                });
              }
            }).catch(function () {
              titleImages.splice(roundtripDocIds.indexOf(doc.id), 0, {
                src: '../statics/dummy-image-landscape-1-150x150.jpg',
                docId: doc.data().RTId
              });

              if (index >= snapshot.size - 1) {
                commit('setTitleImages', titleImages);
                resolve({
                  roundtrips: getters.getAllRoundtrips,
                  titleImages: getters.getTitleImages
                });
              }
            });
            if (index === snapshot.size - 1) commit('setRoundtrips', roundtripArr);
            index++;
          });
        }).catch(function (error) {
          console.log(error);
          resolve(null);
        });
      });
    },

    addRoundtrip({
      commit
    }, payload) {
      return new Promise(resolve => {
        try {
          let timeStamp = Date.now();
          let tempRTId = Math.floor(Math.random() * 10000000000000);
          let newRoundtripObject = {
            Category: 'Gruppenreise',
            Days: payload.days || '< 5 Tage',
            Description: 'Kurze Beschreibung deiner Rundreise',
            Hotels: '0',
            // set as default country (will be overitten)
            Location: ['Deutschland'],
            Region: null,
            Price: 100,
            Public: false,
            RTId: tempRTId,
            Stars: 3,
            Profile: 'Auto',
            Highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3'],
            Title: payload.title,
            OfferEndPeriod: new Date(timeStamp),
            OfferStartPeriod: new Date(timeStamp),
            OfferWholeYear: true,
            UserId: payload.uid,
            createdAt: new Date(timeStamp),
            Rooms: payload.rooms,
            Adults: payload.adults,
            ChildrenAges: payload.childrenAges
          };

          if (payload.transportProfile) {
            newRoundtripObject.DepatureDate = payload.depatureDate;
            newRoundtripObject.TransportProfile = payload.transportProfile;
            newRoundtripObject.Origin = payload.origin;
            newRoundtripObject.OriginCode = payload.originCode;
            newRoundtripObject.Destination = payload.destination;
            newRoundtripObject.DestinationCode = payload.destinationCode;
            newRoundtripObject.ReturnDate = payload.returnDate;
            newRoundtripObject.TravelClass = payload.travelClass;
            newRoundtripObject.NonStop = payload.nonStop;
          }

          firebaseInit["b" /* db */].collection('Roundtrips').add(newRoundtripObject).then(() => {
            commit('addRoundtrip', newRoundtripObject);
            let roundtripsRef = firebaseInit["b" /* db */].collection('Roundtrips').where('RTId', '==', tempRTId).limit(1);
            roundtripsRef.get().then(snapshot => {
              snapshot.forEach(doc => {
                firebaseInit["b" /* db */].collection('Roundtrips').doc(doc.id).update({
                  'RTId': doc.id
                }).then(() => {
                  let depatureDate = null;

                  if (payload.depatureDate) {
                    const dateParts = payload.depatureDate.split('.');
                    depatureDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                  }

                  if (payload.stops) {
                    let promiseList = [];
                    payload.stops.forEach(stop => {
                      try {
                        stop.RTId = doc.id;
                        promiseList.push(firebaseInit["b" /* db */].collection('RoundtripDetails').add(stop));
                      } catch (e) {
                        console.log(e);
                      }
                    });
                    Promise.all(promiseList).then(() => {
                      resolve(doc.id);
                    });
                  } else {
                    firebaseInit["b" /* db */].collection('RoundtripDetails').add({
                      BookingComLink: '',
                      DateDistance: '',
                      Description: 'Beschreibung dieses Stopps',
                      ExpediaLink: '',
                      GeneralLink: '',
                      ImageUrl: '',
                      InitDate: depatureDate || new Date(timeStamp),
                      Price: 0,
                      RTId: doc.id,
                      Title: payload.tempLocation ? 'Start in ' + payload.tempLocation.label.split(',')[0] : 'Titel des 1. Stopps',
                      Location: payload.tempLocation ? payload.tempLocation : {
                        lng: '13.3888599',
                        lat: '52.5170365',
                        label: 'Berlin, 10117, Germany'
                      }
                    }).then(() => {
                      resolve(doc.id);
                    });
                  }
                });
              });
            });
          });
        } catch (e) {
          console.log(e);
          resolve(null);
        }
      });
    },

    deleteRoundtrip({
      commit
    }, roundtripDocId) {
      return new Promise(resolve => {
        let roundtripsRef = firebaseInit["b" /* db */].collection('RoundtripDetails').where('RTId', '==', roundtripDocId);
        roundtripsRef.get().then(snapshot => {
          snapshot.forEach(doc => {
            firebaseInit["b" /* db */].collection('RoundtripDetails').doc(doc.id).delete();
          });
        });
        firebaseInit["b" /* db */].collection('Roundtrips').doc(roundtripDocId).delete().then(function () {
          commit('removeRoundtrip', roundtripDocId);
          resolve(true);
        }).catch(function (error) {
          console.log(error);
          resolve(false);
        });
      });
    },

    resetAllRoundtrips({
      commit
    }) {
      commit('setRoundtrips', null);
      commit('setTitleImages', null);
    }

  }
});
// EXTERNAL MODULE: ./node_modules/firebase/dist/index.cjs.js
var index_cjs = __webpack_require__("8aa5");
var index_cjs_default = /*#__PURE__*/__webpack_require__.n(index_cjs);

// CONCATENATED MODULE: ./src/store/demoSession/index.js


/* harmony default export */ var demoSession = ({
  namespaced: true,
  state: {
    isInDemoSession: false,
    roundtrip: null,
    stops: null,
    // todo remove
    tourShowed: false
  },
  getters: {
    getRoundtrip: state => state.roundtrip,
    getStops: state => state.stops,
    isInDemoSession: state => state.isInDemoSession,
    getRoundtripId: state => state.roundtrip ? state.roundtrip.RTId : null,
    tourShowed: state => state.tourShowed
  },
  mutations: {
    setRoundtrip: (state, roundtrip) => {
      state.roundtrip = roundtrip;
    },
    setStops: (state, stops) => {
      console.log(stops);
      state.stops = stops;
    },
    addStop: (state, stop) => {
      if (state.stops === null) state.stops = [];
      state.stops.push(stop);
    },
    removeStop: (state, docId) => {
      if (state.stops.findIndex(x => x.DocId === docId) === -1) return false;
      state.stops.splice(state.stops.findIndex(x => x.DocId === docId), 1);
    },
    setTourShowed: (state, showed) => {
      state.tourShowed = showed;
    },
    resetRoundtrip: state => {
      state.roundtrip = null;
      state.stops = null;
      state.isInDemoSession = false;
    },
    setAsDemoSession: state => {
      state.isInDemoSession = true;
    }
  },
  actions: {
    addRoundtrip({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        let tempRTId = Math.floor(Math.random() * 10000000000000);
        let timeStamp = Date.now();
        let firebaseTimeStamp = index_cjs_default.a.firestore.Timestamp.fromDate(new Date(timeStamp));
        payload.roundtripObject.Location = payload.tempLocation;
        payload.roundtripObject.OriginCode = payload.originCode;
        payload.roundtripObject.DestinationCode = payload.destinationCode;
        payload.roundtripObject.Category = 'Gruppenreise';
        payload.roundtripObject.Description = 'Kurze Beschreibung deiner Rundreise';
        payload.roundtripObject.Hotels = '0';
        payload.roundtripObject.Region = null;
        payload.roundtripObject.Price = 100;
        payload.roundtripObject.Public = false;
        payload.roundtripObject.RTId = tempRTId;
        payload.roundtripObject.Stars = 3;
        payload.roundtripObject.Profile = 'Auto';
        payload.roundtripObject.Highlights = ['Highlight 1', 'Highlight 2', 'Highlight 3'];
        payload.roundtripObject.OfferEndPeriod = firebaseTimeStamp;
        payload.roundtripObject.OfferStartPeriod = firebaseTimeStamp;
        payload.roundtripObject.OfferWholeYear = true;
        payload.roundtripObject.createdAt = firebaseTimeStamp;
        payload.roundtripObject.docId = tempRTId;
        commit('setRoundtrip', payload.roundtripObject);
        commit('setStops', payload.stops);
        resolve(tempRTId);
      });
    },

    addNewStop({
      commit,
      state
    }, newRoundtripObject) {
      newRoundtripObject.RTId = state.roundtrip.RTId;
      commit('addStop', newRoundtripObject);
    },

    saveRoundtrip({
      state,
      commit
    }, userId) {
      return new Promise((resolve, reject) => {
        try {
          state.roundtrip.UserId = userId;
          firebaseInit["b" /* db */].collection('Roundtrips').add(state.roundtrip).then(() => {
            let roundtripsRef = firebaseInit["b" /* db */].collection('Roundtrips').where('RTId', '==', state.roundtrip.RTId).limit(1);
            roundtripsRef.get().then(snapshot => {
              snapshot.forEach(doc => {
                firebaseInit["b" /* db */].collection('Roundtrips').doc(doc.id).update({
                  'RTId': doc.id
                });
                let promiseList = [];
                state.stops.forEach((stop, index) => {
                  stop.RTId = doc.id;
                  promiseList.push(firebaseInit["b" /* db */].collection('RoundtripDetails').add(stop));
                  Promise.all(promiseList).then(() => {
                    if (index === state.stops.length - 1) {
                      commit('resetRoundtrip');
                      resolve(doc.id);
                    }
                  });
                });
              });
            });
          });
        } catch (e) {
          console.log(e);
          commit('resetRoundtrip');
          resolve(null);
        }
      });
    }

  }
});
// CONCATENATED MODULE: ./src/store/index.js

 // import extern modules




vue_runtime_esm["a" /* default */].use(vuex_esm["a" /* default */]);
/* harmony default export */ var src_store = (function ()
/* { ssrContext } */
{
  // locally declared modules
  // const sharedMethods = {
  //   actions: {
  //     capitalize (s) {
  //       s = s.toLowerCase()
  //       s = s.charAt(0).toUpperCase() + s.slice(1)
  //       return s
  //     }
  //   }
  // }
  const Store = new vuex_esm["a" /* default */].Store({
    // modules to reference
    modules: {
      user: user,
      roundtrips: roundtrips,
      demoSession: demoSession
    } // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV

  });
  /*
  if we want some HMR magic for it, we handle
  the hot update like below. Notice we guard this
  code with "process.env.DEV" -- so this doesn't
  get into our production build (and it shouldn't).
  */

  if (false) {}

  return Store;
});
// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__("8c4f");

// CONCATENATED MODULE: ./src/router/routes.js
const routes = [{
  path: '/',
  component: () => __webpack_require__.e(/* import() */ 27).then(__webpack_require__.bind(null, "f241")),
  children: [{
    path: '/',
    component: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(32)]).then(__webpack_require__.bind(null, "8b24"))
  }, {
    path: 'rundreisen-uebersicht',
    component: () => Promise.all(/* import() | roundtrips */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, "b601"))
  }, {
    path: 'rundreisen/:country',
    component: () => Promise.all(/* import() | roundtrips */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, "2f91"))
  }, {
    path: 'rundreise-ansehen/:id',
    component: () => Promise.all(/* import() | roundtrips */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, "9a37"))
  }, {
    path: 'login',
    component: () => __webpack_require__.e(/* import() */ 33).then(__webpack_require__.bind(null, "013f")),
    meta: {
      guestOnly: true
    }
  }, // {
  //   path: 'email-bestaetigen',
  //   component: () => import('pages/Verify.vue'),
  //   meta: {
  //     requireAuth: true
  //   }
  // },
  {
    path: 'registrieren',
    component: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(36)]).then(__webpack_require__.bind(null, "56b4")),
    props: true,
    name: 'Register',
    meta: {
      guestOnly: true
    }
  }, {
    path: 'profil',
    component: () => __webpack_require__.e(/* import() */ 37).then(__webpack_require__.bind(null, "d843")),
    meta: {
      requireAuth: true
    }
  }, {
    path: 'meine-rundreisen',
    component: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(35)]).then(__webpack_require__.bind(null, "8550")),
    meta: {
      requireAuth: true
    }
  }, {
    path: 'ueber',
    component: () => __webpack_require__.e(/* import() */ 38).then(__webpack_require__.bind(null, "5010"))
  }, {
    path: 'blog',
    component: () => __webpack_require__.e(/* import() | blog */ 7).then(__webpack_require__.bind(null, "4837"))
  }, {
    path: 'blog/:name',
    component: () => __webpack_require__.e(/* import() | blog */ 7).then(__webpack_require__.bind(null, "f2d6"))
  }, {
    path: 'impressum',
    component: () => __webpack_require__.e(/* import() | legal */ 9).then(__webpack_require__.bind(null, "acc6"))
  }, {
    path: 'datenschutz',
    component: () => __webpack_require__.e(/* import() | legal */ 9).then(__webpack_require__.bind(null, "51b9"))
  }, {
    path: 'haftungsausschluss',
    component: () => __webpack_require__.e(/* import() | legal */ 9).then(__webpack_require__.bind(null, "9b1c"))
  }, {
    path: 'rundreisen-einstellungen/:id',
    component: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(16)]).then(__webpack_require__.bind(null, "c21a")),
    meta: {
      requireAuth: true
    }
  }, {
    path: 'rundreisen-wizard/:id?',
    component: () => Promise.all(/* import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(17)]).then(__webpack_require__.bind(null, "7810"))
  }, {
    path: 'benutzerprofil/:id',
    component: () => Promise.all(/* import() | publicUser */[__webpack_require__.e(1), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, "1b01"))
  }, {
    path: 'benutzer',
    component: () => Promise.all(/* import() | publicUser */[__webpack_require__.e(1), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, "9ab9"))
  }, {
    path: 'faq',
    component: () => __webpack_require__.e(/* import() | faq */ 8).then(__webpack_require__.bind(null, "9fc0"))
  }]
}, {
  path: '/',
  component: () => __webpack_require__.e(/* import() */ 12).then(__webpack_require__.bind(null, "2bf3")),
  children: [{
    path: 'MapWidget/:id',
    component: () => __webpack_require__.e(/* import() */ 34).then(__webpack_require__.bind(null, "810b"))
  }]
}]; // Always leave this as last one

if (true) {
  routes.push({
    path: '*',
    component: () => __webpack_require__.e(/* import() */ 13).then(__webpack_require__.bind(null, "e51e"))
  });
}

/* harmony default export */ var router_routes = (routes);
// CONCATENATED MODULE: ./src/router/index.js


 // import { auth } from '../firebaseInit.js'

vue_runtime_esm["a" /* default */].use(vue_router_esm["a" /* default */]);
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

/* harmony default export */ var src_router = (function () {
  const router = new vue_router_esm["a" /* default */]({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes: router_routes,
    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: "hash",
    base: ""
  });
  return router;
});
// EXTERNAL MODULE: ./node_modules/@capacitor/core/dist/esm/index.js + 21 modules
var esm = __webpack_require__("81c3");

// CONCATENATED MODULE: ./.quasar/app.js
/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/






const {
  SplashScreen
} = esm["a" /* Plugins */];
/* harmony default export */ var _quasar_app = (async function () {
  // create store and router instances
  const store = typeof src_store === 'function' ? await src_store({
    Vue: vue_runtime_esm["a" /* default */]
  }) : src_store;
  const router = typeof src_router === 'function' ? await src_router({
    Vue: vue_runtime_esm["a" /* default */],
    store
  }) : src_router; // make router instance available in store

  store.$router = router; // Create the app instantiation Object.
  // Here we inject the router, store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.

  const app = {
    el: '#q-app',
    router,
    store,
    render: h => h(App),

    mounted() {
      SplashScreen.hide();
    }

  }; // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.

  return {
    app,
    store,
    router
  };
});
// EXTERNAL MODULE: ./node_modules/storyblok-vue/storyblok-vue.js
var storyblok_vue = __webpack_require__("9747");
var storyblok_vue_default = /*#__PURE__*/__webpack_require__.n(storyblok_vue);

// EXTERNAL MODULE: ./node_modules/vue-lazyload/vue-lazyload.esm.js
var vue_lazyload_esm = __webpack_require__("caf9");

// EXTERNAL MODULE: ./node_modules/vue-in-viewport-directive/index.js
var vue_in_viewport_directive = __webpack_require__("e6ae");
var vue_in_viewport_directive_default = /*#__PURE__*/__webpack_require__.n(vue_in_viewport_directive);

// EXTERNAL MODULE: ./node_modules/vue-tour/dist/vue-tour.umd.js
var vue_tour_umd = __webpack_require__("2536");
var vue_tour_umd_default = /*#__PURE__*/__webpack_require__.n(vue_tour_umd);

// CONCATENATED MODULE: ./src/boot/initialMain.js


const getLeaflet = () => __webpack_require__.e(/* import() */ 0).then(__webpack_require__.t.bind(null, "e11e", 7));









const getClickOutside = () => __webpack_require__.e(/* import() */ 0).then(__webpack_require__.t.bind(null, "2103", 7)); // import(/* webpackPreload: true */ 'leaflet/dist/leaflet.css')
// "async" is optional


/* harmony default export */ var initialMain = (async ({
  app,
  store,
  router
}) => {
  Loading["a" /* default */].show({
    spinnerColor: 'primary'
  });
  firebaseInit["a" /* auth */].init(app, store, router);
  getLeaflet().then(L => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: __webpack_require__("584d"),
      iconUrl: __webpack_require__("6397"),
      shadowUrl: __webpack_require__("e2b9")
    });
  });
  AddressbarColor["a" /* default */].set('#D56026');
  getClickOutside().then(vClickOutside => vue_runtime_esm["a" /* default */].use(vClickOutside));
  vue_runtime_esm["a" /* default */].use(storyblok_vue_default.a);
  vue_runtime_esm["a" /* default */].use(vue_lazyload_esm["a" /* default */]);
  vue_runtime_esm["a" /* default */].use(vue_tour_umd_default.a);
  vue_runtime_esm["a" /* default */].directive('in-viewport', vue_in_viewport_directive_default.a);
});
// EXTERNAL MODULE: ./node_modules/quasar-app-extension-swipe-to-close/src/boot/index.js + 6 modules
var boot = __webpack_require__("3600");

// CONCATENATED MODULE: ./.quasar/client-prefetch.js
/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

const appOptions = App.options
/* Vue.extend() */
|| App;
let appPrefetch = typeof appOptions.preFetch === 'function';

function getMatchedComponents(to, router) {
  const route = to ? to.matched ? to : router.resolve(to).route : router.currentRoute;

  if (!route) {
    return [];
  }

  return [].concat.apply([], route.matched.map(m => {
    return Object.keys(m.components).map(key => {
      const comp = m.components[key];
      return {
        path: m.path,
        c: comp.options
        /* Vue.extend() */
        || comp
      };
    });
  }));
}

function addPreFetchHooks(router, store) {
  // Add router hook for handling preFetch.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = getMatchedComponents(to, router),
          prevMatched = getMatchedComponents(from, router);
    let diffed = false;
    const components = matched.filter((m, i) => {
      return diffed || (diffed = !prevMatched[i] || prevMatched[i].c !== m.c || m.path.indexOf('/:') > -1 // does it has params?
      );
    }).filter(m => m.c && typeof m.c.preFetch === 'function').map(m => m.c);

    if (appPrefetch) {
      appPrefetch = false;
      components.unshift(appOptions);
    }

    if (!components.length) {
      return next();
    }

    let routeUnchanged = true;

    const redirect = url => {
      routeUnchanged = false;
      next(url);
    };

    const proceed = () => {
      if (routeUnchanged) {
        next();
      }
    };

    components.filter(c => c && c.preFetch).reduce((promise, c) => promise.then(() => routeUnchanged && c.preFetch({
      store,
      currentRoute: to,
      previousRoute: from,
      redirect
    })), Promise.resolve()).then(proceed).catch(e => {
      console.error(e);
      proceed();
    });
  });
}
// CONCATENATED MODULE: ./.quasar/client-entry.js
/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

 // We load Quasar stylesheet file










async function start() {
  const {
    app,
    store,
    router
  } = await _quasar_app();
  let routeUnchanged = true;

  const redirect = url => {
    routeUnchanged = false;
    window.location.href = url;
  };

  const urlPath = window.location.href.replace(window.location.origin, '');
  const bootFiles = [initialMain, boot["a" /* default */]];

  for (let i = 0; routeUnchanged === true && i < bootFiles.length; i++) {
    if (typeof bootFiles[i] !== 'function') {
      continue;
    }

    try {
      await bootFiles[i]({
        app,
        router,
        store,
        Vue: vue_runtime_esm["a" /* default */],
        ssrContext: null,
        redirect,
        urlPath
      });
    } catch (err) {
      if (err && err.url) {
        window.location.href = err.url;
        return;
      }

      console.error('[Quasar] boot error:', err);
      return;
    }
  }

  if (routeUnchanged === false) {
    return;
  }

  addPreFetchHooks(router, store);
  vue_runtime_esm["a" /* default */].prototype.$q.capacitor = window.Capacitor;
  new vue_runtime_esm["a" /* default */](app);
}

start();

/***/ }),

/***/ "7e6d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9c65":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=app.js.map