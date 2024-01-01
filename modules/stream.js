const { createReadStream, createWriteStream } = require("fs");
const path = require("path");

console.log("start");
const sampleFile = path.join(__dirname, "..", "content", "sample.txt");
const writeFile = path.join(__dirname, "..", "content", "sample_2.txt");

const readSt = createReadStream(sampleFile, {
  encoding: "utf8",
});

const writeSt = createWriteStream(writeFile);

// readSt.on("data", (chunk) => writeSt.write(chunk));
readSt.pipe(writeSt);

writeSt.on("finish", (data) => {
  const read2 = createReadStream(writeFile, {
    encoding: "utf8",
  });

  read2.on("data", (data) => {
    console.log(data);
  });
});

console.log("end");

module.exports.stream = {
  readSt,
};
