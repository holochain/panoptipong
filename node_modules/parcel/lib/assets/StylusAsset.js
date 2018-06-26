'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

let getDependencies = (() => {
  var _ref = _asyncToGenerator(function* (code, filepath, asset, options, seen = new Set()) {
    seen.add(filepath);

    var _ref2 = yield Promise.all(['parser', 'visitor/deps-resolver', 'nodes', 'utils'].map(function (dep) {
      return localRequire('stylus/lib/' + dep, filepath);
    })),
        _ref3 = _slicedToArray(_ref2, 4);

    const Parser = _ref3[0],
          DepsResolver = _ref3[1],
          nodes = _ref3[2],
          utils = _ref3[3];


    nodes.filename = asset.name;

    let parser = new Parser(code, options);
    let ast = parser.parse();
    let deps = new Map();
    let resolver = new Resolver(Object.assign({}, asset.options, {
      extensions: ['.styl', '.css']
    }));

    class ImportVisitor extends DepsResolver {
      visitImport(imported) {
        let path = imported.path.first.string;

        if (!deps.has(path)) {
          deps.set(path, resolver.resolve(path, filepath));
        }
      }
    }

    new ImportVisitor(ast, options).visit(ast);

    // Recursively process depdendencies, and return a map with all resolved paths.
    let res = new Map();
    yield Promise.all(Array.from(deps.entries()).map((() => {
      var _ref4 = _asyncToGenerator(function* ([path, resolved]) {
        try {
          resolved = (yield resolved).path;
        } catch (err) {
          resolved = null;
        }

        let found;
        if (resolved) {
          found = [resolved];
          res.set(path, resolved);
        } else {
          // If we couldn't resolve, try the normal stylus resolver.
          // We just need to do this to keep track of the dependencies - stylus does the real work.

          // support optional .styl
          let originalPath = path;
          if (!/\.styl$/i.test(path)) {
            path += '.styl';
          }

          let paths = (options.paths || []).concat(dirname(filepath || '.'));
          found = utils.find(path, paths, filepath);
          if (!found) {
            found = utils.lookupIndex(originalPath, paths, filepath);
          }

          if (!found) {
            throw new Error('failed to locate file ' + originalPath);
          }
        }

        // Recursively process resolved files as well to get nested deps
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = found[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            let resolved = _step.value;

            if (!seen.has(resolved)) {
              asset.addDependency(resolved, { includedInParent: true });

              let code = yield fs.readFile(resolved, 'utf8');
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = (yield getDependencies(code, resolved, asset, options, seen))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  let _ref5 = _step2.value;

                  var _ref6 = _slicedToArray(_ref5, 2);

                  let path = _ref6[0];
                  let resolvedPath = _ref6[1];

                  res.set(path, resolvedPath);
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });

      return function (_x5) {
        return _ref4.apply(this, arguments);
      };
    })()));

    return res;
  });

  return function getDependencies(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();

let createEvaluator = (() => {
  var _ref7 = _asyncToGenerator(function* (code, asset, options) {
    const deps = yield getDependencies(code, asset.name, asset, options);
    const Evaluator = yield localRequire('stylus/lib/visitor/evaluator', asset.name);

    // This is a custom stylus evaluator that extends stylus with support for the node
    // require resolution algorithm. It also adds all dependencies to the parcel asset
    // tree so the file watcher works correctly, etc.
    class CustomEvaluator extends Evaluator {
      visitImport(imported) {
        let node = this.visit(imported.path).first;
        let path = node.string;
        if (node.name !== 'url' && path && !URL_RE.test(path)) {
          let resolved = deps.get(path);

          // First try resolving using the node require resolution algorithm.
          // This allows stylus files in node_modules to be resolved properly.
          // If we find something, update the AST so stylus gets the absolute path to load later.
          if (resolved) {
            node.string = resolved;
          }
        }

        // Done. Let stylus do its thing.
        return super.visitImport(imported);
      }
    }

    return CustomEvaluator;
  });

  return function createEvaluator(_x6, _x7, _x8) {
    return _ref7.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const CSSAsset = require('./CSSAsset');
const Asset = require('../Asset');
const localRequire = require('../utils/localRequire');
const Resolver = require('../Resolver');
const fs = require('../utils/fs');

var _require = require('path');

const dirname = _require.dirname;


const URL_RE = /^(?:url\s*\(\s*)?['"]?(?:[#/]|(?:https?:)?\/\/)/i;

class StylusAsset extends Asset {
  constructor(name, options) {
    super(name, options);
    this.type = 'css';
  }

  parse(code) {
    var _this = this;

    return _asyncToGenerator(function* () {
      // stylus should be installed locally in the module that's being required
      let stylus = yield localRequire('stylus', _this.name);
      let opts = yield _this.getConfig(['.stylusrc', '.stylusrc.js'], {
        packageKey: 'stylus'
      });
      let style = stylus(code, opts);
      style.set('filename', _this.name);
      style.set('include css', true);
      // Setup a handler for the URL function so we add dependencies for linked assets.
      style.define('url', function (node) {
        let filename = _this.addURLDependency(node.val, node.filename);
        return new stylus.nodes.Literal(`url(${JSON.stringify(filename)})`);
      });
      style.set('Evaluator', (yield createEvaluator(code, _this, style.options)));

      return style;
    })();
  }

  generate() {
    return [{
      type: 'css',
      value: this.ast.render(),
      hasDependencies: false
    }];
  }

  generateErrorMessage(err) {
    let index = err.message.indexOf('\n');
    err.codeFrame = err.message.slice(index + 1);
    err.message = err.message.slice(0, index);
    return err;
  }
}

module.exports = StylusAsset;