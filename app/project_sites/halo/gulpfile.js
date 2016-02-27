"use strict";

// Gulp plugins
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	compass = require('gulp-compass'),
	maps = require('gulp-sourcemaps'),
	del = require('del'),
	browserSync = require('browser-sync'),
	plumber = require('gulp-plumber'),
	stripDebug = require('gulp-strip-debug'),
	jshint = require('gulp-jshint'),
	autoprefixer = require('gulp-autoprefixer'),
	useref = require('gulp-useref'),
	iff = require('gulp-if'),
	csso = require('gulp-csso');

// stand alone vars
var reload = browserSync.reload;
	
function errorMessage ( err ) {
	console.log(err.message);
  this.emit('end');
}

gulp.task('html', ['compileSass'], function() {
	var assets = useref.assets();
	gulp.src('index.html')
		.pipe(assets)
		.pipe(iff('*.js', uglify()))
		.pipe(iff('*.css', csso()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist/'))
});

gulp.task('jslint', function() {
	return gulp.src( 'js/app.js' )
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('checkstyle'));
});

/*
* Css related tasks
*/
gulp.task('compileSass', function() {
	return gulp.src( "sass/main.scss")
		.pipe(plumber({ errorHandler: errorMessage }))
		.pipe(maps.init())
		.pipe(compass({
			// config_file: './config.rb',
			require: ['compass/import-once/activate', 'susy'],
			sourcemap: true,
			css: "css",
			sass: "sass",
			javascript: "js",
			image: "img",
			font: "fonts",
			comments: true,
			relative: true
		}))
		.on('error', function(error) {
      console.log(error);
      this.emit('end');
    })
    .pipe(autoprefixer({
    	browsers: ['last 3 versions'],
    	cascade: true
    }))
		.pipe(maps.write("./"))
		.pipe(gulp.dest( "css/" ))
		.pipe(browserSync.stream({match: '**/*.css'}));
});


// Browser Syncing / Localhost server
gulp.task('bs-reload', function() {
	browserSync.reload();
});

gulp.task('browser-sync', function() {
	return browserSync.init(['css/*.css', 'js/*.js'], {
		// start local server? or VM?
		server: {
			baseDir: './'
		},
		debug: true,
		// google chrome firefox explorer
		browser: ["google chrome"],
		port: 8080
	});
});


// Gulp Tasks
gulp.task('watchFiles', ['compileSass', 'browser-sync',], function() {
	gulp.watch( 'sass/**/*.scss', ['compileSass']);
	gulp.watch('*.html').on('change', reload);
});

gulp.task('clean', function() {
	// will clean / delete folders/files from given src
	del([
		'dist', 
		'css/main.css*'
	]);
});


// Dev task
gulp.task('serve', ['watchFiles']);


// Dist task. Will clean / build then create new subdirectory for dist
gulp.task('build', ['html', 'jslint'], function() {
	return gulp.src([
		// to be included in dist
		'css/main.css',
		'js/app.js*',
		'img/**', 
		'video/**',
		// 'fonts/**',
		'README.txt'
		], 
		{ base: './'}) // Tells gulp to keep directory structure the same
		.pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean"], function() {
	gulp.start('build'); // will change with gulp 4
});