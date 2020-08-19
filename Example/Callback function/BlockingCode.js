// Blocking Code Example

var fs = require("fs");

var data = fs.readFileSync("C:/Users/hoon9/Desktop/Study/Nodejs/NodejsStudy/Example/Callback function/input.txt");

console.log(data.toString());
console.log("Program has ended");