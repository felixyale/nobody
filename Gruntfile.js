module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    buildPath: 'build',
    jscs: {
      gruntfile: ['Gruntfile.js'],
      js: ['assets/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },
    clean: {
      build: '<%= buildPath %>',
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
        dest: '<%= buildPath %>'
      }
    },
    cssmin: {
      build: {
        expand: true,
        cwd: 'assets',
        src: '**/*.css',
        dest: '<%= buildPath %>'
      }
    },
    filerev: {
      options: {
        algorithm: 'md5',
        length: 8,
        dest: '<%= buildPath %>'
      },
      images: {
        src: 'assets/**/*.{jpg,jpeg,gif,png,webp}',
        dest: '<%= buildPath %>',
        expand: true
      },
      css: {
        src: 'assets/**/*.css',
        dest: '<%= buildPath %>',
        expand: true
      },
      js: {
        src: 'assets/**/*.js',
        dest: '<%= buildPath %>',
        expand: true
      }
    },
    filerev_assets: {
      build: {
        options: {
          dest: '<%= buildPath %>/assets.json',
          cwd: '<%= buildPath %>/',
          prettyPrint: true,
          prefix: ''
        }
      }
    },
    requirejs_map: {
      options: {
        assetsMapFile: '<%= buildPath %>/assets.json',
        mainConfigFile: 'assets/require-config.json',
        dest: '<%= buildPath %>'
      },
      compile: {
        src: '<%= buildPath %>/**/*.js'
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

  // Load the plugin that provides the 'uglify' task.
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-filerev-assets');
  grunt.loadNpmTasks('grunt-requirejs-map');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'jscs', 'jshint', 'uglify', 'cssmin', 'watch']);

  grunt.registerTask('test', ['clean', 'jscs', 'jshint']);
  
  grunt.registerTask('file', ['clean', 'filerev', 'filerev_assets']);
  
  grunt.registerTask('map', ['file', 'requirejs_map']);
  

};
