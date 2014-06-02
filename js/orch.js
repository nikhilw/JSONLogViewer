var $ = require("jquery");
var EventEmitter = require('events').EventEmitter;
var util = require("util");
var b = require("../config/appConfig.json");
var appUtil = require("../js/appUtil.js");
var fs = require("fs");

function ConfigHandler () {
    EventEmitter.call(this);
}

util.inherits(ConfigHandler, EventEmitter);

var appConfig = $.extend(true, {}, b);

ConfigHandler.prototype.updateConfig = function(name, value) {
	if ($.isArray(name)) {
		for(var i = 0; i < name.length; i++) {
			appConfig = appUtil.setInObjAtPath(name[i].name, appConfig, name[i].value);
		}
	} else if (typeof name === "object") {
		$.extend(appConfig, name);
		
//		if (name.logFile) {
//			this.emit("newLogFile");
//		}
		return;
	} else {
		appConfig[name] = value;
	
//	if (name === "logFile") {
//		this.emit("newLogFile");
//	}
	}
	
//	fs.writeFileSync(__dirname + "/../config/appConfig.json", JSON.stringify(appConfig, undefined, "    "));
	
//	require("../js/fileHandler.js").watchFile();
	
	this.emit("configUpdate");
};
	
ConfigHandler.prototype.getConfig = function(name) {
	if (typeof name === "string") {
		var tmpVal = appConfig[name];

		if (typeof tmpVal === "object") {
			return $.extend(true, {}, tmpVal); // guard against unexpected changes.
		}

		return tmpVal;
	}

//	return $.extend(true, {}, appConfig); // guard against unexpected changes.
};

ConfigHandler.prototype.isfileAttrParam = function(name) {
	var fileAttrs = appConfig.fileAttrs;
	for (var p in fileAttrs) {
		if (name === fileAttrs[p])
			return true;
	}
	
	return false;
}

//configHandler.getAppConfig = function(name) {
//	if (typeof appConfig[name] === "object") {
//		return $.extend(true, {}, appConfig[name]);
//	} else if (appConfig[name]) {
//		return appConfig[name];
//	}
//}

module.exports = new ConfigHandler();