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
    			separator: ''
  			},
  			dist: {
    			// the files to concatenate
    			src: [
  				'bower_components/jquery/dist/jquery.js',
            	'bower_components/bootstrap/js/transition.js',
	            'bower_components/bootstrap/js/tooltip.js',
	            'bower_components/bootstrap/js/alert.js',
	            'bower_components/bootstrap/js/button.js',
	            'bower_components/bootstrap/js/carousel.js',
	            'bower_components/bootstrap/js/collapse.js',
	            'bower_components/bootstrap/js/dropdown.js',
	            'bower_components/bootstrap/js/modal.js',
	            'bower_components/bootstrap/js/popover.js',
	            'bower_components/bootstrap/js/scrollspy.js',
	            'bower_components/bootstrap/js/tab.js',
	            'bower_components/bootstrap/js/affix.js',
	            'bower_components/bootstrap/dist/js/bootstrap.js',
	            'bower_components/angular/angular.js',
	            'bower_components/angular-route/angular-route.js',
	            'src/js/*.js',
	            'src/js/controllers/*.js'
    			],
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
	   		all: [
	   			'src/js/**/*.js',
			],
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
	    	files: ['src/js/**/*.js'],
	    	tasks: ['jshint','concat','uglify','karma'],
	    	options: {
	    		atBegin: true,
	    		spawn: true
	    	}
	    }
 	});
	
	grunt.loadNpmTasks('grunt-karma');
 	grunt.loadNpmTasks('grunt-contrib-jshint');
 	grunt.loadNpmTasks('grunt-contrib-uglify');
 	grunt.loadNpmTasks('grunt-contrib-watch');
 	grunt.loadNpmTasks('grunt-contrib-concat');

 	grunt.registerTask('test', ['jshint','karma']);
 	grunt.registerTask('default', ['jshint','concat','uglify','karma','watch']);
};