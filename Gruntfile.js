module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jscs: {
      gruntfile: ['Gruntfile.js'],
      js: ['assets/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },
    clean: {
      build: 'build',
      release: 'release'
    },
    jshint: {
      gruntfile: ['Gruntfile.js'],
      js: ['assets/**/*.js']
    },
    uglify: {
      options: {
        //nameCache: 'grunt-uglify-cache.json',
        banner: ''
      },
      build: {
        expand: true,
        cwd: 'assets',
        src: '**/*.js',
        dest: 'build'
      }
    },
    cssmin: {
      build: {
        expand: true,
        cwd: 'assets',
        src: '**/*.css',
        dest: 'build'
      }
    },
    watch: {
      options: {
        spawn: false
      },
      css: {
        files: ['assets/**/*.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['assets/**/*.js'],
        tasks: ['jscs:js', 'jshint:js', 'uglify']
      },
      Gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['jscs:gruntfile', 'jshint:gruntfile']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'jscs', 'jshint', 'uglify', 'cssmin', 'watch']);

};
