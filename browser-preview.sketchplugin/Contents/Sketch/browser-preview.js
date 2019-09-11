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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/browser-preview.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/fs/index.js":
/*!****************************************!*\
  !*** ./node_modules/@skpm/fs/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// TODO: async. Should probably be done with NSFileHandle and some notifications
// TODO: file descriptor. Needs to be done with NSFileHandle

module.exports.constants = {
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1
}

module.exports.accessSync = function(path, mode) {
  mode = mode | 0
  var fileManager = NSFileManager.defaultManager()

  switch (mode) {
    case 0:
      return module.exports.existsSync(path)
    case 1:
      return Boolean(fileManager.isExecutableFileAtPath(path))
    case 2:
      return Boolean(fileManager.isWritableFileAtPath(path))
    case 3:
      return Boolean(fileManager.isExecutableFileAtPath(path) && fileManager.isWritableFileAtPath(path))
    case 4:
      return Boolean(fileManager.isReadableFileAtPath(path))
    case 5:
      return Boolean(fileManager.isReadableFileAtPath(path) && fileManager.isExecutableFileAtPath(path))
    case 6:
      return Boolean(fileManager.isReadableFileAtPath(path) && fileManager.isWritableFileAtPath(path))
    case 7:
      return Boolean(fileManager.isReadableFileAtPath(path) && fileManager.isWritableFileAtPath(path) && fileManager.isExecutableFileAtPath(path))
  }
}

module.exports.appendFileSync = function(file, data, options) {
  if (!module.exports.existsSync(file)) {
    return module.exports.writeFileSync(file, data, options)
  }

  var handle = NSFileHandle.fileHandleForWritingAtPath(file)
  handle.seekToEndOfFile()

  if (data && data.mocha && data.mocha().class() === 'NSData') {
    handle.writeData(data)
    return
  }

  var encoding = options && options.encoding ? options.encoding : (options ? options : 'utf8')

  var string = NSString.stringWithString(data)
  var nsdata

  switch (encoding) {
    case 'utf8':
      nsdata = string.dataUsingEncoding(NSUTF8StringEncoding)
      break
    case 'ascii':
      nsdata = string.dataUsingEncoding(NSASCIIStringEncoding)
      break
    case 'utf16le':
    case 'ucs2':
      nsdata = string.dataUsingEncoding(NSUTF16LittleEndianStringEncoding)
      break
    case 'base64':
      var plainData = string.dataUsingEncoding(NSUTF8StringEncoding)
      nsdata = plainData.base64EncodedStringWithOptions(0).dataUsingEncoding(NSUTF8StringEncoding)
      break
    case 'latin1':
    case 'binary':
      nsdata = string.dataUsingEncoding(NSISOLatin1StringEncoding)
      break
    case 'hex':
      // TODO: how?
    default:
      nsdata = string.dataUsingEncoding(NSUTF8StringEncoding)
      break
  }

  handle.writeData(data)
}

module.exports.chmodSync = function(path, mode) {
  var err = MOPointer.alloc().init()
  var fileManager = NSFileManager.defaultManager()
  fileManager.setAttributes_ofItemAtPath_error({
    NSFilePosixPermissions: mode
  }, path, err)

  if (err.value() !== null) {
    throw new Error(err.value())
  }
}

module.exports.copyFileSync = function(path, dest, flags) {
  var err = MOPointer.alloc().init()
  var fileManager = NSFileManager.defaultManager()
  fileManager.copyItemAtPath_toPath_error(path, dest, err)

  if (err.value() !== null) {
    throw new Error(err.value())
  }
}

module.exports.existsSync = function(path) {
  var fileManager = NSFileManager.defaultManager()
  return Boolean(fileManager.fileExistsAtPath(path))
}

module.exports.linkSync = function(existingPath, newPath) {
  var err = MOPointer.alloc().init()
  var fileManager = NSFileManager.defaultManager()
  fileManager.linkItemAtPath_toPath_error(existingPath, newPath, err)

  if (err.value() !== null) {
    throw new Error(err.value())
  }
}

module.exports.mkdirSync = function(path, mode) {
  mode = mode || 0o777
  var err = MOPointer.alloc().init()
  var fileManager = NSFileManager.defaultManager()
  fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(path, false, {
    NSFilePosixPermissions: mode
  }, err)

  if (err.value() !== null) {
    throw new Error(err.value())
  }
}

module.exports.mkdtempSync = function(path) {
  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  var tempPath = path + makeid()
  module.exports.mkdirSync(tempPath)
  return tempPath
}

module.exports.readdirSync = function(path) {
  var fileManager = NSFileManager.defaultManager()
  var paths = fileManager.subpathsAtPath(path)
  var arr = []
  for (var i = 0; i < paths.length; i++) {
    arr.push(paths[i])
  }
  return arr
}

module.exports.readFileSync = function(path, options) {
  var encoding = options && options.encoding ? options.encoding : (options ? options : 'buffer')
  var fileManager = NSFileManager.defaultManager()
  var data = fileManager.contentsAtPath(path)
  switch (encoding) {
    case 'utf8':
      return String(NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding))
    case 'ascii':
      return String(NSString.alloc().initWithData_encoding(data, NSASCIIStringEncoding))
    case 'utf16le':
    case 'ucs2':
      return String(NSString.alloc().initWithData_encoding(data, NSUTF16LittleEndianStringEncoding))
    case 'base64':
      var nsdataDecoded = NSData.alloc().initWithBase64EncodedData_options(data, 0)
      return String(NSString.alloc().initWithData_encoding(nsdataDecoded, NSUTF8StringEncoding))
    case 'latin1':
    case 'binary':
      return String(NSString.alloc().initWithData_encoding(data, NSISOLatin1StringEncoding))
    case 'hex':
      // TODO: how?
      return data
    default:
      return data
  }
}

module.exports.readlinkSync = function(path) {
  var err = MOPointer.alloc().init()
  var fileManager = NSFileManager.defaultManager()
  var result = fileManager.destinationOfSymbolicLinkAtPath_error(path, err)

  if (err.value() !== null) {
    throw new Error(err.value())
  }

  return result
}

module.exports.realpathSync = function(path) {
  return NSString.stringByResolvingSymlinksInPath(path)
}

module.exports.renameSync = function(oldPath, newPath) {
  var err = MOPointer.alloc().init()
  var fileManager = NSFileManager.defaultManager()
  fileManager.moveItemAtPath_toPath_error(oldPath, newPath, err)

  if (err.value() !== null) {
    throw new Error(err.value())
  }
}

module.exports.rmdirSync = function(path) {
  var err = MOPointer.alloc().init()
  var fileManager = NSFileManager.defaultManager()
  fileManager.removeItemAtPath_error(path, err)

  if (err.value() !== null) {
    throw new Error(err.value())
  }
}

module.exports.statSync = function(path) {
  var err = MOPointer.alloc().init()
  var fileManager = NSFileManager.defaultManager()
  var result = fileManager.attributesOfItemAtPath_error(path, err)

  if (err.value() !== null) {
    throw new Error(err.value())
  }

  return {
    dev: String(result.NSFileDeviceIdentifier),
    // ino: 48064969, The file system specific "Inode" number for the file.
    mode: result.NSFileType | result.NSFilePosixPermissions,
    nlink: Number(result.NSFileReferenceCount),
    uid: String(result.NSFileOwnerAccountID),
    gid: String(result.NSFileGroupOwnerAccountID),
    // rdev: 0, A numeric device identifier if the file is considered "special".
    size: Number(result.NSFileSize),
    // blksize: 4096, The file system block size for i/o operations.
    // blocks: 8, The number of blocks allocated for this file.
    atimeMs: Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000,
    mtimeMs: Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000,
    ctimeMs: Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000,
    birthtimeMs: Number(result.NSFileCreationDate.timeIntervalSince1970()) * 1000,
    atime: new Date(Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000 + 0.5), // the 0.5 comes from the node source. Not sure why it's added but in doubt...
    mtime: new Date(Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000 + 0.5),
    ctime: new Date(Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000 + 0.5),
    birthtime: new Date(Number(result.NSFileCreationDate.timeIntervalSince1970()) * 1000 + 0.5),
    isBlockDevice: function() { return result.NSFileType === NSFileTypeBlockSpecial },
    isCharacterDevice: function() { return result.NSFileType === NSFileTypeCharacterSpecial },
    isDirectory: function() { return result.NSFileType === NSFileTypeDirectory },
    isFIFO: function() { return false },
    isFile: function() { return result.NSFileType === NSFileTypeRegular },
    isSocket: function() { return result.NSFileType === NSFileTypeSocket },
    isSymbolicLink: function() { return result.NSFileType === NSFileTypeSymbolicLink },
  }
}

module.exports.symlinkSync = function(target, path) {
  var err = MOPointer.alloc().init()
  var fileManager = NSFileManager.defaultManager()
  var result = fileManager.createSymbolicLinkAtPath_withDestinationPath_error(path, target, err)

  if (err.value() !== null) {
    throw new Error(err.value())
  }
}

module.exports.truncateSync = function(path, len) {
  var hFile = NSFileHandle.fileHandleForUpdatingAtPath(sFilePath)
  hFile.truncateFileAtOffset(len || 0)
  hFile.closeFile()
}

module.exports.unlinkSync = function(path) {
  var err = MOPointer.alloc().init()
  var fileManager = NSFileManager.defaultManager()
  var result = fileManager.removeItemAtPath_error(path, err)

  if (err.value() !== null) {
    throw new Error(err.value())
  }
}

module.exports.utimesSync = function(path, aTime, mTime) {
  var err = MOPointer.alloc().init()
  var fileManager = NSFileManager.defaultManager()
  var result = fileManager.setAttributes_ofItemAtPath_error({
    NSFileModificationDate: aTime
  }, path, err)

  if (err.value() !== null) {
    throw new Error(err.value())
  }
}

module.exports.writeFileSync = function(path, data, options) {
  var encoding = options && options.encoding ? options.encoding : (options ? options : 'utf8')

  if (data && data.mocha && data.mocha().class() === 'NSData') {
    data.writeToFile_atomically(path, true)
    return
  }

  var err = MOPointer.alloc().init()
  var string = NSString.stringWithString(data)

  switch (encoding) {
    case 'utf8':
      string.writeToFile_atomically_encoding_error(path, true, NSUTF8StringEncoding, err)
      break
    case 'ascii':
      string.writeToFile_atomically_encoding_error(path, true, NSASCIIStringEncoding, err)
      break
    case 'utf16le':
    case 'ucs2':
      string.writeToFile_atomically_encoding_error(path, true, NSUTF16LittleEndianStringEncoding, err)
      break
    case 'base64':
      var plainData = string.dataUsingEncoding(NSUTF8StringEncoding)
      var nsdataEncoded = plainData.base64EncodedStringWithOptions(0)
      nsdataEncoded.writeToFile_atomically(path, true)
      break
    case 'latin1':
    case 'binary':
      string.writeToFile_atomically_encoding_error(path, true, NSISOLatin1StringEncoding, err)
      break
    case 'hex':
      // TODO: how?
    default:
      string.writeToFile_atomically_encoding_error(path, true, NSUTF8StringEncoding, err)
      break
  }

  if (err.value() !== null) {
    throw new Error(err.value())
  }
}


/***/ }),

/***/ "./src/browser-preview.js":
/*!********************************!*\
  !*** ./src/browser-preview.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sketch_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sketch-utils */ "./src/sketch-utils.js");
/* harmony import */ var _create_preview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-preview */ "./src/create-preview.js");



var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var sketch = __webpack_require__(/*! sketch */ "sketch");

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  // export options
  var options = {
    scales: '2',
    formats: 'png',
    output: '/tmp',
    overwriting: true
  };
  var browser = Settings.settingForKey('browser-preview-browser') || 'Default'; // get sketch document

  var document = sketch.getSelectedDocument(); // get selected page
  // const page = document.selectedPage

  var layers = document.selectedLayers;
  var artboards = [];
  var artboardIds = []; // if no artboard selected

  if (layers.length === 0) {
    context.document.showMessage('⚠️ Please select at least one artboard or layer.');
    return;
  }

  if (layers.length >= 1) {
    artboards = layers.layers.map(function (layer) {
      // get parent Artboard if layer is not an artboard
      if (layer.getParentArtboard() !== undefined) {
        layer = layer.getParentArtboard();
      } // return special artboard object


      if (layer.type === 'Artboard') {
        return {
          name: encodeURIComponent(layer.name),
          id: layer.id,
          backgroundColor: layer.background.color,
          bounds: layer.frame,
          object: layer
        };
      }
    }).filter(function (artboard) {
      if (artboardIds.indexOf(artboard.id) > -1) {
        return false;
      }

      return artboardIds.push(artboard.id);
    });
    context.document.showMessage("Creating preview for ".concat(artboards.length, " artboards."));
    artboards.forEach(function (artboard) {
      var previewFile = Object(_create_preview__WEBPACK_IMPORTED_MODULE_1__["default"])(artboard, options); // play sound

      _sketch_utils__WEBPACK_IMPORTED_MODULE_0__["runCommand"]("/usr/bin/afplay", ["/System/Library/Sounds/Glass.aiff"]); // open export in browser

      if (browser === 'Default') {
        _sketch_utils__WEBPACK_IMPORTED_MODULE_0__["runCommand"]('/usr/bin/open', [previewFile]);
      } else {
        _sketch_utils__WEBPACK_IMPORTED_MODULE_0__["runCommand"]('/usr/bin/open', ["-a", browser, previewFile]);
      }
    }); // if( layer.type === 'Artboard' ) {
    //   let previewFile = createPreview(artboard, options)
    //   // play sound
    //   util.runCommand("/usr/bin/afplay", ["/System/Library/Sounds/Glass.aiff"])
    //   // open export in browser
    //   if (browser === 'Default') {
    //     util.runCommand('/usr/bin/open', [previewFile])
    //   } else {
    //     util.runCommand('/usr/bin/open', ["-a", browser, previewFile])
    //   }
    // }
    // )
    // const artboard = context.selection.firstObject();
    // if( artboard && artboard.isKindOfClass(MSArtboardGroup) ){
    //   // show message
    //   context.document.showMessage(`Creating preview for "${artboard.name()}" in ${browser}`)
    //   // create export file directory
    //   let previewFile = createPreview(artboard, options)
    //   // play sound
    //   util.runCommand("/usr/bin/afplay", ["/System/Library/Sounds/Glass.aiff"])
    //   // open export in browser
    //   if (browser === 'Default') {
    //     util.runCommand('/usr/bin/open', [previewFile])
    //   } else {
    //     util.runCommand('/usr/bin/open', ["-a", browser, previewFile])
    //   }
    // }

    return;
  }
});

/***/ }),

/***/ "./src/create-preview.js":
/*!*******************************!*\
  !*** ./src/create-preview.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var sketch = __webpack_require__(/*! sketch */ "sketch");

var fs = __webpack_require__(/*! @skpm/fs */ "./node_modules/@skpm/fs/index.js");

/* harmony default export */ __webpack_exports__["default"] = (function (artboard
/* = {
  object: artboard,
  name: string
  backgroundColor: string,
  bounds: {
    width: px
    height: px
  }
}*/
, options) {
  // export file
  sketch.export(artboard.object, options);
  var file = options.output + "/" + artboard.name + "@" + options.scales + "x." + options.formats;
  var htmlFile = "".concat(options.output, "/").concat(artboard.name, ".html");
  var align = artboard.name.split(':').pop().trim(); // create html

  var html = "<!DOCTYPE html>\n  <html>\n    <head>\n      <title>".concat(artboard.name, "</title>\n      <style type=\"text/css\">\n        html, body{\n          margin: 0;\n          background: ").concat(artboard.backgroundColor, ";\n        }\n        .flex{\n          width: 100vw;\n          max-width: 100vw;\n          overflow-x: hidden;\n          display: flex;\n          justify-content: ").concat(align === 'left' ? 'flex-start' : 'center', ";\n        }\n        img{\n          position: relative;\n          width: ").concat(artboard.bounds.width, "px;\n          height: ").concat(artboard.bounds.height, "px;\n        }\n      </style>\n    </head>\n    <body>\n      <div class=\"flex\">\n        <img src=\"").concat(file, "\" alt=\"").concat(artboard.name, "\" /\n      </div>\n    </body>\n  </html>"); // create file

  fs.writeFileSync(htmlFile, html); // return file

  return htmlFile;
});

/***/ }),

/***/ "./src/sketch-utils.js":
/*!*****************************!*\
  !*** ./src/sketch-utils.js ***!
  \*****************************/
/*! exports provided: runCommand */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runCommand", function() { return runCommand; });
function runCommand(command, args) {
  var task = NSTask.alloc().init();
  task.setLaunchPath_(command);
  task.arguments = args;
  task.launch();
  task.waitUntilExit();
  return task.terminationStatus() == 0;
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=browser-preview.js.map