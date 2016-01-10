module.exports = function(grunt) {
	var pkg = require('./package');
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        banner:'/*! Project: '+pkg.name+'\n *  Version: '+pkg.version+'\n *  Date: <%= grunt.template.today("yyyy-mm-dd hh:MM:ss TT") %>\n *  Author: '+pkg.author+'\n */',
        //连接实时环境
        connect: {
            options: {
                port: 1020,
                hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35729  //声明给 watch 监听的端口
            },

            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: [
                        'trunk'  //主目录
                    ]
                }
            }
        },
        //清除目录
        clean:{
            build:['build'],
            js:['build/js/*.js','!build/js/com.js'],
            css:['build/css/*.css','!build/css/com.css']
        },
        // 文件合并
        concat: {
            options: {
                //separator: ';',
                stripBanners: true
               },
            js:{
                src: ["build/js/zepto.min.js.js","build/js/touch.js","build/js/underscore-min.js","build/js/iscroll.js","build/js/animate.js","build/js/slider.js","build/js/main.js"],
                dest: "build/js/com.js"
            },
            css:{
                src: ["build/css/animate.js","build/css/main.css"],
                dest: "build/css/com.css"
            }
        },
        //js压缩
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            my_target: {
                files:[{
                    expand:true,
                    cwd:'build/',
                    src:['**/*.js'],
                    dest:'build/'
                }]
            }
        },
       //复制未处理的静态资源文件
        copy:{
            main:{ 
                expand: true,
                cwd: 'trunk/',
                src: ['**'],
                dest: 'build/'
            }
        },
        imagemin:{
            dynamic: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'build/img',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,jpeg,gif}'],   // Actual patterns to match
                    dest: 'build/img'                  // Destination path prefix
                }]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'build/css',
                src: ['*.css', '!*.min.css'],
                dest: 'build/css',
                ext: '.css'
            }
        },
        //替换时间戳，防止静态资源的缓存
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'timestamp',
                            replacement: '<%= new Date().getTime() %>'
                        }
                    ]
                },
                files: [
                    {expand: true, cwd:'build/', src: ['**/*.html'], dest: 'build/'},
                ]
            }
        },

        // 处理html中css、js 引入合并问题
         usemin: {
        html: 'build/*.html'
        },
		
		//watch代码
		watch: {
			  client: {
				files: ['trunk/*.html', 'trunk/css/*', 'trunk/js/*', 'trunk/img/*'],
				options: {
				  livereload: '<%=connect.options.livereload%>'
				}
			  }
		}

    });
	
	
	//开发页面
	grunt.registerTask('live', ['connect:server','watch']);
	
	
    // 生成页面
    grunt.registerTask('build',
        [
            'clean:build',
            'copy',
            'imagemin',
            'concat:js',
            'concat:css',
            'clean:js',
            'clean:css',
            'uglify',
            'cssmin',
            'usemin',
            'replace'
        ]);
};
