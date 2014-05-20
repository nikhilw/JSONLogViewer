var fs = require("fs");
var Tail = require("always-tail");
// should I be using Lazy module somewhere here?
// http://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js


var tail = new Tail("somefile.log", "\n");

tail.on("line", function(data) {
	document.write(data +"<br><br>");
});

tail.watch();