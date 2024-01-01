const {
  logs: { logEvents },
} = require("./log_events");

const { EventEmitter } = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

function eventEmiiter() {
  myEmitter.on("log", (msg) => {
    logEvents(msg);
  });

  setTimeout(() => {
    myEmitter.emit("log", "log event emitter !\n");
  }, 2000);
}

module.exports.emitter = { eventEmiiter };
