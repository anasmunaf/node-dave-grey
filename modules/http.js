const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Welcome to home page");
    res.end();
  } else if (req.url === "/about") {
    res.write("Welcome to about page");
    res.end();
  } else {
    res.write(`<h1>Oops the systems collapsed</h1>`);
  }
  res.end(`<h1>Oops the systems collapsed</h1>`);
});
server.listen(3000);

module.exports.http = {
  server,
};
