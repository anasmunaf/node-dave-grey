const express = require("express");
const app = express();
const path = require("path");

const port = process.env.port || 8000;

app.get("/", (req, res) => {
  res.sendFile(path.join("views", "index.html"), { root: __dirname });
});

app.listen(port, () => {
  console.log("Server Started at port: ", port);
});
