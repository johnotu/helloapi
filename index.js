'use strict';

const http = require('http');

const server = http.createServer((req, res) => {
  const { headers, method, url } = req;
  let reqBody = [];
  req.on('data', dataBits => {
    reqBody.push(dataBits);
  });
  req.on('end', () => {
    reqBody = Buffer.concat(reqBody).toString();

    const handler = typeof router[url] !== "undefined" ? router[url] : handlers.notFound;

    handler(reqBody, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 200;
      const payloadStr = JSON.stringify(payload);

      res.writeHead(statusCode, { 'content-type': 'application/json' });
      res.end(payloadStr);
    });
  });
});

server.listen(3000, () => {
  console.log('helloapi server is listening on port 3000');
});

const handlers = {
  notFound: (reqBody, callback) => {
    callback(404, { msg: 'The route you requested does not exist!' });
  },
  hello: (reqBody, callback) => {
    callback(200, { msg: 'Hello there, hope you\'re doing good today!'});
  }
}

const router = {
  '/hello': handlers.hello
}