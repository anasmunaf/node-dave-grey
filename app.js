const http = require("http");

const { EventEmitter } = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

const port = process.env.port || 3000;

const server = http.createServer((req, res) => {
  console.log("Server started" + res);
});

server.listen(port);
