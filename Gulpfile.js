var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
// var uglify = require('gulp-uglify');
// var minifyHTML = require('gulp-minify-html');
// var minifyCSS = require('gulp-minify-css');
// var browserify = require('browserify');
var plumber = require('gulp-plumber');
var browserify = require('gulpify');

var concat = require('gulp-concat');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var embedlr = require('gulp-embedlr'),
	refresh = require('gulp-livereload'),
	lrserver = require('tiny-lr')(),
	express = require('express'),
	livereload = require('connect-livereload')
	livereloadport = 35729,
	serverport = 5000;

var server = express();
server.use(livereload({port: livereloadport}));
server.use(express.static('./dist'));
server.all('/*', function(req, res) {
	res.sendfile('index.html', { root: 'dist' });
});

gulp.task('lint', function() {
  gulp.src('./app/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// gulp.task('clean', function() {
	// gulp.src('./dist/js', {read: false})
	// .pipe(clean());
// });

gulp.task('views', function() {
  gulp.src('./app/index.html')
  .pipe(gulp.dest('dist/'))
  .pipe(refresh(lrserver));

  gulp.src('./app/views/**/*')
  .pipe(gulp.dest('dist/views/'))
  .pipe(refresh(lrserver));
});

gulp.task('styles', function () {
  gulp.src('./app/styles/*.scss')
  .pipe(sass({onError: function(e) { console.log(e);}}))
  .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
  .pipe(gulp.dest('./dist/css/'))
  .pipe(refresh(lrserver));
});

gulp.task('browserify', function() {
  gulp.src('./app/scripts/main.js')
  .pipe(plumber())
  .pipe(browserify('./app/scripts/main.js'))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./dist/js'))
  .on('error', gutil.log)
  .pipe(refresh(lrserver));
});

// gulp.task('minify-css', function() {
//   gulp.src('./static/css/*.css')
//     .pipe(minifyCSS(opts))
//     .pipe(gulp.dest('./dist/'))
// });
//
// gulp.task('minify-html', function() {
//   gulp.src('./static/html/*.html')
//     .pipe(minifyHTML(opts))
//     .pipe(gulp.dest('./dist/'))
// });
//
// gulp.task('imagemin', function () {
//     gulp.src('src/image.png')
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist'));
// });
//
// //TODO add support for source maps
// gulp.task('minify-js', function() {
//   gulp.src('./app/js/*.js')
//     .pipe(uglify({
//     	// inSourceMap:
//     	// outSourceMap: "app.js.map"
//     }))
//     .pipe(gulp.dest('./app/js'))
// });

// gulp.task('watch', ['clean', 'views', 'styles', 'browserify'], function() {
gulp.task('watch', ['views', 'browserify', 'styles'], function() {
	// Start webserver
	server.listen(serverport);
	// Live reload
	lrserver.listen(livereloadport);

	gulp.watch(['app/scripts/**/*.js'], [
		// 'lint'
		// 'clean',
		'browserify'
	]);

	gulp.watch(['app/styles/**/*.scss'], [
		'styles'
	]);

	gulp.watch(['app/index.html', 'app/views/**/*.html'], [
		'views'
	]);
});

// gulp.task('default', ['clean', 'views', 'styles', 'browserify', 'watch']);
gulp.task('default', ['views', 'browserify', 'watch']);
