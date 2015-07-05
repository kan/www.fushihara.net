var gulp = require('gulp');
var browserSync = require('browser-sync');
var minifyCss = require('gulp-minify-css');

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });

    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('css/*.css').on('change', browserSync.reload);
});

gulp.task('minify-css', function() {
    return gulp.src('css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build', ['minify-css'], function() {
    gulp.src('*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('js/*.js')
        .pipe(gulp.dest('dist/js'));
    gulp.src('img/*.*')
        .pipe(gulp.dest('dist/img'));
});