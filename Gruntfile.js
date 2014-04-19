/*global module:false*/
module.exports = function(grunt) {
    console.log("------------------------");
    console.log("Leap motion for Open 3d viewer");
    console.log("------------------------");



  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    web_server: {
	    options: {
	      cors: true,
	      port: 8000,
	      nevercache: true,
	      logRequests: true
	    },
	    foo: 'bar' // For some reason an extra key with a non-object value is necessary
	  },
	   open:{
		    cuerpohumano : {
		      path: 'http://localhost:8000/demos/cuerpohumano/index.htm',
		      app: 'Google Chrome'
		    }
		 }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-web-server');

  // Default task(s).
  grunt.registerTask('default', ['dev']);
  
  grunt.registerTask('dev', ['open:cuerpohumano','web_server']);

};
