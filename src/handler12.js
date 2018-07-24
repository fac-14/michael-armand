const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const handler = (request, response) => {
    const endpoint = request.url;
    console.log(endpoint);
    const method = request.method;
    console.log(method);
  
    var message = "This is great, node is the best, like, really.";
  
    if (endpoint === "/") {
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
  
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
    } else if (endpoint === "/create-post") {
      var theData = "";
      request.on("data", function(chunkOfData) {
        theData += chunkOfData;
      });
      request.on("end", () => {
        let convertedData = querystring.parse(theData);
        console.log(convertedData);
        response.writeHead(301, { Location: "/index.html" });
        response.end();
      });
    } else {
      let extension = endpoint.split(".")[1];
      let extensionType = {
        html: "text/html",
        css: "text/css",
        js: "application/javascript",
        jpg: "image/jpeg",
        png: "image/png",
        ico: "image/x-icon"
      };
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
  
      fs.readFile(path.join(__dirname, "..", "/public/", endpoint), function(
        error,
        file
      ) {
        if (error) {
          console.log(error);
          return;
        } else {
          response.writeHead(200, {
            "Content-Type": extensionType[extension]
          });
          response.end(file);
        }
      });
    }
  };

  module.exports = handler;