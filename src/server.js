const http = require("http");
const fs = require("fs");
const path = require("path");

const handler = (request, response) => {
  const endpoint = request.url;
  console.log(endpoint);
  const method = request.method;
  console.log(method);

  var message = "This is great, node is the best, like, really.";

  if (endpoint === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });

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
  }

  // response.write(message);
  // response.end();
};

const server = http.createServer(handler);

server.listen(3000, function() {
  console.log(
    "Server is listening on port 3000. Ready to accept requests. You hum it, I'll play it."
  );
});
