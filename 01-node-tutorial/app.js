const http = require("http");

const server = http.createServer((req, res) => {
  console.log("user hit the server");
  res.end("Welcome");
});

server.listen(3000);
