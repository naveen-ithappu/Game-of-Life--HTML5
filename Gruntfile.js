module.exports = function(grunt) {
    var _golDir = 'src/js/GameOfLife/', _golFiles = ['__start.js', 'NativeCanvas.js', 'PolyCanvas.js', 'CanvasProvider.js', 'Stage.js', 'gol.js', 'gol-jqplugin.js', '__end.js'];
    _golFiles.forEach(function(fName, ind) {
        _golFiles[ind] = _golDir + fName;
    });
    var _mainJS = _golFiles.concat(['src/js/polyfills.js', 'src/js/patterns.js', 'src/js/page.js']);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            staticfiles: {
                files: [
                    {
                        expand: true,
                        cwd: "src/",
                        src: ["favicon.ico", "*.html", "css/boxsizing.htc","js/es5-shim.min.js","js/jquery-1.11.1.min.js"],
                        dest: "build/"
                    }
                ]
            }
        },
        uglify: {
            minifi: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                            '<%= grunt.template.today("yyyy-mm-dd") %> */',
                    //sourceMap: true,
                    //sourceMapIncludeSources: true,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'build/js/scripts.min.js': 'build/js/scripts.js'
                }
            }
        },
        jshint: {
            files: 'build/js/scripts.js',
            options: {
                jshintrc: 'jshintrc.json'
            }
        },
        "jsbeautifier": {
            files: 'build/js/scripts.js'
        },
        concat: {
            alljsfiles: {
                src: _mainJS,
                dest: 'build/js/scripts.js'
            }
        },
        cssmin: {
            minifi: {
                options: {
                    banner: '/* Styles required for Game of Life application \r\n @Author :Naveen I*/'
                },
                files: {
                    'build/css/styles.min.css': ['src/css/bootstrap.css', 'src/css/bootstrap-theme.css', 'src/css/page.css']
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            src: ['src/css/page.css']
        },
        csscomb: {
            sort: {
                options: {
                    config: '.csscomb.json'
                },
                files: {
                    'src/css/page.css': 'src/css/page.css'
                }
            }
        },
        clean: {
            build: {
                options: {
                    force: true
                },
                src: ['build']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.registerTask('default', function() {
        grunt.task.run(["clean", "csscomb", "csslint", "cssmin", "concat", "jsbeautifier", "jshint", "uglify", "copy"]);
    });

};