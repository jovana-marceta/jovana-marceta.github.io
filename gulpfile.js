const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
let uglify = require('gulp-uglify');
let gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');

function style() {
	// find source files
	return gulp.src('app/scss/**/*.scss')
	// pass that file thourght sass compiler with gulp sass and find errors
	.pipe(sass().on('error', sass.logError))
	// where to save compiled files
	.pipe(gulp.dest('app/css'))
	// stream change to all browsers
	.pipe(browserSync.stream());
}

// update things
function watch() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
	gulp.watch('app/scss/**/*.scss', style);
	//refresh browser when make change on html
	gulp.watch('app/**/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
}

// move fonts to dist
function fonts() {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
}

function images() {
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
	// Caching images that ran through imagemin
	.pipe(cache(imagemin({
		interlaced: true
	})))
	.pipe(gulp.dest('dist/images'))
}

function clean() {
	return del.sync('dist')
}

exports.style = style;
exports.watch = watch;
exports.fonts = fonts;
exports.images = images;
exports.clean = clean;
