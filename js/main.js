var $ = require("jquery");
var orch = require("../js/orch.js");
var fileHandler = require("../js/fileHandler.js");

// should I be using Lazy module somewhere here?
// http://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js

$("#open").on('change', function (e) {
	debugger;
	fileHandler.open(this.value);
});

$(document).on("click", "#saveLogConfig", function() {
	var config = $(".form-group").serializeArray();
//	console.log("yey");
//	fileHandler.watchFile($(".form-group").find("#logFile").val(), document);
	
	window.jQuery("#logFileConfig").modal("hide");
	setTimeout(function() {
		window.jQuery("#logFileConfig").remove();
	}, 500);
	
	orch.updateConfig(config);
});

$(document).on('keyup', function (e) {
    if (e.keyCode == 'O'.charCodeAt(0) && e.ctrlKey) {
        $('#open').trigger("click");
    } else if (e.keyCode == 'P'.charCodeAt(0) && e.ctrlKey) {
    	fileHandler.openPrefs();
    }
});

// orch.updateConfig("document", document);

//fileHandler.watchFile("/somefile.log", document);
fileHandler.watchFile(undefined, document);