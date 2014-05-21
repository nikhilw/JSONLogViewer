var fs = require("fs");
var Tail = require("always-tail");
var jade = require("jade");
var $ = require("jquery");

// should I be using Lazy module somewhere here?
// http://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js


var tail = new Tail("somefile.log", "\n");

var tmpl = jade.compile(fs.readFileSync("html/logBlock.jade"));
var i = 0;
tail.on("line", function(data) {
	console.log("Got line: "+ i++);
	
	//document.getElementById("container").innerHTML += tmpl({data:JSON.parse(data)});
	$("#container").append(tmpl({data:JSON.parse(data)}));
	//document.write(data +"<br><br>");
});

tail.watch();

//https://github.com/rogerwang/node-webkit/wiki/about-node.js-server-side-script-in-node-webkit#template-engine