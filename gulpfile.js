var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel', function() {
	gulp.src('source/*.js')
  	.pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch('source/*.js', ['babel']);
})

gulp.task('default', ['babel', 'watch']);