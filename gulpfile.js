var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('sass', function() {
  gulp.src('sass/data.scss')
    .pipe(sass({ sourcemap: true }))
    .pipe(gulp.dest('public/data/css'));
});

gulp.task('watch', function() {
  gulp.watch('sass/**', ['sass']);
});

gulp.task('sass-admin', function() {
  gulp.src('sass/admin.scss')
    .pipe(sass({ sourcemap: true }))
    .pipe(gulp.dest('public/admin/css'));
});

gulp.task('watch-admin', function() {
  gulp.watch('sass/**', ['sass-admin']);
});

gulp.task('sass-portal', function() {
  gulp.src('sass/portal.scss')
    .pipe(sass({ sourcemap: true }))
    .pipe(gulp.dest('public/portal/css'));
});

gulp.task('watch-portal', function() {
  gulp.watch('sass/**', ['sass-portal']);
});

gulp.task('default', ['sass']);