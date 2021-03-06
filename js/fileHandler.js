var fs = require("fs");
//var ee = require('events').EventEmitter
var Tail = require("always-tail");
var jade = require("jade");
var $ = require("jquery");
var orch = require("../js/orch.js");
var appUtil = require("../js/appUtil.js");

orch.on("configUpdate", watchFile);

var logBlockTemplate,
	prefTemplate,
	errorTemplate;


function open(value) {
	if (!fs.existsSync(file)) {
		errorTemplate = errorTemplate || jade.compile(fs.readFileSync("html/errorBlock.jade"));
		$("#container").html(
			errorTemplate({
				error: {
					message: "The file does not exist: " + file
				}
			})
		);
		return;
	}
	
	file.updateConfig("logFile", file);
};

var docRef,
tail;
function watchFile(file, doc) {
	
	file = file || orch.getConfig("logFile");
	
	if (!fs.existsSync(file)) {
		errorTemplate = errorTemplate || jade.compile(fs.readFileSync("html/errorBlock.jade"));
		$("#container").html(
			errorTemplate({
				error: {
					message: "The file does not exist: " + file
				}
			})
		);
		return;
	}
	
	if (tail) {
		tail.unwatch();
	}
	
	tail = new Tail(file, "\n");
	logBlockTemplate = logBlockTemplate || jade.compile(fs.readFileSync("html/logBlock.jade"));
	
	docRef = doc;
	
	$("#container").html("");
	
	var i = 0;
	tail.on("line", function(data) {
		//console.log("Got line: "+ i++);
		//console.log(orch.getAppConfig("levelColours"));
		try {
			$("#container").append(
				logBlockTemplate({
					data:JSON.parse(data),
					fileAttrs: orch.getConfig("fileAttrs"),
					colours: orch.getConfig("levelColours"),
					orch: orch,
					appUtil: appUtil
				})
			);
		} catch (e) {
			$("#container").append("There was an error while parsing the log.");
			$("#container").append(e);
		}

//		console.log(orch.getConfig("document"));
		$("#fileName").text(file); //TODO update the filename as well..
//		console.log(docRef);
		window.scrollTo(0,window.document.body.scrollHeight);
	});

	tail.watch();
}


function openPrefs() {
	var jQuery = window.jQuery;
	prefTemplate = prefTemplate || jade.compile(fs.readFileSync("html/configOverlay.jade"));
	
	jQuery("body").append(
		prefTemplate({
			data: {},
			fileAttrs: orch.getConfig("fileAttrs"),
			colours: orch.getConfig("levelColours"),
			orch: orch,
			appUtil: appUtil
		})
	);
	
	jQuery("#logFileConfig").modal();
	
	//TODO what to do with this code??
//	
//	window.jQuery("#saveLogConfig").on("click", function() {
//		//orch.updateConfig("logFile", window.jQuery(".form-group").find("#logFile").val());
//		
//		var tail = new Tail(window.jQuery(".form-group").find("#logFile").val(), "\n");
//
//		window.jQuery("#logFileConfig").modal("hide");
//		
//		var tmpl = jade.compile(fs.readFileSync("html/logBlock.jade"));
//		var i = 0;
//		window.jQuery("#container").html("");
//		tail.on("line", function(data) {
//		console.log("Got line: "+ i++);
//
//		//document.getElementById("container").innerHTML += tmpl({data:JSON.parse(data)});
//		window.jQuery("#container").append(tmpl({data:JSON.parse(data), config: orch.getConfig(), colours: orch.getAppConfig("levelColours")}));
//		//document.write(data +"<br><br>");
//		window.scrollTo(0,document.body.scrollHeight);
//});
//		
//	});
}

module.exports = {
	openPrefs: openPrefs,
	watchFile: watchFile
}