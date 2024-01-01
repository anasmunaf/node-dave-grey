const fs = require("fs");
const path = require("path");
console.log("start");

const generalFile = path.join(__dirname, "..", "content", "general.txt");
const childFile = path.join(__dirname, "..", "content", "parent", "child.txt");

const read = fs.readFileSync(childFile, {
  encoding: "utf8",
});

const readAsnc = fs.readFile(
  generalFile,
  {
    encoding: "utf8",
  },
  (err, data) => {
    console.log(data);
  }
);

const write = fs.writeFileSync(
  generalFile,
  "This file is wrriten by all is means\n"
);

fs.appendFileSync(generalFile, read, "utf-8");
console.log("end");
module.exports = {
  read,
  write,
};
