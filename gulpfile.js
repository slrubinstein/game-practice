const gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watch = require('gulp-watch');

gulp.task('default', ['browserify', 'copy-html', 'watch']);

gulp.task('browserify', function() {
	return browserify('./source/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./build/'));
});

var watchers = [
  'source/**/*.js',
  'source/assets/*.json'
];

gulp.task('watch', function() {
  return watch(watchers, function () {
    gulp.start('browserify');
	});
});

gulp.task('copy-html', function() {
  gulp.src('./source/index.html')
  .pipe(gulp.dest('./build'));
});