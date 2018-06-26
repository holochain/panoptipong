'use strict';

let serve = (() => {
  var _ref = _asyncToGenerator(function* (bundler, port, useHTTPS = false) {
    let handler = middleware(bundler);
    let server;
    if (!useHTTPS) {
      server = http.createServer(handler);
    } else if (typeof useHTTPS === 'boolean') {
      server = https.createServer(generateCertificate(bundler.options), handler);
    } else {
      server = https.createServer((yield getCertificate(useHTTPS)), handler);
    }

    let freePort = yield getPort({ port });
    server.listen(freePort);

    return new Promise(function (resolve, reject) {
      server.on('error', function (err) {
        logger.error(new Error(serverErrors(err, server.address().port)));
        reject(err);
      });

      server.once('listening', function () {
        let addon = server.address().port !== port ? `- ${logger.chalk.yellow(`configured port ${port} could not be used.`)}` : '';

        logger.persistent(`Server running at ${logger.chalk.cyan(`${useHTTPS ? 'https' : 'http'}://localhost:${server.address().port}`)} ${addon}`);

        resolve(server);
      });
    });
  });

  return function serve(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const http = require('http');
const https = require('https');
const serveStatic = require('serve-static');
const getPort = require('get-port');
const serverErrors = require('./utils/customErrors').serverErrors;
const generateCertificate = require('./utils/generateCertificate');
const getCertificate = require('./utils/getCertificate');
const prettyError = require('./utils/prettyError');
const AnsiToHtml = require('ansi-to-html');
const logger = require('./Logger');
const path = require('path');
const url = require('url');

const ansiToHtml = new AnsiToHtml({ newline: true });

serveStatic.mime.define({
  'application/wasm': ['wasm']
});

function setHeaders(res) {
  enableCors(res);
}

function enableCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Type');
}

function middleware(bundler) {
  const serve = serveStatic(bundler.options.outDir, {
    index: false,
    setHeaders: setHeaders
  });

  return function (req, res, next) {
    // Wait for the bundler to finish bundling if needed
    if (bundler.pending) {
      bundler.once('bundled', respond);
    } else {
      respond();
    }

    function respond() {
      var _url$parse = url.parse(req.url);

      let pathname = _url$parse.pathname;

      if (bundler.error) {
        return send500(bundler.error);
      } else if (!pathname.startsWith(bundler.options.publicURL) || path.extname(pathname) === '') {
        // If the URL doesn't start with the public path, or the URL doesn't
        // have a file extension, send the main HTML bundle.
        return sendIndex();
      } else {
        // Otherwise, serve the file from the dist folder
        req.url = pathname.slice(bundler.options.publicURL.length);
        return serve(req, res, send404);
      }
    }

    function sendIndex() {
      // If the main asset is an HTML file, serve it
      if (bundler.mainBundle.type === 'html') {
        req.url = `/${path.basename(bundler.mainBundle.name)}`;
        serve(req, res, send404);
      } else {
        send404();
      }
    }

    function send500(error) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.writeHead(500);
      let errorMesssge = '<h1>🚨 Build Error</h1>';
      if (process.env.NODE_ENV === 'production') {
        errorMesssge += '<p><b>Check the console for details.</b></p>';
      } else {
        var _prettyError = prettyError(error, { color: true });

        const message = _prettyError.message,
              stack = _prettyError.stack;

        errorMesssge += `<p><b>${message}</b></p>`;
        if (stack) {
          errorMesssge += `<div style="background: black; padding: 1rem;">${ansiToHtml.toHtml(stack)}</div>`;
        }
      }
      res.end([`<!doctype html>`, `<head><title>🚨 Build Error</title></head>`, `<body style="font-family: monospace; white-space: pre;">${errorMesssge}</body>`].join(''));
    }

    function send404() {
      if (next) {
        return next();
      }

      res.writeHead(404);
      res.end();
    }
  };
}

exports.middleware = middleware;
exports.serve = serve;