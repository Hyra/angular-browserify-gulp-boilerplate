var gulp = require('gulp'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  plumber = require('gulp-plumber'),
  gulpify = require('gulpify'),
  concat = require('gulp-concat'),
  clean = require('gulp-clean'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  bourbon = require('node-bourbon');

var embedlr = require('gulp-embedlr'),
	refresh = require('gulp-livereload'),
	lrserver = require('tiny-lr')(),
	express = require('express'),
	livereload = require('connect-livereload'),
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
  .pipe(sass({
    onError: function(e) { console.log(e.toString()); },
    includePaths: require('node-bourbon').includePaths
  }))
  .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
  .pipe(gulp.dest('./dist/css/'))
  .pipe(refresh(lrserver));
});

gulp.task('browserify', function() {
  gulp.src('./app/scripts/main.js')
  .pipe(plumber())
  .pipe(gulpify('./app/scripts/main.js'))
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
  
});

gulp.task('default', ['views', 'browserify', 'styles', 'watch']);
