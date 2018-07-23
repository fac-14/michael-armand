const http = require("http");



const message = "This is great, node is the best, like, really."





const handler = (request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/html"
  });
  response.write(message);
  response.end();
}

const server = http.createServer(handler);

server.listen(3000, function () {
  console.log(
    "Server is listening on port 3000. Ready to accept requests. You hum it, I'll play it."
  );
});