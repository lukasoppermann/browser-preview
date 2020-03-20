var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/browser-preview-settings.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/settingsView.html":
/*!*************************************!*\
  !*** ./resources/settingsView.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + context.plugin.urlForResourceNamed("_webpack_resources/c86757e6fcef13c2a4bf3641801c0ef2.html").path();

/***/ }),

/***/ "./src/browser-preview-settings.js":
/*!*****************************************!*\
  !*** ./src/browser-preview-settings.js ***!
  \*****************************************/
/*! exports provided: default, getDefaultSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultSettings", function() { return getDefaultSettings; });
var BrowserWindow = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'sketch-module-web-view'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var sketch = __webpack_require__(/*! sketch */ "sketch");

var Settings = sketch.Settings;
var UI = sketch.UI;
var settingsKeys = {
  BROWSERPREFERENCE: 'browserPreference',
  SOUNDPREFERENCE: 'soundPreference'
};
/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var options = {
    identifier: 'browserPreviewSettings',
    width: 320,
    height: 260,
    show: false,
    resizable: false,
    title: 'Browser Preview - Settings',
    minimizable: false,
    maximizable: false,
    alwaysOnTop: false,
    devTools: false,
    center: true,
    backgroundColor: '#ececec',
    hidesOnDeactive: false
  };
  var browserWindow = new BrowserWindow(options);
  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  var webContents = browserWindow.webContents;
  webContents.on('did-start-loading', function () {
    var defaultSettings = JSON.stringify(getDefaultSettings());
    browserWindow.webContents.executeJavaScript("window.settings =" + defaultSettings + "; populateSettings();").then(function (res) {
      return console.info(res);
    }).catch(function (err) {
      return console.error(err);
    });
  });
  webContents.on('updateSettings', function (data) {
    setSettings(data);
    browserWindow.close();
  });
  browserWindow.on('closed', function () {
    browserWindow = null;
  });
  browserWindow.loadURL(__webpack_require__(/*! ../resources/settingsView.html */ "./resources/settingsView.html"));
});

function getSettings() {
  var obj = {};
  var isUndefined = true;
  Object.keys(settingsKeys).forEach(function (key) {
    obj[settingsKeys[key]] = Settings.settingForKey(settingsKeys[key]);
    isUndefined = obj[settingsKeys[key]] === undefined;
  });
  return {
    data: obj,
    isUndefined: isUndefined
  };
}

function setSettings(data) {
  Object.keys(data).forEach(function (key) {
    Settings.setSettingForKey(key, data[key]);
  });
}

function getDefaultSettings() {
  var currentSettings = getSettings();

  if (currentSettings.isUndefined) {
    var obj = {};
    obj[settingsKeys.BROWSERPREFERENCE] = 'safari', obj[settingsKeys.SOUNDPREFERENCE] = false;
    setSettings(obj);
    return obj;
  } else {
    return currentSettings.data;
  }
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=browser-preview-settings.js.map