var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');

var plumber = require('gulp-plumber');
var open = require('gulp-open');
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

  setTimeout(function() {
    var options = {
      url: "http://localhost:5000"
    };
    gulp.src("./dist/index.html")
      .pipe(open("", options));
  }, 666);
  
});

gulp.task('default', ['views', 'browserify', 'styles', 'watch']);
