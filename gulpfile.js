var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('sass', function() {
  gulp.src('sass/data.scss')
    .pipe(sass({ sourcemap: true }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
  gulp.watch('sass/**', ['sass']);
});

gulp.task('sass-admin', function() {
  gulp.src('sass/admin.scss')
    .pipe(sass({ sourcemap: true }))
    .pipe(gulp.dest('admin/css'));
});

gulp.task('watch-admin', function() {
  gulp.watch('sass/admin/**', ['sass-admin']);
});

gulp.task('default', ['sass']);