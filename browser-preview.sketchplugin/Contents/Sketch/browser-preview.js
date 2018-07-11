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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (context) {
  // export options
  var options = {
    scales: '2',
    formats: 'png',
    output: '/tmp',
    overwriting: true
  };
  var browser = Settings.settingForKey('browser-preview-browser') || 'Safari';
  // get sketch document
  var document = sketch.getSelectedDocument();
  // get selected page
  var page = document.selectedPage;

  // if no artboard selected
  if (context.selection.length == 0) {
    context.document.showMessage('⚠️ Please select an artboard.');
    return;
  }

  if (context.selection.length >= 1) {
    var artboard = context.selection.firstObject();
    if (artboard && artboard.isKindOfClass(MSArtboardGroup)) {
      // show message
      context.document.showMessage('Creating preview for "' + String(artboard.name()) + '" in ' + String(browser));
      // create export file directory
      var previewFile = (0, _createPreview2['default'])(artboard, options);
      // play sound
      util.runCommand("/usr/bin/afplay", ["/System/Library/Sounds/Glass.aiff"]);
      // open export in browser
      util.runCommand('/usr/bin/open', ["-a", browser, previewFile]);
    }
    return;
  }
};

var _sketchUtils = __webpack_require__(2);

var util = _interopRequireWildcard(_sketchUtils);

var _createPreview = __webpack_require__(3);

var _createPreview2 = _interopRequireDefault(_createPreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var Settings = __webpack_require__(5);
var sketch = __webpack_require__(0);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runCommand = runCommand;
function runCommand(command, args) {
  var task = NSTask.alloc().init();
  task.setLaunchPath_(command);
  task.arguments = args;
  task.launch();
  task.waitUntilExit();
  return task.terminationStatus() == 0;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sketch = __webpack_require__(0);
var fs = __webpack_require__(4);

exports['default'] = function (artboard, options) {
  // export file
  sketch['export'](artboard, options);
  var file = options.output + "/" + artboard.name() + "@" + options.scales + "x." + options.formats;
  var htmlFile = String(options.output) + '/' + String(artboard.name()) + '.html';
  var bgColor = '#ffffff';
  if (artboard.hasBackgroundColor() === 1) {
    var colorObj = artboard.backgroundColor();
    bgColor = 'rgba(' + 255 * colorObj.red() + ',' + 255 * colorObj.green() + ',' + 255 * colorObj.blue() + ',' + String(colorObj.alpha()) + ')';
  }

  // create html
  var html = '<!DOCTYPE html>\n  <html>\n    <head>\n      <title>' + String(artboard.name()) + '</title>\n      <style type="text/css">\n        html, body{\n          margin: 0;\n          background: ' + bgColor + ';\n        }\n        .flex{\n          width: 100vw;\n          display: flex;\n          justify-content: center;\n        }\n        img{\n          position: relative;\n          width: ' + String(artboard.bounds().size.width) + 'px;\n          height: ' + String(artboard.bounds().size.height) + 'px;\n        }\n      </style>\n    </head>\n    <body>\n      <div class="flex">\n        <img src="' + file + '" alt="' + String(artboard.name()) + '" /\n      </div>\n    </body>\n  </html>';
  // create file
  fs.writeFileSync(htmlFile, html);
  // return file
  return htmlFile;
};

/***/ }),
/* 4 */
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
    data.writeToFile_atomically(file, true)
  } else {
    var handle = NSFileHandle.fileHandleForWritingAtPath(file)
    handle.seekToEndOfFile()
    handle.writeData(data.dataUsingEncoding(NSUTF8StringEncoding))
  }
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
  var err = MOPointer.alloc().init()
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
      return
    case 'ascii':
      string.writeToFile_atomically_encoding_error(path, true, NSASCIIStringEncoding)
      return
    case 'utf16le':
    case 'ucs2':
      string.writeToFile_atomically_encoding_error(path, true, NSUTF16LittleEndianStringEncoding)
      return
    case 'base64':
      var plainData = string.dataUsingEncoding(NSUTF8StringEncoding)
      var nsdataEncoded = plainData.base64EncodedStringWithOptions(0)
      nsdataEncoded.writeToFile_atomically(path, true)
      return
    case 'latin1':
    case 'binary':
      string.writeToFile_atomically_encoding_error(path, true, NSISOLatin1StringEncoding)
      return
    case 'hex':
      // TODO: how?
    default:
      string.writeToFile_atomically_encoding_error(path, true, NSUTF8StringEncoding, err)
      return
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
