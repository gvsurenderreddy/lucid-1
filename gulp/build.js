var autoprefixer = require('autoprefixer');
var babel = require('gulp-babel');
var cache = require('gulp-cached');
var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');

var CONFIG = require('./config');

module.exports = {
	css: function() {
		return gulp.src([CONFIG.LESS_ENTRY])
		.pipe(less())
		.pipe(postcss([
			autoprefixer({
				browsers: [CONFIG.AUTOPREFIXER_BROWSERS],
			}),
		]))
		.pipe(gulp.dest(CONFIG.BUILD_DIR));
	},

	js: function() {
		return gulp.src([
			'!/**/*.json',
			'!' + CONFIG.TEST_GLOB.SOURCE,
			'!' + CONFIG.EXAMPLES_GLOB.SOURCE,
			CONFIG.JS_GLOB.SOURCE,
		])
		.pipe(cache('build-js')) // only useful when using a watch task
		.pipe(babel())
		.pipe(gulp.dest(CONFIG.BUILD_DIR));
	},

	test: function() {
		return gulp.src([
			CONFIG.JS_GLOB.SOURCE,
			'!/**/*.json',
			'!' + CONFIG.EXAMPLES_GLOB.SOURCE,
		])
		.pipe(cache('build-test')) // only useful when using a watch task
		.pipe(babel({ plugins: ['rewire'] }))
		.pipe(gulp.dest(CONFIG.BUILD_DIR));
	},
};
