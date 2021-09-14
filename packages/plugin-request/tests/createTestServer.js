'use strict';

const http = require('http');
const express = require('express');
const pify = require('pify');
const bodyParser = require('body-parser');

// code get from https://github.com/lukechilds/create-test-server
// remove the https server for windows ci
const createTestServer = (opts = {}) => {
  const server = express();
  server.http = http.createServer(server);

  server.set('etag', false);

  if (opts.bodyParser !== false) {
    server.use(
      bodyParser.json(
        Object.assign(
          { limit: '1mb', type: 'application/json' },
          opts.bodyParser,
        ),
      ),
    );
    server.use(
      bodyParser.text(
        Object.assign({ limit: '1mb', type: 'text/plain' }, opts.bodyParser),
      ),
    );
    server.use(
      bodyParser.urlencoded(
        Object.assign(
          {
            limit: '1mb',
            type: 'application/x-www-form-urlencoded',
            extended: true,
          },
          opts.bodyParser,
        ),
      ),
    );
    server.use(
      bodyParser.raw(
        Object.assign(
          { limit: '1mb', type: 'application/octet-stream' },
          opts.bodyParser,
        ),
      ),
    );
  }

  const send = (fn) => (req, res, next) => {
    const cb = typeof fn === 'function' ? fn(req, res, next) : fn;
    Promise.resolve(cb).then((val) => {
      if (val) {
        res.send(val);
      }
    });
  };

  const get = server.get.bind(server);
  server.get = function () {
    const [path, ...handlers] = [...arguments];

    for (const handler of handlers) {
      get(path, send(handler));
    }
  };

  server.listen = () =>
    Promise.all([
      pify(server.http.listen.bind(server.http))().then(() => {
        server.port = server.http.address().port;
        server.url = `http://localhost:${server.port}`;
      }),
    ]);

  server.close = () =>
    Promise.all([
      pify(server.http.close.bind(server.http))().then(() => {
        server.port = undefined;
        server.url = undefined;
      }),
    ]);

  return server.listen().then(() => server);
};

module.exports = createTestServer;
