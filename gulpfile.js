var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('sass', function() {
  gulp.src('sass/application.scss')
    .pipe(sass({ sourcemap: true }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
  gulp.watch('sass/**', ['sass']);
});

gulp.task('default', ['sass']);