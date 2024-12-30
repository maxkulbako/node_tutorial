const express = require("express");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");
app.use([logger, authorize]);

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
});

app.get("/api/products", (req, res) => {
  res.send("Products");
});

app.get("/api/items", (req, res) => {
  res.send("Items");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
