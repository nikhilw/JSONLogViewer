var dateFormat = require('dateformat');


module.exports = {
	formatDate: dateFormat,
	setInObjAtPath: function(strPath, object, value) {
		var tmpObj = object,
			entered = false;
		strPath = strPath.split(".");
		
		//TODO what have I done here?
		while (strPath.length > 1) {
			entered = true;
			tmpObj = tmpObj[strPath.shift()];
		}
		
		if (!entered) {
			object[strPath.shift()] = value;
		} else {
			tmpObj[strPath.shift()] = value;
		}
		
		return object;
	}
};