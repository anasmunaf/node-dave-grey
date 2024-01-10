const { readFileSync, existsSync } = require("fs")
const http = require("http")
const path = require("path")
const { EventEmitter } = require("stream")
const {
  logs: { logEvents }
} = require("./modules/log_events")

class Emitter extends EventEmitter {}

const emitter = new Emitter()

emitter.on("log", (msg, fileName) => {
  logEvents(msg, fileName)
})

const port = process.env.port || 3000

const filePath = path.join(__dirname, "views", "index.html")

const ext = {
  css: "text/css",
  js: "text/javascript",
  json: "application/json",
  jpg: "image/jpeg",
  png: "image/png",
  txt: "text/plain",
  html: "text/html"
}

function serverFile(fsPath, type, res) {
  try {
    const rawData = readFileSync(fsPath, {
      encoding: "utf8"
    })
    const data = type === ext.json ? JSON.parse(rawData) : rawData

    res.writeHead(fsPath.includes("404.html") ? 400 : 200, {
      "Content-Type": type
    })
    res.end(type === ext.json ? JSON.stringify(data) : data)
  } catch (error) {
    emitter.emit("log", `${error.name} ${error.message}`, "error-log", "\n")
    console.log(error)
    res.statusCode = 500
    res.end()
  }
}

const server = http.createServer((req, res) => {
  console.log("Server started")
  emitter.emit(
    "log",
    `method: ${req.method}\troute: ${req.url}`,
    "req-log",
    "\n"
  )
  const extension = path.extname(req.url).slice(1)
  const contentType = ext[extension] || ext.html
  const url = req.url
  let contentPath = null

  if (contentType === ext.html) {
    if (url === "/") contentPath = filePath
    else if (url.slice(-1) === "/")
      contentPath = path.join(__dirname, "views", req.url, "index.html")
    else contentPath = path.join(__dirname, "views", req.url)
  } else contentPath = path.join(__dirname, req.url)

  if (!contentType && url.slice(-1) !== "/") contentPath += ".html"

  const fileExist = existsSync(contentPath)

  if (fileExist) {
    serverFile(contentPath, contentType, res)
  } else {
    switch (path.parse(contentPath).name) {
      case "old-page":
        res.writeHead(301, {
          location: "/new-page.html"
        })
        res.end()
        break
      case "page":
        res.writeHead(301, {
          location: "/"
        })
        res.end()
        break

      default:
        serverFile(path.join(__dirname, "views", "404.html"), ext.html, res)
    }
  }
  res.end()
})

server.listen(port)
