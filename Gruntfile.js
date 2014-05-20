module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		zip: {
			"JSONLogViewer.nw": ["**/*"]
		},
		shell: {
			runApp: {
				command: "nw JSONLogViewer.nw"
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-zip');
	grunt.loadNpmTasks('grunt-shell');

	// Default task(s).
	grunt.registerTask('default', ['zip', "shell"]);

};