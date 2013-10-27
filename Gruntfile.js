module.exports = function (grunt) {

	grunt.initConfig({

		copy: {
			"bower-install": {
				files: [
					{
						expand: true,
						cwd: './bower_components/bootstrap/dist/',
						src: '**',
						dest: './public/assets/bootstrap/'
					},
					{
						expand: true,
						cwd: './bower_components/bootstrap/assets/js',
						src: ['html5shiv.js', 'respond.min.js'],
						dest: './public/assets/bootstrap/js'
					}
				]
			}
		},
		clean: {
			"bower-install": [
				"./public/assets/bootstrap/"
			]
		},
		bower: {
			install: {
				options: {
					targetDir: './public/assets',
					layout: 'byType',
					install: false,
					verbose: true,
					cleanTargetDir: true,
					cleanBowerDir: false
				}
			}
		}

	});

	// Load the plugin.
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Default task(s).
	grunt.registerTask('default', ['watch']);

	//bootstrapのディレクトリ構成がいまいちなので、copyタスクでコピーすることにする
	grunt.registerTask('bower-install', ['bower:install', 'clean:bower-install', 'copy:bower-install']);

};