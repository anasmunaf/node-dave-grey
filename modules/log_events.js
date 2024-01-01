const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const path = require("path");
const { appendFile } = require("fs/promises");
const { existsSync, mkdirSync } = require("fs");

const logFile = path.join(
  __dirname,
  "..",
  "content",
  "logs",
  "general_logs.txt"
);
const logPath = path.join(__dirname, "..", "content", "logs");

async function logEvents(msg) {
  const date = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const log = date + " " + uuid() + " " + msg;

  if (!existsSync(logFile)) mkdirSync(logPath);

  await appendFile(logFile, log, {
    encoding: "utf8",
  });
}

module.exports.logs = {
  logEvents,
};
