var gulp = require('gulp');
var browserSync = require('browser-sync');
var minifyCss = require('gulp-minify-css');
var shell = require('gulp-shell');
var gzip = require('gulp-gzip');

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'src/',
            index: 'index.html'
        }
    });

    gulp.watch('src/**/*.+(html|js|css|svg)').on('change', browserSync.reload);
});

gulp.task('minify-css', function() {
    return gulp.src('src/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'))
        .pipe(gzip())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['minify-css'], function() {
    gulp.src('src/**/*.+(html|js|json|gif|png|ico|svg|eot|ttf|woff)')
        .pipe(gulp.dest('dist'))
        .pipe(gzip())
        .pipe(gulp.dest('dist'));
});

gulp.task('release', ['build'], shell.task([
    'ssh fushihara.net "cd /var/www; git pull"',
    'open https://fushihara.net/'
]));
