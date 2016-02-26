"use strict";

// Gulp plugins
var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	compass = require('gulp-compass'),
	// csso = require('gulp-csso'),
	del = require('del'),
	iff = require('gulp-if'),
	jshint = require('gulp-jshint'),
	maps = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber'),
	postcss = require('gulp-postcss'),
	rename = require('gulp-rename'),
	reporter = require('postcss-reporter'),
	sass = require('gulp-sass'),
	stripDebug = require('gulp-strip-debug'),
	stylelint = require('stylelint'),
	syntaxScss = require('postcss-scss'),
	uglify = require('gulp-uglify'),
	useref = require('gulp-useref');
	

// stand alone vars
var reload = browserSync.reload;
	
function errorMessage ( err ) {
	console.log(err.message);
  this.emit('end');
}

gulp.task('html', ['compileSass'], function() {
	return gulp.src('index.html')
		// Minification pipes
		// .pipe(iff('*.js', uglify()))
		// .pipe(iff('*.css', csso()))
		.pipe(useref())
		.pipe(gulp.dest('dist/'))
});

/**
* Linters
*/


gulp.task('jslint', function() {
	return gulp.src( 'js/app.js' )
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('checkstyle'))
		.pipe(jshint.reporter('fail'));
});

gulp.task("csslint", function() {

  // Stylelint config rules
  var stylelintConfig = {
    "rules": {
      "block-no-empty": true,
      "color-no-invalid-hex": true,
      "declaration-colon-space-after": "always",
      "declaration-colon-space-before": "never",
      "function-comma-space-after": "always",
      "function-url-quotes": "double",
      "media-feature-colon-space-after": "always",
      "media-feature-colon-space-before": "never",
      "media-feature-name-no-vendor-prefix": true,
      "max-empty-lines": 5,
      "number-leading-zero": "always",
      "number-no-trailing-zeros": true,
      "property-no-vendor-prefix": true,
      "rule-no-duplicate-properties": true,
      "declaration-block-no-single-line": true,
      "rule-trailing-semicolon": "always",
      "selector-list-comma-space-before": "never",
      "selector-list-comma-newline-after": "always",
      "selector-no-id": true,
      "string-quotes": "double",
      "value-no-vendor-prefix": true
    }
  }

  var processors = [
    stylelint(stylelintConfig),
    // Pretty reporting config
    reporter({
      clearMessages: true,
      // throwError: true
    })
  ];

  return gulp.src(
      // Stylesheet source:
      ['sass/**/*.scss']
    )
    .pipe(postcss(processors, {syntax: syntaxScss}));
});


/**
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
			// font: "fonts",
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
		// start local server
		server: {
			baseDir: './'
		},
		debug: true,
		// autostart browser
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
	// which files to delete(clean)
	del([
		'dist', 
		'css/main.css*'
	]);
});


// Dev task
gulp.task('serve', ['watchFiles']);


// Dist task. Will clean / build then create new subdirectory for dist
gulp.task('build', ['html', 'jslint', 'csslint'], function() {
	return gulp.src([
		// to be included in dist
		'img/**', 
		'app/**',
		// 'videos/**',
		// 'fonts/**',
		// 'README.txt'
		], 
		{ base: './'}) // Tells gulp to keep directory structure the same
		.pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean"], function() {
	gulp.start('build'); // will change with gulp 4
});