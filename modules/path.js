const path = require("path");

const filePath = path.join("/content/", "subfolder", "test.txt");

const file = path.basename(filePath);

const absolte = path.resolve(__dirname, "content", "subfolder", "test.txt");

module.exports.path = {
  path,
  filePath,
  file,
  absolte,
};
