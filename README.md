# HelloAPI
A simple nodejs REST API without any framework. It has just one route _/hello_.

On _/hello_, it sends back a status 200 OK with JSON response `{ "msg": "Hello there, hope  you're doing great today!"}`.

On every other route, it sends a 404 NotFound with JSON response `{ "msg": "The route you requested does not exist!"}`.

## To use
Just clone repo and run `node index.js`. No `npm` or any other installations required 😎