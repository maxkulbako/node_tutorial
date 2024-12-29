const { readFile } = require("fs");

console.log("start a first task");
//CHECK FILE PATH!!!
readFile("./content/first.txt", "utf8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
  console.log("done with this task");
});
console.log("start a second task");
