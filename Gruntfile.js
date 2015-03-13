module.exports = function ( grunt ) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		concat: {
  			options: {
    			// define a string to put between each file in the concatenated output
    			separator: ';'
  			},
  			dist: {
    			// the files to concatenate
    			src: ['src/js/'],
    			// the location of the resulting JS file
    			dest: 'dist/js/<%= pkg.name %>.js'
  			}
		},
		uglify: {
  			options: {
    			// the banner is inserted at the top of the output
    			banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  			},
  			dist: {
    			files: {
      				'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
  				}
  			}
		},
	  	jshint: {
	   		all: [''],
	    	gruntfile: ['Gruntfile.js'],
	    	options: {
	     		curly:  true,
				immed:  true,
			  	newcap: true,
			  	noarg:  true,
			  	sub:    true,
			  	boss:   true,
			  	eqnull: true,
			  	node:   true,
			  	undef:  true,
				globals: {
					_:       false,
				    jQuery:  false,
				    angular: false,
				    moment:  false,
				    console: false,
				    $:       false,
				    io:      false
				}
	    	}
	    },
	    watch: {
	    	files: ['<%= jshint.files%>'],
	    	tasks: ['jshint']
	    }
 	});
	
	grunt.loadNpmTasks('grunt-karma');
 	grunt.loadNpmTasks('grunt-contrib-jshint');
 	grunt.loadNpmTasks('grunt-contrib-uglify');
 	grunt.loadNpmTasks('grunt-contrib-watch');
 	grunt.loadNpmTasks('grunt-contrib-concat');

 	grunt.registerTask('test', ['karma','jshint']);
 	grunt.registerTask('default', ['karma','jshint','concat','uglify']);
};