// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

const names = require("./6-alternative-flavor");
const sayHi = require("./5-utils");
const data = require("./6-alternative-flavor");
console.log(data);

require("./7-mind-grenade");

sayHi("susan");
sayHi(names.john);
sayHi(names.peter);
