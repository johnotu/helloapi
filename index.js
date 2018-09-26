/**
 * HelloAPI is a simple nodejs-only API with just one route '/hello'.
 * On /hello, it sends back a status 200 OK with JSON response { "msg": "Hello there, hope  you're doing great today!"}
 * On every other route, it sends a 404 NotFound with JSON response { "msg": "The route you requested does not exist!"}
 */

// Run code in strict mode
'use strict';

// Require http module
const http = require('http');

//Initialize server
const server = http.createServer((req, res) => {
  // Assign request properties headers, method and url
  const { headers, method, url } = req;

  // Begin collection of request data stream
  let reqBody = [];
  req.on('data', dataBits => {
    reqBody.push(dataBits);
  });

  // Complete request data stream collection and handle request routes 
  req.on('end', () => {
    reqBody = Buffer.concat(reqBody).toString();

    // Select request handler
    const handler = typeof router[url] !== "undefined" ? router[url] : handlers.notFound;

    handler(reqBody, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 200;
      const payloadStr = JSON.stringify(payload);

      // Set status code and format in response header
      res.writeHead(statusCode, { 'content-type': 'application/json' });
      // Send response payload
      res.end(payloadStr);
    });
  });
}).listen(3000, () => {
  console.log('HelloAPI server is listening on port 3000');
});

// Define request handlers
const handlers = {
  notFound: (reqBody, callback) => {
    callback(404, { msg: 'The route you requested does not exist!' });
  },
  hello: (reqBody, callback) => {
    callback(200, { msg: 'Hello there, hope you\'re doing great today!'});
  }
}

// Define request routes
const router = {
  '/hello': handlers.hello
}