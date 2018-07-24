const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

function handler(request, response) {
  console.log(request.url, request.method);
  let url = request.url;
  if (url === "/") {
    //response.writeHead(200, {'Content-Type': 'text/html'})
    fs.readFile(path.join(__dirname, "..", "/public/index.html"), function(
      error,
      file
    ) {
      if (error) {
        console.log(error);
        return;
      } else {
        response.writeHead(200, {
          "Content-Type": "text/html"
        });
        response.end(file);
      }
    });
  } else if (url === "/create/post") {
    console.log("blog post handling");
    let data = "";
    request.on("data", function(packet) {
      data += packet;
    });
    request.on("end", () => {
      let parsed = querystring.parse(data);
      console.log(parsed);
      response.writeHead(301, { Location: "/index.html" });
      response.end();
    });
  } else {
    let ext = url.split(".")[1];

    let contentType = {
      html: "text/html",
      css: "text/css",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      svg: "image/svg+xml",
      ico: "image/x-icon",
      js: "application/javascript"
    };
    fs.readFile(path.join(__dirname, "..", "public", url), function(
      error,
      file
    ) {
      if (error) {
        console.log(error);
        return;
      } else {
        response.writeHead(200, {
          "Content-Type": contentType[ext]
        });
        response.end(file);
      }
    });
  }
}

module.exports = handler;
