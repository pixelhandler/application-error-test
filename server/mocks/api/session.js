/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var apiSessionRouter = express.Router();

  apiSessionRouter.get('/', function(req, res) {
    res.status(502).end();
  });

  apiSessionRouter.post('/', function(req, res) {
    res.status(502).end();
  });

  apiSessionRouter.get('/:id', function(req, res) {
    res.status(502).end();
  });

  apiSessionRouter.put('/:id', function(req, res) {
    res.status(502).end();
  });

  apiSessionRouter.delete('/:id', function(req, res) {
    res.status(502).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/session', require('body-parser'));
  app.use('/api/session', apiSessionRouter);
};
