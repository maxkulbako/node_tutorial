const http = require("http");

const server = http.createServer();

// const server = http.createServer((req, res) => {
//   res.end("Welcome");
// });

// Using Event Emitter API
server.on("request", (req, res) => {
  res.end("Welcome");
});

server.listen(5500);
