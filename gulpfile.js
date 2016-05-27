var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watch = require('gulp-watch');

gulp.task('default', ['browserify', 'watch']);

gulp.task('browserify', function() {
	return browserify('./source/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('watch', function() {
  return watch('source/**/*.js', function () {
    gulp.start('browserify');
	});
});
